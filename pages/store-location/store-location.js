const { STORES } = require('../../utils/mock-data')
const app = getApp()

function calcDistance(lat1, lng1, lat2, lng2) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180)
    * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

Page({
  data: {
    stores: [],
    filteredStores: [],
    searchKeyword: '',
    selectedStoreId: null,
    mapLat: 39.9042,
    mapLng: 116.4074,
    mapScale: 12,
    markers: [],
    selectedStoreName: ''
  },

  onLoad() {
    // 先用默认位置初始化，再异步获取真实位置
    this._initStores(null, null)
    this._getLocation()
  },

  _getLocation() {
    let settled = false
    // 守卫：模拟器有时 wx.getLocation 既不触发 success 也不触发 fail，8s 后强制放弃
    const guard = setTimeout(() => { settled = true }, 8000)

    const locReq = wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        if (settled) return
        settled = true
        clearTimeout(guard)
        const { latitude: lat, longitude: lng } = res
        this._initStores(lat, lng)
        const nearest = this.data.stores[0]
        if (nearest) {
          this.setData({ mapLat: nearest.lat, mapLng: nearest.lng, mapScale: 14 })
        }
      },
      fail: (err) => {
        if (settled) return
        settled = true
        clearTimeout(guard)
        if (err && err.errMsg && err.errMsg.indexOf('auth deny') >= 0) {
          wx.showToast({ title: '未获取位置，无法排序距离', icon: 'none', duration: 2000 })
        }
      }
    })
    // 3.x 基础库会同时返回 Promise；消费掉它防止未处理 rejection 抛出 Error: timeout
    if (locReq && typeof locReq.catch === 'function') locReq.catch(() => {})
  },

  _initStores(userLat, userLng) {
    let stores = STORES.map(s => {
      let distance = null
      let distanceStr = ''
      if (userLat !== null) {
        distance = calcDistance(userLat, userLng, s.lat, s.lng)
        distanceStr = distance < 1
          ? Math.round(distance * 1000) + 'm'
          : (Math.round(distance * 10) / 10) + 'km'
      }
      return { ...s, distance, distanceStr }
    })
    if (userLat !== null) {
      stores.sort((a, b) => a.distance - b.distance)
    }
    const markers = stores.map(s => ({
      id: s.id,
      latitude: s.lat,
      longitude: s.lng,
      title: s.name,
      width: 32,
      height: 32,
      label: { content: s.name, color: '#1677FF', fontSize: 12, anchorX: 0, anchorY: -10 }
    }))
    this.setData({ stores, filteredStores: stores, markers })
  },

  onSearchInput(e) {
    const kw = e.detail.value
    this.setData({ searchKeyword: kw })
    const { stores } = this.data
    if (!kw.trim()) {
      this.setData({ filteredStores: stores })
      return
    }
    this.setData({
      filteredStores: stores.filter(s => s.name.includes(kw) || s.address.includes(kw))
    })
  },

  onMarkerTap(e) {
    this._selectStore(e.markerId)
  },

  onStoreTap(e) {
    const storeId = e.currentTarget.dataset.id
    this._selectStore(storeId)
    const store = STORES.find(s => s.id === storeId)
    if (store) {
      this.setData({ mapLat: store.lat, mapLng: store.lng, mapScale: 15 })
    }
  },

  _selectStore(storeId) {
    const store = STORES.find(s => s.id === storeId)
    if (!store) return
    this.setData({ selectedStoreId: storeId, selectedStoreName: store.name })
    app.globalData.selectedStore = store
    wx.showToast({ title: '已选: ' + store.name, icon: 'none' })
  },

  confirmSelection() {
    if (!this.data.selectedStoreId) {
      wx.showToast({ title: '请先选择一家店铺', icon: 'none' })
      return
    }
    wx.navigateBack()
  },

  onTapBack() {
    wx.navigateBack()
  }
})
