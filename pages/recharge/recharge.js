const { getUser, saveUser, addTransaction } = require('../../utils/storage')
const app = getApp()

const PRESET_AMOUNTS = [50, 100, 200, 500]

Page({
  data: {
    user: null,
    presetAmounts: PRESET_AMOUNTS,
    selectedPreset: -1,
    customAmount: '',
    loading: false
  },

  onShow() {
    const user = getUser()
    this.setData({ user })
  },

  selectPreset(e) {
    const idx = e.currentTarget.dataset.index
    this.setData({ selectedPreset: idx, customAmount: '' })
  },

  onCustomInput(e) {
    this.setData({ customAmount: e.detail.value, selectedPreset: -1 })
  },

  recharge() {
    const { selectedPreset, customAmount, presetAmounts, user } = this.data
    if (!user) return

    let amount = 0
    if (selectedPreset >= 0) {
      amount = presetAmounts[selectedPreset]
    } else {
      amount = Number(customAmount)
    }

    if (!amount || amount <= 0) {
      wx.showToast({ title: '请选择或输入充值金额', icon: 'none' })
      return
    }

    this.setData({ loading: true })
    // 模拟微信支付
    wx.showLoading({ title: '支付中...' })
    setTimeout(() => {
      wx.hideLoading()
      const newBalance = user.balance + amount
      const updatedUser = { ...user, balance: newBalance }
      wx.setStorageSync('user_' + user.phone, updatedUser)
      saveUser(updatedUser)
      app.globalData.userInfo = updatedUser

      addTransaction(user.phone, {
        type: 'recharge',
        amount: amount,
        desc: `充值 ¥${amount}`
      })

      this.setData({ user: updatedUser, loading: false, selectedPreset: -1, customAmount: '' })
      wx.showToast({ title: `充值成功 ¥${amount}`, icon: 'success' })
    }, 1500)
  },

  onTapBack() {
    wx.navigateBack()
  }
})
