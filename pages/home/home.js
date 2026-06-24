const { SERVICE_DATA, BANNER_IMAGES } = require('../../utils/mock-data')
const { getUser } = require('../../utils/storage')
const app = getApp()

// 首页“洗车计划”取“洗车”分类里的前几个真实项目
const _washCat = SERVICE_DATA.find(c => c.key === 'wash')
const _washItems = []
_washCat.subCategories.forEach(sub => sub.items.forEach(it => _washItems.push(it)))
const HOME_PLANS = _washItems.slice(0, 5).map(it => ({
  id: it.id,
  name: it.name,
  description: it.desc,
  price: it.price,
  duration: it.duration,
  tag: ''
}))

// 功能宫格：2×4（第一行常用功能，第二行服务分类直达）
const FEATURE_LIST = [
  { name: '预约洗车', icon: 'booking', emoji: '📅', url: '/pages/book-wash/book-wash' },
  { name: '充值', icon: 'recharge', emoji: '💰', url: '/pages/recharge/recharge' },
  { name: '交易记录', icon: 'record', emoji: '📋', url: '/pages/transactions/transactions' },
  { name: '店铺位置', icon: 'location', emoji: '📍', url: '/pages/store-location/store-location' },
  { name: '美容', icon: 'beauty', emoji: '✨', url: '/pages/book-wash/book-wash?cat=beauty' },
  { name: '轮胎', icon: 'tire', emoji: '🛞', url: '/pages/book-wash/book-wash?cat=tire' },
  { name: '保养', icon: 'maintain', emoji: '🛢️', url: '/pages/book-wash/book-wash?cat=maintain' },
  { name: '精选套餐', icon: 'package', emoji: '🎁', url: '/pages/book-wash/book-wash?cat=package' }
]

// 搜索可匹配项（含已移入底部 Tab 的“我的车辆”）
const SEARCH_LIST = FEATURE_LIST.concat([
  { name: '我的车辆', emoji: '🚗', url: '/pages/my-vehicles/my-vehicles' }
])

function _computeLayout() {
  const info = wx.getWindowInfo() || {}
  const screenHeight = info.screenHeight > 100 ? info.screenHeight : 667
  const screenWidth = info.screenWidth > 100 ? info.screenWidth : 375
  const statusBarHeight = info.statusBarHeight >= 0 ? info.statusBarHeight : 20
  const safeBottomPx = info.safeArea ? Math.max(0, screenHeight - info.safeArea.bottom) : 0
  const tabBarPx = Math.round(100 * screenWidth / 750) + safeBottomPx
  // 滚动区有 padding-top（content-box 下会叠加到总高），需从高度里扣掉
  const paddingTopPx = statusBarHeight + 56
  return { statusBarHeight, scrollViewHeight: screenHeight - tabBarPx - paddingTopPx }
}

Page({
  data: Object.assign({
    bannerImages: BANNER_IMAGES,
    currentBanner: 0,
    features: FEATURE_LIST,
    washPlans: HOME_PLANS,
    suggestions: [],
    selectedStore: null
  }, _computeLayout()),

  onLoad() {},

  onShow() {
    const user = getUser()
    if (!user) {
      wx.redirectTo({ url: '/pages/login/login' })
      return
    }
    this.setData({ selectedStore: app.globalData.selectedStore })
  },

  onBannerChange(e) {
    this.setData({ currentBanner: e.detail.current })
  },

  // 非受控输入：只读取值做联想，不把 value 写回，避免打断中文拼音组合
  onSearchInput(e) {
    const kw = (e.detail.value || '').trim()
    const suggestions = kw ? SEARCH_LIST.filter(f => f.name.indexOf(kw) >= 0) : []
    this.setData({ suggestions })
  },

  onSearchConfirm(e) {
    const kw = (e.detail.value || '').trim()
    if (!kw) return
    const hit = SEARCH_LIST.find(f => f.name.indexOf(kw) >= 0)
    if (hit) {
      this.setData({ suggestions: [] })
      wx.navigateTo({ url: hit.url })
    } else {
      wx.showToast({ title: '未找到"' + kw + '"功能', icon: 'none' })
    }
  },

  onSearchBlur() {
    // 延迟隐藏，保证联想项的 tap 先触发
    setTimeout(() => this.setData({ suggestions: [] }), 200)
  },

  onSuggestionTap(e) {
    const url = e.currentTarget.dataset.url
    this.setData({ suggestions: [] })
    wx.navigateTo({ url })
  },

  goFeature(e) {
    const url = e.currentTarget.dataset.url
    wx.navigateTo({ url })
  },

  goPlanDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/wash-detail/wash-detail?id=' + id })
  }
})
