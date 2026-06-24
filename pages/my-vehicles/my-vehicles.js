const { getVehicles, removeVehicle } = require('../../utils/storage')
const { getUser } = require('../../utils/storage')

function _computeLayout() {
  const info = wx.getWindowInfo() || {}
  const screenHeight = info.screenHeight > 100 ? info.screenHeight : 667
  const screenWidth = info.screenWidth > 100 ? info.screenWidth : 375
  const statusBarHeight = info.statusBarHeight >= 0 ? info.statusBarHeight : 20
  const safeBottomPx = info.safeArea ? Math.max(0, screenHeight - info.safeArea.bottom) : 0
  const tabBarPx = Math.round(100 * screenWidth / 750) + safeBottomPx
  return { scrollViewHeight: screenHeight - statusBarHeight - 44 - tabBarPx }
}

Page({
  data: Object.assign({
    vehicles: [],
    showBack: false
  }, _computeLayout()),

  onLoad() {
    // 作为底部 Tab 进入（页面栈只有自己）时不显示返回箭头；从其他页跳入时显示
    this.setData({ showBack: getCurrentPages().length > 1 })
  },

  onShow() {
    const user = getUser()
    if (!user) {
      wx.redirectTo({ url: '/pages/login/login' })
      return
    }
    this._phone = user.phone
    this.setData({ vehicles: getVehicles(user.phone) })
  },

  addVehicle() {
    wx.navigateTo({ url: '/pages/vehicle-add/vehicle-add' })
  },

  onTapBack() {
    wx.navigateBack()
  },

  removeVehicle(e) {
    const index = e.currentTarget.dataset.index
    const vehicle = this.data.vehicles[index]
    wx.showModal({
      title: '确认删除',
      content: '确认删除车牌 ' + vehicle.full + '？',
      success: (res) => {
        if (res.confirm) {
          removeVehicle(this._phone, index)
          this.setData({ vehicles: getVehicles(this._phone) })
        }
      }
    })
  }
})
