Component({
  data: {
    selected: 0,
    list: [
      { pagePath: 'pages/home/home', text: '主页', emoji: '🏠' },
      { pagePath: 'pages/my-vehicles/my-vehicles', text: '我的车辆', emoji: '🚗' },
      { pagePath: 'pages/my/my', text: '我的', emoji: '👤' }
    ]
  },
  lifetimes: {
    attached() {
      this._syncSelected()
    }
  },
  pageLifetimes: {
    show() {
      this._syncSelected()
    }
  },
  methods: {
    _syncSelected() {
      try {
        const pages = getCurrentPages()
        if (!pages || pages.length === 0) return
        const current = pages[pages.length - 1]
        const route = current.route || ''
        const idx = this.data.list.findIndex(item => route.indexOf(item.pagePath) >= 0)
        if (idx >= 0) this.setData({ selected: idx })
      } catch (e) {}
    },
    switchTab(e) {
      const index = e.currentTarget.dataset.index
      if (index === this.data.selected) return
      const path = this.data.list[index].pagePath
      wx.redirectTo({ url: '/' + path })
    }
  }
})
