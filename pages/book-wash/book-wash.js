const { SERVICE_DATA } = require('../../utils/mock-data')

Page({
  data: {
    categories: [],     // [{ key, name }]
    activeCat: 0,
    subCategories: [],  // 当前分类的二级分类 [{ name, items }]
    activeSub: 0,
    items: []           // 当前二级分类的项目
  },

  onLoad(options) {
    const categories = SERVICE_DATA.map(c => ({ key: c.key, name: c.name, emoji: c.emoji }))
    this.setData({ categories })
    let catIndex = 0
    if (options && options.cat) {
      const i = SERVICE_DATA.findIndex(c => c.key === options.cat)
      if (i >= 0) catIndex = i
    }
    this._applyCategory(catIndex, 0)
  },

  _applyCategory(catIndex, subIndex) {
    const cat = SERVICE_DATA[catIndex]
    const subCategories = cat.subCategories
    const sub = subCategories[subIndex] || subCategories[0]
    this.setData({
      activeCat: catIndex,
      activeSub: subIndex,
      subCategories,
      items: sub ? sub.items : []
    })
  },

  onTapCategory(e) {
    const index = Number(e.currentTarget.dataset.index)
    if (index === this.data.activeCat) return
    this._applyCategory(index, 0)
  },

  onTapSub(e) {
    const index = Number(e.currentTarget.dataset.index)
    if (index === this.data.activeSub) return
    const sub = this.data.subCategories[index]
    this.setData({ activeSub: index, items: sub ? sub.items : [] })
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/wash-detail/wash-detail?id=' + id })
  },

  onTapBack() {
    wx.navigateBack()
  }
})
