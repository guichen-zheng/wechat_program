const { WASH_PLANS, findServiceItem } = require('../../utils/mock-data')
const { getUser, updateBalance, getVehicles, addTransaction, addAppointment, addOrder } = require('../../utils/storage')
const app = getApp()

Page({
  data: {
    plan: null,
    vehicles: [],
    vehicleNames: [],
    vehicleIndex: 0,
    selectedStore: null
  },

  onLoad(options) {
    const rawId = options.id
    // 先在洗车计划里按数字 id 查，再在服务项目里按字符串 id 查
    let plan = WASH_PLANS.find(p => String(p.id) === String(rawId))
    if (!plan) {
      plan = findServiceItem(rawId)
    }
    const user = getUser()
    const vehicles = user ? getVehicles(user.phone) : []
    const vehicleNames = vehicles.map(v => v.full)

    let vehicleIndex = 0
    if (options.vehicleIndex !== undefined) {
      vehicleIndex = Number(options.vehicleIndex)
    }

    this.setData({
      plan,
      vehicles,
      vehicleNames,
      vehicleIndex,
      selectedStore: app.globalData.selectedStore
    })
  },

  onShow() {
    this.setData({ selectedStore: app.globalData.selectedStore })
  },

  onVehicleChange(e) {
    this.setData({ vehicleIndex: Number(e.detail.value) })
  },

  bookWash() {
    const { plan, vehicles, vehicleIndex, selectedStore } = this.data
    const user = getUser()

    if (!user) {
      wx.navigateTo({ url: '/pages/login/login' })
      return
    }

    // 检查店铺
    if (!selectedStore) {
      wx.showModal({
        title: '请选择店铺',
        content: '预约前需先选择一家店铺',
        confirmText: '去选择',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({ url: '/pages/store-location/store-location' })
          }
        }
      })
      return
    }

    // 检查车辆
    if (vehicles.length === 0) {
      wx.showModal({
        title: '请添加车辆',
        content: '预约前需先添加车辆',
        confirmText: '去添加',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({ url: '/pages/my-vehicles/my-vehicles' })
          }
        }
      })
      return
    }

    // 余额检查
    if (user.balance < plan.price) {
      wx.showModal({
        title: '余额不足',
        content: `当前余额 ¥${user.balance}，该套餐需 ¥${plan.price}，是否去充值？`,
        confirmText: '去充值',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({ url: '/pages/recharge/recharge' })
          }
        }
      })
      return
    }

    // 扣款（updateBalance 会同步账号注册表与会话）
    const updatedUser = updateBalance(user.phone, -plan.price)
    app.globalData.userInfo = updatedUser

    const vehicle = vehicles[vehicleIndex]

    // 生成订单
    addOrder(user.phone, {
      type: 'wash',
      name: plan.name,
      plate: vehicle.full,
      storeId: selectedStore.id,
      storeName: selectedStore.name,
      amount: plan.price,
      status: 'waiting'
    })

    addTransaction(user.phone, {
      type: 'wash',
      amount: -plan.price,
      desc: `${plan.name} - ${vehicle.full} @ ${selectedStore.name}`
    })

    addAppointment(selectedStore.id, {
      phone: user.phone,
      planId: plan.id,
      plate: vehicle.full,
      status: 'waiting'
    })

    wx.showToast({ title: '预约成功！', icon: 'success', duration: 2000 })
    const pages = getCurrentPages()
    const delta = Math.min(2, pages.length - 1)
    setTimeout(() => wx.navigateBack({ delta }), 2000)
  },

  onTapBack() {
    wx.navigateBack()
  }
})
