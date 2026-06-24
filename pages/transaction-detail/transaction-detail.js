const { getUser, getTransactions, getTxDetail, saveTxDetail } = require('../../utils/storage')

Page({
  data: {
    tx: null,
    phone: '',
    txId: null,
    isAdmin: false,
    detail: { notes: '', photos: [] },
    editingNotes: '',
    notesChanged: false
  },

  onLoad(options) {
    const txId = decodeURIComponent(options.txId || '')
    const phone = decodeURIComponent(options.phone || '')
    const user = getUser()

    if (!user) {
      wx.navigateBack()
      return
    }

    const txs = getTransactions(phone)
    const tx = txs.find(t => String(t.id) === txId)

    if (!tx) {
      wx.showToast({ title: '记录不存在', icon: 'none' })
      setTimeout(() => wx.navigateBack(), 1000)
      return
    }

    const detail = getTxDetail(txId)

    this.setData({
      tx: { ...tx, phone },
      phone,
      txId,
      isAdmin: user.isAdmin,
      detail,
      editingNotes: detail.notes
    })
  },

  onNotesInput(e) {
    this.setData({ editingNotes: e.detail.value, notesChanged: true })
  },

  saveNotes() {
    const { txId, detail, editingNotes } = this.data
    const newDetail = { ...detail, notes: editingNotes }
    saveTxDetail(txId, newDetail)
    this.setData({ detail: newDetail, notesChanged: false })
    wx.showToast({ title: '已保存', icon: 'success' })
  },

  addPhoto() {
    const remaining = 9 - this.data.detail.photos.length
    if (remaining <= 0) {
      wx.showToast({ title: '最多9张照片', icon: 'none' })
      return
    }
    wx.chooseMedia({
      count: remaining,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const fs = wx.getFileSystemManager()
        const { txId, detail } = this.data
        const newPhotos = [...detail.photos]

        for (const file of res.tempFiles) {
          const ext = (file.tempFilePath.split('.').pop() || 'jpg').toLowerCase()
          const destPath = wx.env.USER_DATA_PATH + '/txphoto_' + txId + '_' + Date.now() + '.' + ext
          try {
            fs.copyFileSync(file.tempFilePath, destPath)
            newPhotos.push(destPath)
          } catch (e) {
            newPhotos.push(file.tempFilePath)
          }
        }

        const newDetail = { ...detail, photos: newPhotos }
        saveTxDetail(txId, newDetail)
        this.setData({ detail: newDetail })
      }
    })
  },

  previewPhoto(e) {
    const index = e.currentTarget.dataset.index
    const { photos } = this.data.detail
    wx.previewImage({ current: photos[index], urls: photos })
  },

  deletePhoto(e) {
    const index = e.currentTarget.dataset.index
    wx.showModal({
      title: '删除照片',
      content: '确认删除这张照片？',
      confirmText: '删除',
      confirmColor: '#FF4D4F',
      success: (res) => {
        if (!res.confirm) return
        const { txId, detail } = this.data
        const newPhotos = detail.photos.filter((_, i) => i !== index)
        const newDetail = { ...detail, photos: newPhotos }
        saveTxDetail(txId, newDetail)
        this.setData({ detail: newDetail })
      }
    })
  },

  onTapBack() {
    wx.navigateBack()
  }
})
