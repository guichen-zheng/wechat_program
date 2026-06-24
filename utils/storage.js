// 本地存储层：统一管理 用户 / 车辆 / 订单 / 交易（基于 wx.getStorageSync 模拟后端）
//
// 存储键约定：
//   user                 -> 当前登录会话用户
//   user_<phone>         -> 账号注册表（每个手机号一条，持久保存）
//   all_phones           -> 所有注册过/有数据的手机号（供管理员汇总）
//   vehicles_<phone>     -> 某用户的车辆列表
//   orders_<phone>       -> 某用户的订单列表（洗车/美容/保养等服务下单）
//   transactions_<phone> -> 某用户的资金流水（充值/消费）
//   tx_detail_<txId>     -> 某条交易的详情（管理员编写的备注 + 照片）
//   appointments_<store> -> 某门店的预约队列

const ADMIN_PHONES = ['13800000000']

/* ----------------------------- 内部工具 ----------------------------- */

function _read(key, fallback) {
  return wx.getStorageSync(key) || fallback
}

function _write(key, value) {
  wx.setStorageSync(key, value)
}

// 把手机号登记进 all_phones（管理员汇总用）
function _registerPhone(phone) {
  if (!phone) return
  const allPhones = _read('all_phones', [])
  if (!allPhones.includes(phone)) {
    allPhones.push(phone)
    _write('all_phones', allPhones)
  }
}

function _genId(prefix) {
  return prefix + '_' + Date.now() + '_' + Math.floor(Math.random() * 1000)
}

/* ------------------------------- 用户 ------------------------------- */

// 当前登录会话用户
function getUser() {
  return _read('user', null)
}

// 保存当前会话用户，并同步写回账号注册表，保证余额等变更持久化
function saveUser(user) {
  if (!user) return
  _write('user', user)
  if (user.phone) {
    _write('user_' + user.phone, user)
    _registerPhone(user.phone)
  }
}

// 退出登录：仅清除会话，保留账号注册表
function clearUser() {
  wx.removeStorageSync('user')
}

// 按手机号读取账号（注册表）
function getUserByPhone(phone) {
  return _read('user_' + phone, null)
}

// 手机号是否已注册
function userExists(phone) {
  return !!getUserByPhone(phone)
}

// 注册新账号；已存在则返回 null
function registerUser(user) {
  if (!user || !user.phone) return null
  if (userExists(user.phone)) return null
  const record = {
    phone: user.phone,
    password: user.password || '',
    balance: user.balance || 0,
    isAdmin: ADMIN_PHONES.includes(user.phone) || !!user.isAdmin,
    avatar: user.avatar || '',
    ...user
  }
  _write('user_' + record.phone, record)
  _registerPhone(record.phone)
  return record
}

// 校验账号密码，成功返回用户，失败返回 { error }
function verifyLogin(phone, password) {
  const user = getUserByPhone(phone)
  if (!user) return { error: 'not_found' }
  if (user.password !== password) return { error: 'wrong_password' }
  return { user }
}

// 更新某用户余额（同时同步会话），返回新用户对象
function updateBalance(phone, delta) {
  const user = getUserByPhone(phone)
  if (!user) return null
  const updated = { ...user, balance: (user.balance || 0) + delta }
  _write('user_' + phone, updated)
  // 若是当前会话用户，同步会话
  const current = getUser()
  if (current && current.phone === phone) {
    _write('user', updated)
  }
  return updated
}

/* ------------------------------- 车辆 ------------------------------- */

function getVehicles(phone) {
  return _read('vehicles_' + phone, [])
}

function addVehicle(phone, vehicle) {
  const list = getVehicles(phone)
  list.push(vehicle)
  _write('vehicles_' + phone, list)
  _registerPhone(phone)
}

function removeVehicle(phone, index) {
  const list = getVehicles(phone)
  list.splice(index, 1)
  _write('vehicles_' + phone, list)
}

