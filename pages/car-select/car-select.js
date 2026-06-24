const { CAR_DATA } = require('../../utils/mock-data')
const app = getApp()

Page({
  data: {
    hotBrands: [],
    brandGroups: [], // [{ initial, brands: [{name, letter}] }]
    indexBar: [],    // ['热','2','A',...]
    scrollIntoId: '',
    keyword: '',     // 搜索关键词（仅用于结果浮层显示，输入框非受控）
    filtered: []     // 匹配的品牌名
  },

  onLoad() {
    const hotBrands = CAR_DATA.hotBrands.map(name => ({ name, letter: name.charAt(0) }))

    const map = {}
    CAR_DATA.brands.forEach(b => {
      if (!map[b.initial]) map[b.initial] = []
      map[b.initial].push({ name: b.name, letter: b.name.charAt(0) })
    })
    const initials = Object.keys(map).sort()
    const brandGroups = initials.map(initial => ({ initial, brands: map[initial] }))
    const indexBar = ['热'].concat(initials)

    // 全部品牌名（用于搜索）
    this._allNames = CAR_DATA.brands.map(b => b.name)

    this.setData({ hotBrands, brandGroups, indexBar })
  },

  // 字母索引跳转
  onIndexTap(e) {
    const key = e.currentTarget.dataset.key
    this.setData({ scrollIntoId: key === '热' ? 'group-hot' : 'group-' + key })
  },

  // 搜索输入（输入框非受控，避免打断中文）
  onSearchInput(e) {
    const kw = (e.detail.value || '').trim()
    const lk = kw.toLowerCase()
    const filtered = kw
      ? this._allNames
          .filter(n => n.toLowerCase().indexOf(lk) >= 0)
          .map(n => ({ name: n, letter: n.charAt(0) }))
      : []
    this.setData({ keyword: kw, filtered })
  },

  // 回车：若无完全匹配则按自定义品牌处理
  onSearchConfirm(e) {
    const kw = (e.detail.value || '').trim()
    if (!kw) return
    this._select(kw)
  },

  // 选列表中的品牌
  pickBrand(e) {
    this._select(e.currentTarget.dataset.name)
  },

  // 使用自定义输入的品牌
  useCustom() {
    const kw = (this.data.keyword || '').trim()
    if (!kw) return
    this._select(kw)
  },

  _select(brand) {
    app.globalData.selectedCarModel = brand
    wx.navigateBack()
  },

  onTapBack() {
    wx.navigateBack()
  }
})
