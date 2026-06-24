const { getUser } = require('./utils/storage')

App({
  globalData: {
    userInfo: null,
    selectedStore: null,
    selectedCarModel: null,
    smsCode: null
  },
  onLaunch() {
    const user = getUser()
    if (user) {
      this.globalData.userInfo = user
    }
  }
})
