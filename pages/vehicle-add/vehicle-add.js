const { getUser, addVehicle } = require('../../utils/storage')
const app = getApp()

// 省份简称
const PROVINCE_KEYS = [
  '京', '津', '冀', '晋', '蒙', '辽', '吉', '黑', '沪',
  '苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘',
  '粤', '桂', '琼', '渝', '川', '贵', '云', '藏', '陕',
  '甘', '青', '宁', '新'
]
// 特殊字符（使馆/港澳/学/警 等），仅省份格可用
const SPECIAL_KEYS = ['港', '澳', '学', '警', '领']
const DIGIT_KEYS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
// 字母按 QWERTY 顺序排列
const LETTER_ROWS = [
  { id: 'r1', keys: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'] },
  { id: 'r2', keys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'] },
  { id: 'r3', keys: ['Z', 'X', 'C', 'V', 'B', 'N', 'M'] }
]

Page({
  data: {
    plateChars: ['', '', '', '', '', '', '', ''], // 0-6 标准位，7 新能源位（可选）
    activeIndex: 0,
    keyboardVisible: true,
    carModel: '',
    // 键盘静态数据
    provinceKeys: PROVINCE_KEYS,
    specialKeys: SPECIAL_KEYS,
    digitKeys: DIGIT_KEYS,
    letterRows: LETTER_ROWS,
    // 计算态
    keyboardType: 'province', // 'province' | 'alnum'
    digitsDisabled: false,
    specialEnabled: false // 港澳学警领挂 仅第 7 格（index 6）可用
  },

  onShow() {
    // 从车型选择页返回时回填
    if (app.globalData.selectedCarModel) {
      this.setData({ carModel: app.globalData.selectedCarModel })
      app.globalData.selectedCarModel = null
    }
  },

  // 点击某个车牌格
  onBoxTap(e) {
    const index = Number(e.currentTarget.dataset.index)
    this._activate(index)
  },

  _activate(index) {
    this.setData({
      activeIndex: index,
      keyboardVisible: true,
      keyboardType: index === 0 ? 'province' : 'alnum',
      digitsDisabled: index === 1, // 第 2 格仅字母
      specialEnabled: index === 6 // 仅第 7 格可填 港澳学警领挂
    })
  },

  // 点击键盘按键
  onKeyTap(e) {
    const key = e.currentTarget.dataset.key
    const disabled = e.currentTarget.dataset.disabled
    if (disabled) return

    const { activeIndex } = this.data
    const plateChars = this.data.plateChars.slice()
    plateChars[activeIndex] = key

    // 自动前进：0→…→6 后停（第 7 格为可选新能源位，需手动进入）
    let next = activeIndex
    if (activeIndex < 6) next = activeIndex + 1

    this.setData({
      plateChars,
      activeIndex: next,
      keyboardType: next === 0 ? 'province' : 'alnum',
      digitsDisabled: next === 1,
      specialEnabled: next === 6
    })
  },

  // 退格
  onBackspace() {
    const { activeIndex } = this.data
    const plateChars = this.data.plateChars.slice()

    if (plateChars[activeIndex]) {
      // 当前格有字符，清空当前格
      plateChars[activeIndex] = ''
      this.setData({ plateChars })
    } else if (activeIndex > 0) {
      // 当前格为空，回退一格并清空
      const prev = activeIndex - 1
      plateChars[prev] = ''
      this.setData({
        plateChars,
        activeIndex: prev,
        keyboardType: prev === 0 ? 'province' : 'alnum',
        digitsDisabled: prev === 1,
        specialEnabled: prev === 6
      })
    }
  },

  hideKeyboard() {
    this.setData({ keyboardVisible: false })
  },

  // 防止点击键盘空白处冒泡到下层
  noop() {},

  goSelectCar() {
    this.setData({ keyboardVisible: false })
    wx.navigateTo({ url: '/pages/car-select/car-select' })
  },

  save() {
    const { plateChars, carModel } = this.data
    // 校验前 7 格
    for (let i = 0; i < 7; i++) {
      if (!plateChars[i]) {
        wx.showToast({ title: '请输入完整车牌', icon: 'none' })
        this._activate(i)
        return
      }
    }
    if (!carModel) {
      wx.showToast({ title: '请选择品牌', icon: 'none' })
      return
    }

    const standard = plateChars.slice(0, 7).join('')
    const isNewEnergy = !!plateChars[7]
    const full = isNewEnergy ? standard + plateChars[7] : standard

    const user = getUser()
    if (!user) return

    addVehicle(user.phone, { full, isNewEnergy, carModel })

    wx.showToast({ title: '添加成功', icon: 'success' })
    setTimeout(() => wx.navigateBack(), 800)
  },

  onTapBack() {
    wx.navigateBack()
  }
})