/* ------------------------------- 订单 ------------------------------- */
// 订单：一次服务下单（洗车/美容/保养等）。字段建议：
//   { type, name, plate, storeId, storeName, amount, status }
// status: 'waiting'(待服务) | 'serving'(服务中) | 'done'(已完成) | 'canceled'(已取消)

function getOrders(phone) {
  const list = _read('orders_' + phone, [])
  // 迁移：补全缺失 id
  let dirty = false
  list.forEach((o, i) => {
    if (!o.id) { o.id = 'legacy_order_' + phone + '_' + i; dirty = true }
  })
  if (dirty) _write('orders_' + phone, list)
  return list
}

function getOrder(phone, orderId) {
  return getOrders(phone).find(o => String(o.id) === String(orderId)) || null
}

// 新建订单，返回创建后的完整订单（含 id/time/status）
function addOrder(phone, order) {
  const list = getOrders(phone)
  const record = {
    status: 'waiting',
    ...order,
    id: _genId('order'),
    phone,
    time: new Date().toLocaleString()
  }
  list.unshift(record)
  _write('orders_' + phone, list)
  _registerPhone(phone)
  return record
}

function updateOrderStatus(phone, orderId, status) {
  const list = getOrders(phone)
  const target = list.find(o => String(o.id) === String(orderId))
  if (!target) return false
  target.status = status
  _write('orders_' + phone, list)
  return true
}

// 管理员：汇总所有用户订单（按时间倒序）
function getAllOrders() {
  const allPhones = _read('all_phones', [])
  let result = []
  for (const phone of allPhones) {
    getOrders(phone).forEach(o => result.push({ ...o, phone }))
  }
  result.sort((a, b) => new Date(b.time) - new Date(a.time))
  return result
}

/* ------------------------------- 交易 ------------------------------- */

function getTransactions(phone) {
  const list = _read('transactions_' + phone, [])
  // 迁移：补全缺失 id
  let dirty = false
  list.forEach((tx, i) => {
    if (!tx.id) { tx.id = 'legacy_' + phone + '_' + i; dirty = true }
  })
  if (dirty) _write('transactions_' + phone, list)
  return list
}

function addTransaction(phone, tx) {
  const list = getTransactions(phone)
  list.unshift({ ...tx, id: Date.now(), time: new Date().toLocaleString() })
  _write('transactions_' + phone, list)
  _registerPhone(phone)
}

function getAllTransactions() {
  const allPhones = _read('all_phones', [])
  let result = []
  for (const phone of allPhones) {
    const txs = getTransactions(phone)
    txs.forEach(tx => result.push({ ...tx, phone }))
  }
  result.sort((a, b) => new Date(b.time) - new Date(a.time))
  return result
}

function getTxDetail(txId) {
  return _read('tx_detail_' + txId, { notes: '', photos: [] })
}

function saveTxDetail(txId, detail) {
  _write('tx_detail_' + txId, detail)
}

/* ------------------------------ 门店预约 ------------------------------ */

function getAppointments(storeId) {
  return _read('appointments_' + storeId, [])
}

function addAppointment(storeId, appointment) {
  const list = getAppointments(storeId)
  list.push({ ...appointment, time: new Date().toLocaleString() })
  _write('appointments_' + storeId, list)
}

function getQueueCount(storeId, capacity) {
  const appointments = getAppointments(storeId)
  const active = appointments.filter(a => a.status === 'waiting').length
  return Math.max(0, active - capacity)
}

/* ------------------------------- 其它 ------------------------------- */

function isAdmin(phone) {
  return ADMIN_PHONES.includes(phone)
}

module.exports = {
  // 用户
  getUser, saveUser, clearUser,
  getUserByPhone, userExists, registerUser, verifyLogin, updateBalance,
  // 车辆
  getVehicles, addVehicle, removeVehicle,
  // 订单
  getOrders, getOrder, addOrder, updateOrderStatus, getAllOrders,
  // 交易
  getTransactions, addTransaction, getAllTransactions,
  getTxDetail, saveTxDetail,
  // 门店预约
  getAppointments, addAppointment, getQueueCount,
  // 其它
  isAdmin
}
