const { getUser, getTransactions, getAllTransactions } = require('../../utils/storage')

Page({
  data: {
    isAdmin: false,
    filterType: 'all',
    filterPhone: '',
    allTransactions: [],
    filteredList: [],
    typeOptions: ['全部', '充值', '洗车']
  },

  onShow() {
    const user = getUser()
    if (!user) return
    this._user = user
    this.setData({ isAdmin: user.isAdmin })
    this._loadTransactions()
  },

  _loadTransactions() {
    const user = this._user
    let list = []
    if (user.isAdmin) {
      list = getAllTransactions()
    } else {
      list = getTransactions(user.phone).map(tx => ({ ...tx, phone: user.phone }))
    }
    this.setData({ allTransactions: list })
    this._applyFilter()
  },

  _applyFilter() {
    const { allTransactions, filterType, filterPhone } = this.data
    let result = allTransactions
    if (filterType === 'recharge') {
      result = result.filter(tx => tx.type === 'recharge')
    } else if (filterType === 'wash') {
      result = result.filter(tx => tx.type === 'wash')
    }
    if (filterPhone.trim()) {
      result = result.filter(tx => tx.phone && tx.phone.includes(filterPhone.trim()))
    }
    this.setData({ filteredList: result })
  },

  onTypeChange(e) {
    const idx = Number(e.detail.value)
    const map = ['all', 'recharge', 'wash']
    this.setData({ filterType: map[idx] })
    this._applyFilter()
  },

  onPhoneInput(e) {
    this.setData({ filterPhone: e.detail.value })
    this._applyFilter()
  },

  onTxTap(e) {
    const { txid, phone } = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/transaction-detail/transaction-detail?txId=' + encodeURIComponent(txid) + '&phone=' + encodeURIComponent(phone)
    })
  },

  onTapBack() {
    wx.navigateBack()
  }
})
