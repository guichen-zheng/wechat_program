const { saveUser } = require('../../utils/storage')
const app = getApp()

const ADMIN_PHONE = '13800000000'

Page({
  data: {
    phone: '',
    password: '',
    code: '',
    countdown: 0,
    phoneFocused: false,
    pwdFocused: false,
    codeFocused: false
  },

  onPhoneInput(e) { this.setData({ phone: e.detail.value }) },
  onPhoneFocus() { this.setData({ phoneFocused: true }) },
  onPhoneBlur() { this.setData({ phoneFocused: false }) },

  onPwdInput(e) { this.setData({ password: e.detail.value }) },
  onPwdFocus() { this.setData({ pwdFocused: true }) },
  onPwdBlur() { this.setData({ pwdFocused: false }) },

  onCodeInput(e) { this.setData({ code: e.detail.value }) },
  onCodeFocus() { this.setData({ codeFocused: true }) },
  onCodeBlur() { this.setData({ codeFocused: false }) },

  sendCode() {
    const { phone, countdown } = this.data
    if (countdown > 0) return
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({ title: '请输入正确的手机号', icon: 'none' })
      return
    }
    const existing = wx.getStorageSync('user_' + phone)
    if (existing) {
      wx.showToast({ title: '该手机号已注册，请直接登录', icon: 'none', duration: 2500 })
      return
    }
    const code = String(Math.floor(100000 + Math.random() * 900000))
    app.globalData.smsCode = code
    wx.showToast({ title: '验证码：' + code, icon: 'none', duration: 5000 })

    this.setData({ countdown: 60 })
    this._timer = setInterval(() => {
      const c = this.data.countdown - 1
      this.setData({ countdown: c })
      if (c <= 0) clearInterval(this._timer)
    }, 1000)
  },

  register() {
    const { phone, password, code } = this.data
    if (!phone || !password || !code) {
      wx.showToast({ title: '请填写完整信息', icon: 'none' })
      return
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({ title: '请输入正确的手机号', icon: 'none' })
      return
    }
    if (password.length < 6) {
      wx.showToast({ title: '密码至少6位', icon: 'none' })
      return
    }
    if (code !== app.globalData.smsCode) {
      wx.showToast({ title: '验证码错误', icon: 'none' })
      return
    }
    const user = {
      phone,
      password,
      balance: 0,
      isAdmin: phone === ADMIN_PHONE,
      avatar: ''
    }
    wx.setStorageSync('user_' + phone, user)
    saveUser(user)
    app.globalData.userInfo = user
    wx.showToast({ title: '注册成功', icon: 'success' })
    setTimeout(() => {
      wx.reLaunch({ url: '/pages/home/home' })
    }, 1000)
  },

  goLogin() {
    wx.navigateBack()
  },

  onUnload() {
    clearInterval(this._timer)
  }
})
