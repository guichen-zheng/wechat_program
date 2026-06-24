const { getUser, saveUser, clearUser } = require('../../utils/storage')
const app = getApp()

function _computeLayout() {
  const info = wx.getWindowInfo() || {}
  const screenHeight = info.screenHeight > 100 ? info.screenHeight : 667
  const screenWidth = info.screenWidth > 100 ? info.screenWidth : 375
  const statusBarHeight = info.statusBarHeight >= 0 ? info.statusBarHeight : 20
  const safeBottomPx = info.safeArea ? Math.max(0, screenHeight - info.safeArea.bottom) : 0
  const tabBarPx = Math.round(100 * screenWidth / 750) + safeBottomPx
  return { statusBarHeight, scrollViewHeight: screenHeight - statusBarHeight - 44 - tabBarPx }
}

Page({
  data: Object.assign({ user: null }, _computeLayout()),

  onLoad() {},

  onShow() {
    const user = getUser()
    if (!user) {
      wx.redirectTo({ url: '/pages/login/login' })
      return
    }
    this.setData({ user })
  },

  chooseAvatar() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album'],
      success: (res) => {
        const path = res.tempFiles[0].tempFilePath
        const user = { ...this.data.user, avatar: path }
        wx.setStorageSync('user_' + user.phone, user)
        saveUser(user)
        app.globalData.userInfo = user
        this.setData({ user })
      }
    })
  },

  goTransactions() {
    wx.navigateTo({ url: '/pages/transactions/transactions' })
  },

  logout() {
    wx.showModal({
      title: '提示',
      content: '是否退出当前账号？',
      cancelText: '取消',
      confirmText: '确认',
      confirmColor: '#FF4D4F',
      success: (res) => {
        if (res.confirm) {
          clearUser()
          app.globalData.userInfo = null
          wx.redirectTo({ url: '/pages/login/login' })
        }
      }
    })
  }
})
