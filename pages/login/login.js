const { getUser, saveUser } = require('../../utils/storage')
const app = getApp()

Page({
  data: {
    phone: '',
    password: '',
    phoneFocused: false,
    pwdFocused: false
  },

  onLoad() {
    const user = getUser()
    if (user) {
      wx.reLaunch({ url: '/pages/home/home' })
    }
  },

  onPhoneInput(e) { this.setData({ phone: e.detail.value }) },
  onPhoneFocus() { this.setData({ phoneFocused: true }) },
  onPhoneBlur() { this.setData({ phoneFocused: false }) },

  onPwdInput(e) { this.setData({ password: e.detail.value }) },
  onPwdFocus() { this.setData({ pwdFocused: true }) },
  onPwdBlur() { this.setData({ pwdFocused: false }) },

  login() {
    const { phone, password } = this.data
    if (!phone || !password) {
      wx.showToast({ title: '请填写手机号和密码', icon: 'none' })
      return
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({ title: '请输入正确的手机号', icon: 'none' })
      return
    }
    const user = wx.getStorageSync('user_' + phone)
    if (!user) {
      wx.showToast({ title: '账号不存在，请先注册', icon: 'none' })
      return
    }
    if (user.password !== password) {
      wx.showToast({ title: '密码错误', icon: 'none' })
      return
    }
    saveUser(user)
    app.globalData.userInfo = user
    wx.reLaunch({ url: '/pages/home/home' })
  },

  goRegister() {
    wx.navigateTo({ url: '/pages/register/register' })
  }
})
