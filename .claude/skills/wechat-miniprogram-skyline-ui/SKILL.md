---
name: wechat-miniprogram-skyline-ui
description: 微信小程序 Skyline 渲染引擎完整开发指南。包含 Worklet 动画、手势系统、专属组件、官方示例模式。
version: "2.1"
priority: high

# 触发条件 - AI 遇到以下情况时应使用此技能
triggers:
  # 用户明确提及
  - "Skyline"
  - "skyline"
  - "新渲染引擎"
  - "原生渲染"
  - "Worklet"
  - "worklet"
  - "手势动画"
  - "60fps 动画"
  - "高性能动画"
  - "glass-easel"
  
  # 配置文件特征
  - '"renderer": "skyline"'
  - 'componentFramework.*glass-easel'
  
  # 组件名称
  - "list-view"
  - "grid-view"
  - "draggable-sheet"
  - "sticky-section"
  - "sticky-header"
  - "pan-gesture-handler"
  - "tap-gesture-handler"
  - "nested-scroll-header"
  - "nested-scroll-body"

# 标签分类
tags:
  - wechat
  - miniprogram
  - skyline
  - animation
  - gesture
  - performance
  - ui

# 冲突技能 - 不应同时使用
conflicts:
  - wechat-miniprogram-webview-ui

# 前置条件
prerequisites:
  - 项目已配置 renderer: skyline
  - 微信开发者工具版本 >= 1.06.2307260
  - 基础库版本 >= 2.25.2
---

# WeChat Mini Program Skyline UI Design System v2.1

> 基于微信官方文档 + awesome-skyline 示例库，提供完整正确的 Skyline 开发指南。

---

## 🎯 使用决策树

```
开始
  │
  ├─ 用户提到 "Skyline" / "新渲染引擎" / "Worklet"?
  │   └─ ✅ 使用此技能
  │
  ├─ app.json 包含 "renderer": "skyline"?
  │   └─ ✅ 使用此技能
  │
  ├─ 需要以下功能?
  │   ├─ 60fps 跟手动画        → ✅ 使用此技能
  │   ├─ 复杂手势交互          → ✅ 使用此技能
  │   ├─ 半屏弹窗/抽屉         → ✅ 使用此技能
  │   ├─ 瀑布流/虚拟列表       → ✅ 使用此技能
  │   ├─ 嵌套滚动              → ✅ 使用此技能
  │   ├─ 吸顶效果              → ✅ 使用此技能
  │   └─ 普通页面/表单         → ❌ 使用 WebView 技能
  │
  ├─ 代码中出现以下组件?
  │   ├─ list-view / grid-view       → ✅ 使用此技能
  │   ├─ draggable-sheet             → ✅ 使用此技能
  │   ├─ sticky-section              → ✅ 使用此技能
  │   ├─ pan-gesture-handler         → ✅ 使用此技能
  │   └─ nested-scroll-header/body   → ✅ 使用此技能
  │
  └─ 其他情况
      └─ ❓ 询问用户是否使用 Skyline
```

### 快速判断清单

| 场景 | 使用 Skyline? | 原因 |
|------|---------------|------|
| 商品详情页 (大量动画) | ✅ 是 | 需要流畅动画 |
| 即时通讯聊天列表 | ✅ 是 | 需要 reverse 滚动 |
| 电商首页 (瀑布流) | ✅ 是 | 需要 grid-view masonry |
| 地图+半屏弹窗 | ✅ 是 | 需要 draggable-sheet |
| Tab 滑动切换 | ✅ 是 | 需要跟手动画 |
| 通讯录 (字母索引) | ✅ 是 | 需要 sticky-section |
| 设置页 (简单表单) | ❌ 否 | WebView 足够 |
| 登录注册页 | ❌ 否 | WebView 足够 |
| 纯文本详情页 | ❌ 否 | WebView 足够 |

### 关键识别特征

**代码层面:**
```javascript
// ✅ 看到这些 = 使用 Skyline 技能
wx.worklet.shared()
wx.worklet.timing()
'worklet'  // 函数内第一行
this.applyAnimatedStyle()
worklet:bindscroll
worklet:ongesture
```

**配置层面:**
```json
// ✅ 看到这些 = 使用 Skyline 技能
{ "renderer": "skyline" }
{ "componentFramework": "glass-easel" }
```

---

## 快速启用 Skyline

### app.json (全局启用)

```json
{
  "renderer": "skyline",
  "componentFramework": "glass-easel",
  "lazyCodeLoading": "requiredComponents",
  "rendererOptions": {
    "skyline": {
      "defaultDisplayBlock": true,
      "defaultContentBox": true,
      "enableScrollViewAutoSize": true,
      "tagNameStyleIsolation": "legacy"
    }
  }
}
```

### page.json (单页启用)

```json
{
  "renderer": "skyline",
  "componentFramework": "glass-easel",
  "navigationStyle": "custom"
}
```

### 开发者工具设置

**必须勾选**:
- 详情 > 本地设置 > 开启 Skyline 渲染调试
- 详情 > 本地设置 > 编译 worklet 代码
- 详情 > 本地设置 > 将 JS 编译成 ES5

---

## ⚠️ 关键开发规则 (必读!)

> 以下是 Skyline 开发中最常见的问题，AI 在生成代码前必须遵守！

### 1. 页面结构规范

**❌ 错误做法:**
```xml
<!-- 不要用 view 包裹整个页面! Skyline 默认 flex 布局会导致问题 -->
<view class="page-container">
  <view class="header">...</view>
  <view class="content">...</view>
</view>
```

**✅ 正确做法:**
```xml
<!-- Skyline 页面应使用 scroll-view 作为根容器 -->
<scroll-view 
  scroll-y 
  type="list" 
  style="height: 100vh;"
  show-scrollbar="{{false}}"
>
  <view class="header">...</view>
  <view class="content">...</view>
</scroll-view>
```

### 2. scroll-view 必须设置高度!

**这是 Skyline 最常见的错误!** Skyline 下 scroll-view 默认不会自动撑开。

**❌ 错误 - 不设置高度:**
```xml
<scroll-view scroll-y>
  <view wx:for="{{list}}">{{item}}</view>
</scroll-view>
```

**✅ 正确 - 使用 100vh 或 calc:**
```xml
<!-- 方案1: 全屏滚动 -->
<scroll-view scroll-y style="height: 100vh;">
  ...
</scroll-view>

<!-- 方案2: 减去导航栏高度 -->
<scroll-view scroll-y style="height: calc(100vh - 88px);">
  ...
</scroll-view>

<!-- 方案3: flex: 1 配合父容器 -->
<view style="display: flex; flex-direction: column; height: 100vh;">
  <view class="nav-bar">导航栏</view>
  <scroll-view scroll-y style="flex: 1;">
    ...内容...
  </scroll-view>
</view>
```

**如果确实需要自动撑开，配置 rendererOptions:**
```json
{
  "rendererOptions": {
    "skyline": {
      "enableScrollViewAutoSize": true
    }
  }
}
```

### 3. 自定义导航栏 (Skyline 必须!)

Skyline 需要设置 `"navigationStyle": "custom"`，因此必须自己实现导航栏。

**page.json:**
```json
{
  "renderer": "skyline",
  "navigationStyle": "custom"
}
```

**自定义导航栏组件 (custom-nav-bar):**

WXML:
```xml
<view class="nav-bar" style="padding-top: {{statusBarHeight}}px;">
  <view class="nav-bar__content" style="height: {{navBarHeight}}px;">
    <!-- 返回按钮 -->
    <view class="nav-bar__left" bindtap="onBack" wx:if="{{showBack}}">
      <image src="/images/back.svg" class="nav-bar__back-icon" />
    </view>
    <!-- 标题 -->
    <view class="nav-bar__title">
      <text>{{title}}</text>
    </view>
    <!-- 右侧插槽 -->
    <view class="nav-bar__right">
      <slot name="right"></slot>
    </view>
  </view>
</view>
<!-- 占位，防止内容被导航栏遮挡 -->
<view style="height: {{statusBarHeight + navBarHeight}}px;"></view>
```

JS:
```javascript
Component({
  options: {
    multipleSlots: true
  },
  properties: {
    title: { type: String, value: '' },
    showBack: { type: Boolean, value: true },
    backgroundColor: { type: String, value: '#ffffff' }
  },
  data: {
    statusBarHeight: 0,
    navBarHeight: 44
  },
  lifetimes: {
    attached() {
      const systemInfo = wx.getSystemInfoSync()
      this.setData({
        statusBarHeight: systemInfo.statusBarHeight
      })
    }
  },
  methods: {
    onBack() {
      wx.navigateBack({ delta: 1 })
    }
  }
})
```

WXSS:
```css
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: var(--nav-bg, #ffffff);
}
.nav-bar__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16rpx;
}
.nav-bar__left {
  width: 80rpx;
  display: flex;
  align-items: center;
}
.nav-bar__back-icon {
  width: 48rpx;
  height: 48rpx;
}
.nav-bar__title {
  flex: 1;
  text-align: center;
}
.nav-bar__title text {
  font-size: 34rpx;
  font-weight: 500;
  color: #333333;
}
.nav-bar__right {
  width: 80rpx;
  display: flex;
  justify-content: flex-end;
}
```

### 4. Skyline 默认样式差异

| 属性 | WebView 默认 | Skyline 默认 | 说明 |
|------|-------------|--------------|------|
| display | block | **flex** | 所有元素默认 flex! |
| box-sizing | content-box | **border-box** | 宽高包含 padding/border |
| position | static | static | 相同 |

**常见样式问题解决:**
```css
/* 方案1: 页面级配置恢复 WebView 行为 */
/* 使用 rendererOptions 配置 */

/* 方案2: 手动设置 */
view, text, image {
  display: block;  /* 恢复 block 布局 */
  box-sizing: content-box;  /* 恢复 content-box */
}

/* 方案3: 拥抱 flex (推荐) */
.container {
  display: flex;
  flex-direction: column;
  /* Skyline 已经是 flex，直接用 */
}
```

---

## ⛔ 常见错误速查表

| 错误现象 | 原因 | 解决方案 |
|----------|------|----------|
| scroll-view 无法滚动 | 没有设置高度 | 添加 `height: 100vh` 或 `flex: 1` |
| 页面布局混乱 | Skyline 默认 flex | 设置 `defaultDisplayBlock: true` 或使用 flex 布局 |
| 文字不显示 | 直接在 view 里写文字 | 用 `<text>` 组件包裹 |
| 元素宽度不对 | Skyline 默认 border-box | 检查 padding 是否影响 |
| page-meta/navigation-bar 无效 | 这些是 WebView 专属 | Skyline 需自定义导航栏组件 |
| 样式选择器不生效 | tag 选择器被隔离 | 设置 `tagNameStyleIsolation: "legacy"` |
| position: fixed 失效 | Skyline 的 fixed 行为不同 | 使用 `root-portal` 组件 |
| 动画卡顿 | 没使用 Worklet | 使用 `wx.worklet` + `applyAnimatedStyle` |

---

## Skyline vs WebView 关键差异

| 特性 | WebView 默认 | Skyline 默认 | 配置项 |
|------|-------------|--------------|--------|
| 布局模式 | block | **flex** | `defaultDisplayBlock: true` |
| 盒模型 | content-box | **border-box** | `defaultContentBox: true` |
| scroll-view | 自动撑开 | 需指定高度 | `enableScrollViewAutoSize: true` |
| tag 选择器 | 不隔离 | 隔离 | `tagNameStyleIsolation: "legacy"` |
| 文本渲染 | view 内可直接写文字 | 必须用 text 组件 | - |

### 文本渲染规则

```xml
<!-- ❌ WebView 可以，Skyline 不行 -->
<view>这是文本</view>

<!-- ✅ Skyline 必须用 text -->
<view><text>这是文本</text></view>

<!-- ✅ 图标 + 文本用 span -->
<view>
  <span>
    <image src="/icons/search.svg" class="icon" />
    <text>搜索</text>
  </span>
</view>
```

---

## Worklet 动画

### 核心概念

#### 1. shared 共享变量

在 JS 线程创建，可在两个线程间同步的变量:

```javascript
const { shared } = wx.worklet

Page({
  onLoad() {
    // 创建共享变量
    this.offset = shared(0)
    this.opacity = shared(1)
    this.scale = shared(1)
  }
})
```

#### 2. worklet 函数

函数体顶部必须有 `'worklet'` 指令声明:

```javascript
function someWorklet(value) {
  'worklet'  // 必须!
  console.log('[ui]', value)
}

// 在 JS 线程调用
someWorklet('hello')  // print: hello

// 在 UI 线程调用
wx.worklet.runOnUI(someWorklet)('hello')  // print: [ui] hello
```

#### 3. applyAnimatedStyle

将动画样式应用到节点:

```javascript
const { shared } = wx.worklet

Page({
  onLoad() {
    this.offset = shared(0)
    
    // 在 onLoad 或 onReady 中应用动画样式
    wx.nextTick(() => {
      this.applyAnimatedStyle('#moved-box', () => {
        'worklet'
        return {
          transform: `translateX(${this.offset.value}px)`
        }
      })
    })
  },
  
  // 修改 shared 值会自动触发动画更新
  handleTap() {
    this.offset.value = Math.random() * 200
  }
})
```

---

### 动画类型

#### timing - 渐变动画

```javascript
const { shared, timing, Easing } = wx.worklet

Page({
  onLoad() {
    this.offset = shared(0)
    
    wx.nextTick(() => {
      this.applyAnimatedStyle('.box', () => {
        'worklet'
        return { transform: `translateX(${this.offset.value}px)` }
      })
    })
  },
  
  animate() {
    // 目标值 300，时长 200ms，缓动函数 ease
    this.offset.value = timing(300, {
      duration: 200,
      easing: Easing.ease
    })
  }
})
```

**Easing 缓动函数**:
- `Easing.linear` - 线性
- `Easing.ease` - 缓入缓出
- `Easing.easeIn` - 缓入
- `Easing.easeOut` - 缓出
- `Easing.easeInOut` - 缓入缓出
- `Easing.bezier(x1, y1, x2, y2)` - 自定义贝塞尔曲线

#### spring - 弹性动画

```javascript
const { shared, spring } = wx.worklet

Page({
  onLoad() {
    this.scale = shared(1)
    
    wx.nextTick(() => {
      this.applyAnimatedStyle('.box', () => {
        'worklet'
        return { transform: `scale(${this.scale.value})` }
      })
    })
  },
  
  bounce() {
    this.scale.value = spring(1.2, {
      mass: 1,        // 质量
      stiffness: 100, // 刚度
      damping: 10     // 阻尼
    })
  }
})
```

#### decay - 衰减动画

```javascript
const { shared, decay } = wx.worklet

// 根据初始速度自然衰减
this.offset.value = decay(initialVelocity, {
  deceleration: 0.998  // 减速率
})
```

#### 组合动画

```javascript
const { shared, timing, sequence, repeat, delay, Easing } = wx.worklet

// 顺序执行
this.offset.value = sequence(
  timing(100, { duration: 200 }),
  timing(0, { duration: 200 })
)

// 重复执行
this.offset.value = repeat(
  timing(100, { duration: 200 }),
  3  // 重复次数，-1 为无限
)

// 延迟执行
this.offset.value = delay(
  500,  // 延迟毫秒
  timing(100, { duration: 200 })
)
```

---

### runOnUI / runOnJS

#### 从 JS 线程调用 UI 线程

```javascript
const { runOnUI } = wx.worklet

function logInUI(msg) {
  'worklet'
  console.log('[ui]', msg)
}

Page({
  triggerUI() {
    runOnUI(logInUI)('Hello from JS')
  }
})
```

#### 从 UI 线程调回 JS 线程

```javascript
const { runOnJS } = wx.worklet

Page({
  showModal(msg) {
    wx.showModal({ title: msg })
  },
  
  handleGesture(evt) {
    'worklet'
    // ⚠️ 必须使用 bind(this)
    const showModal = this.showModal.bind(this)
    runOnJS(showModal)('手势触发')
  }
})
```

---

### ⚠️ Worklet 注意事项

#### 1. 不要解构 this.data

```javascript
handleTap() {
  'worklet'
  
  // ❌ 错误: 解构会冻结 this.data，导致 setData 失效
  const { msg } = this.data
  
  // ✅ 正确: 直接访问属性
  const msg = this.data.msg
}
```

#### 2. 调用 Page 方法必须 bind(this)

```javascript
handleTap() {
  'worklet'
  
  // ❌ 错误: 直接调用
  this.showModal('hello')
  
  // ✅ 正确: bind 后通过 runOnJS
  const showModal = this.showModal.bind(this)
  runOnJS(showModal)('hello')
}
```

#### 3. 捕获的外部变量会被冻结

```javascript
const obj = { name: 'skyline' }

function someWorklet() {
  'worklet'
  // obj 已被序列化，后续修改不会同步
  console.log(obj.name)  // 始终输出 'skyline'
}

obj.name = 'changed'  // 这个修改不会影响 worklet 内部
```

**解决方案**: 使用 shared 变量

---

## 手势系统

### 手势组件列表

| 组件 | 说明 |
|------|------|
| `<tap-gesture-handler>` | 点击手势 |
| `<double-tap-gesture-handler>` | 双击手势 |
| `<long-press-gesture-handler>` | 长按手势 |
| `<pan-gesture-handler>` | 拖动手势 (横向/纵向) |
| `<vertical-drag-gesture-handler>` | 纵向拖动 |
| `<horizontal-drag-gesture-handler>` | 横向拖动 |
| `<scale-gesture-handler>` | 缩放手势 |
| `<force-press-gesture-handler>` | 重压手势 |

### 手势状态 (GestureState)

```javascript
const GestureState = {
  POSSIBLE: 0,   // 可能
  BEGAN: 1,      // 开始
  ACTIVE: 2,     // 活动中
  END: 3,        // 结束
  CANCELLED: 4,  // 取消
  FAILED: 5      // 失败
}
```

### 基础用法: 拖动手势

```xml
<!-- WXML -->
<pan-gesture-handler onGestureEvent="handlePan">
  <view class="draggable-card">
    <text>拖动我</text>
  </view>
</pan-gesture-handler>
```

```javascript
// JS
const { shared, timing } = wx.worklet

Page({
  onLoad() {
    this.offsetX = shared(0)
    this.offsetY = shared(0)
    
    wx.nextTick(() => {
      this.applyAnimatedStyle('.draggable-card', () => {
        'worklet'
        return {
          transform: `translate(${this.offsetX.value}px, ${this.offsetY.value}px)`
        }
      })
    })
  },
  
  handlePan(evt) {
    'worklet'
    
    if (evt.state === GestureState.ACTIVE) {
      // 拖动中: 更新位置
      this.offsetX.value += evt.deltaX
      this.offsetY.value += evt.deltaY
    } else if (evt.state === GestureState.END) {
      // 结束: 回弹到原位
      this.offsetX.value = timing(0, { duration: 300 })
      this.offsetY.value = timing(0, { duration: 300 })
    }
  }
})
```

### 嵌套手势

```xml
<!-- 外层横向，内层纵向 -->
<horizontal-drag-gesture-handler onGestureEvent="handleHorizontal">
  <vertical-drag-gesture-handler onGestureEvent="handleVertical">
    <view class="box">单向滑动</view>
  </vertical-drag-gesture-handler>
</horizontal-drag-gesture-handler>
```

### 代理原生组件手势

```xml
<!-- 代理 scroll-view 内部纵向滚动手势 -->
<vertical-drag-gesture-handler 
  native-view="scroll-view"
  onGestureEvent="handleScroll"
>
  <scroll-view scroll-y>
    <!-- 内容 -->
  </scroll-view>
</vertical-drag-gesture-handler>
```

---

## scroll-view 完整指南 (Skyline)

scroll-view 是 Skyline 中最重要的滚动容器组件，支持多种模式和丰富的特性。

### type 属性详解

| type 值 | 说明 | 配合组件 | 基础库 |
|---------|------|----------|--------|
| (默认) | 普通滚动模式 | - | 1.0.0 |
| `list` | 列表模式，优化性能 | - | 2.25.2 |
| `custom` | 自定义子节点 | list-view, grid-view, sticky-section | 2.25.2 |
| `nested` | 嵌套滚动模式 | nested-scroll-header, nested-scroll-body | 2.29.0 |

### Skyline 特有属性

| 属性 | 类型 | 说明 | 基础库 |
|------|------|------|--------|
| type | string | 滚动模式: list/custom/nested | 2.25.2 |
| reverse | boolean | 是否反向滚动 (聊天列表场景) | 2.27.2 |
| bounces | boolean | 是否开启回弹效果 | 2.29.0 |
| cache-extent | number | 按需渲染的缓存区域 (px) | 2.32.1 |
| scroll-into-view-within-extent | boolean | scrollIntoView 是否只在缓存区域内生效 | 2.32.1 |
| show-scrollbar | boolean | 是否显示滚动条 | 2.29.0 |
| fast-deceleration | boolean | 是否开启快速减速 | 2.33.0 |
| paging-enabled | boolean | 是否按分页滚动 | 2.29.0 |
| padding | array | 内边距 [top, right, bottom, left] | 2.29.0 |
| associative-container | string | 关联容器: nested-scroll-view / draggable-sheet | 3.2.0 |

### Worklet 滚动回调

```xml
<scroll-view
  type="custom"
  scroll-y
  worklet:bindscrollstart="onScrollStart"
  worklet:bindscroll="onScroll"
  worklet:bindscrollend="onScrollEnd"
>
  <!-- 内容 -->
</scroll-view>
```

```javascript
const { shared, timing } = wx.worklet

Page({
  onLoad() {
    this.scrollTop = shared(0)
    
    wx.nextTick(() => {
      this.applyAnimatedStyle('.navbar', () => {
        'worklet'
        const progress = Math.min(this.scrollTop.value / 200, 1)
        return {
          backgroundColor: `rgba(255, 255, 255, ${progress})`,
          boxShadow: progress > 0.5 
            ? `0 2rpx 8rpx rgba(0,0,0,${progress * 0.1})` 
            : 'none'
        }
      })
    })
  },
  
  onScrollStart(e) {
    'worklet'
    console.log('scroll start', e.scrollTop)
  },
  
  onScroll(e) {
    'worklet'
    this.scrollTop.value = e.scrollTop
  },
  
  onScrollEnd(e) {
    'worklet'
    console.log('scroll end', e.scrollTop)
  }
})
```

### 自定义下拉刷新

```xml
<scroll-view
  type="list"
  scroll-y
  refresher-enabled="{{true}}"
  refresher-threshold="{{80}}"
  refresher-default-style="none"
  refresher-triggered="{{isRefreshing}}"
  bindrefresherrefresh="onRefresh"
  bindrefresherpulling="onPulling"
  bindrefresherrestore="onRestore"
  bindrefresherabort="onAbort"
  worklet:bindrefresherstatuschange="onStatusChange"
>
  <!-- 自定义刷新节点 -->
  <view slot="refresher" class="refresher">
    <view class="refresher-content">
      <text>{{refresherText}}</text>
    </view>
  </view>
  
  <!-- 列表内容 -->
  <view wx:for="{{items}}" wx:key="id">{{item.name}}</view>
</scroll-view>
```

```javascript
Page({
  data: {
    isRefreshing: false,
    refresherText: '下拉刷新'
  },
  
  onStatusChange(e) {
    'worklet'
    // status: Idle, CanRefresh, Refreshing, Completed, Failed
    console.log('status:', e.status, 'dy:', e.dy)
  },
  
  onPulling(e) {
    // 下拉过程中
    const dy = e.detail.dy
    this.setData({
      refresherText: dy > 80 ? '松手刷新' : '下拉刷新'
    })
  },
  
  async onRefresh() {
    this.setData({ isRefreshing: true })
    
    try {
      await this.loadData()
    } finally {
      this.setData({ isRefreshing: false })
    }
  }
})
```

### 下拉二级 (下拉进入二楼)

```xml
<scroll-view
  type="list"
  scroll-y
  refresher-enabled="{{true}}"
  refresher-two-level-enabled="{{true}}"
  refresher-two-level-threshold="{{150}}"
  refresher-two-level-scroll-enabled="{{true}}"
  refresher-two-level-close-threshold="{{80}}"
  bindrefresherstatuschange="onStatusChange"
>
  <view slot="refresher" class="refresher">
    <view wx:if="{{status === 'CanTwoLevel'}}">松手进入二楼</view>
    <view wx:elif="{{status === 'TwoLeveling'}}">
      <view class="two-level-content">二楼内容</view>
    </view>
  </view>
  
  <!-- 一楼内容 -->
</scroll-view>
```

**RefreshStatus 枚举**:
- `Idle` - 空闲
- `CanRefresh` - 可刷新 (超过阈值)
- `Refreshing` - 刷新中
- `Completed` - 刷新完成
- `Failed` - 刷新失败
- `CanTwoLevel` - 可进入二级 (超过二级阈值)
- `TwoLevelOpening` - 正在打开二级
- `TwoLeveling` - 二级已打开
- `TwoLevelClosing` - 正在关闭二级

### 嵌套滚动模式 (type="nested")

用于两个 scroll-view 嵌套场景，实现丝滑的滚动衔接:

```xml
<!-- 外层 scroll-view -->
<scroll-view 
  type="nested" 
  scroll-y
  refresher-enabled="{{true}}"
>
  <view slot="refresher">自定义刷新</view>
  
  <!-- 外层固定内容 -->
  <nested-scroll-header>
    <view class="banner">
      <image src="/images/banner.jpg" mode="aspectFill" />
    </view>
  </nested-scroll-header>
  
  <nested-scroll-header>
    <view class="tabs">
      <text wx:for="{{tabs}}" wx:key="*this" 
        class="{{activeTab === index ? 'active' : ''}}"
        bindtap="switchTab" data-index="{{index}}"
      >{{item}}</text>
    </view>
  </nested-scroll-header>
  
  <!-- 内层滚动区域 -->
  <nested-scroll-body>
    <swiper current="{{activeTab}}" bindchange="onSwiperChange">
      <swiper-item wx:for="{{tabs}}" wx:key="*this">
        <!-- 里层 scroll-view -->
        <scroll-view 
          type="list" 
          scroll-y
          associative-container="nested-scroll-view"
        >
          <view wx:for="{{tabContents[index]}}" wx:key="id" class="item">
            {{item.name}}
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </nested-scroll-body>
</scroll-view>
```

**嵌套模式规则**:
1. 外层 scroll-view 子节点只能是 nested-scroll-header、nested-scroll-body 或 refresher slot
2. 只能有一个 nested-scroll-body
3. nested-scroll-header 和 nested-scroll-body 只能有一个直接子节点
4. 嵌套滚动策略: 向下滚动时先外后内，向上滚动时先内后外

### 列表构造器 (list-builder)

用于超长列表的按需渲染/回收，大幅提升性能:

```xml
<scroll-view type="custom" scroll-y>
  <list-builder
    list="{{list}}"
    child-count="{{list.length}}"
    child-height="200"
    bind:itembuild="onItemBuild"
    bind:itemdispose="onItemDispose"
  >
    <view slot:item slot:index style="height: 200px;">
      <image src="{{item.cover}}" />
      <text>{{item.title}}</text>
    </view>
  </list-builder>
</scroll-view>
```

```javascript
Page({
  data: {
    list: [] // 大量数据
  },
  
  onItemBuild(e) {
    console.log('创建列表项:', e.detail.index)
  },
  
  onItemDispose(e) {
    console.log('回收列表项:', e.detail.index)
  }
})
```

**注意事项**:
- scroll-view 必须设置 `type="custom"`
- 所有列表项必须等高，通过 `child-height` 指定
- 只支持纵向滚动
- 不支持 `scroll-into-view`

### 网格构造器 (grid-builder)

```xml
<scroll-view type="custom" scroll-y>
  <grid-builder
    list="{{list}}"
    child-count="{{list.length}}"
    cross-axis-count="4"
    cross-axis-gap="8"
    main-axis-gap="8"
  >
    <view slot:item slot:index style="height: 200px;">
      <image src="{{item.cover}}" mode="aspectFill" />
    </view>
  </grid-builder>
</scroll-view>
```

### 反向滚动 (聊天列表)

```xml
<scroll-view
  type="list"
  scroll-y
  reverse="{{true}}"
  scroll-into-view="{{lastMessageId}}"
>
  <view wx:for="{{messages}}" wx:key="id" id="msg-{{item.id}}">
    <text>{{item.content}}</text>
  </view>
</scroll-view>
```

### 分页滚动

```xml
<scroll-view
  type="custom"
  scroll-x
  paging-enabled="{{true}}"
  style="width: 100vw;"
>
  <view class="page" style="width: 100vw;">第1页</view>
  <view class="page" style="width: 100vw;">第2页</view>
  <view class="page" style="width: 100vw;">第3页</view>
</scroll-view>
```

---

## 其他 Skyline 专属组件

### list-view - 高性能列表

```xml
<scroll-view type="custom" scroll-y class="list-container">
  <list-view>
    <view class="item" wx:for="{{items}}" wx:key="id">
      <image class="avatar" src="{{item.avatar}}" />
      <text class="name">{{item.name}}</text>
    </view>
  </list-view>
</scroll-view>
```

### grid-view - 网格/瀑布流

```xml
<!-- 网格布局 -->
<scroll-view type="custom" scroll-y>
  <grid-view 
    type="aligned"
    cross-axis-count="{{3}}"
    main-axis-gap="{{16}}"
    cross-axis-gap="{{16}}"
  >
    <view wx:for="{{items}}" wx:key="id" class="grid-item">
      <image src="{{item.cover}}" mode="aspectFill" />
    </view>
  </grid-view>
</scroll-view>

<!-- 瀑布流布局 -->
<scroll-view type="custom" scroll-y>
  <grid-view 
    type="masonry"
    cross-axis-count="{{2}}"
    main-axis-gap="{{16}}"
    cross-axis-gap="{{16}}"
  >
    <view wx:for="{{items}}" wx:key="id" class="waterfall-item">
      <image src="{{item.cover}}" mode="widthFix" lazy-load />
      <view class="info">
        <text class="title">{{item.title}}</text>
        <text class="price">¥{{item.price}}</text>
      </view>
    </view>
  </grid-view>
</scroll-view>
```

### sticky-section - 吸顶分组

```xml
<scroll-view type="custom" scroll-y>
  <sticky-section wx:for="{{sections}}" wx:key="id">
    <sticky-header>
      <view class="section-header">
        <text>{{item.title}}</text>
      </view>
    </sticky-header>
    
    <list-view>
      <view wx:for="{{item.items}}" wx:key="id" class="item">
        <text>{{item.name}}</text>
      </view>
    </list-view>
  </sticky-section>
</scroll-view>
```

### nested-scroll - 嵌套滚动

```xml
<scroll-view type="nested" scroll-y class="page">
  <nested-scroll-header>
    <view class="banner">
      <image src="/images/banner.jpg" mode="aspectFill" />
    </view>
    <view class="tabs">
      <text wx:for="{{tabs}}" wx:key="*this">{{item}}</text>
    </view>
  </nested-scroll-header>
  
  <nested-scroll-body>
    <scroll-view scroll-y class="content">
      <list-view>
        <view wx:for="{{items}}" wx:key="id">{{item.name}}</view>
      </list-view>
    </scroll-view>
  </nested-scroll-body>
</scroll-view>
```

### draggable-sheet - 可拖拽半屏

```xml
<draggable-sheet
  class="sheet"
  initial-child-size="0.5"
  min-child-size="0.2"
  max-child-size="0.9"
  snap="{{true}}"
  snap-sizes="{{[0.3, 0.6]}}"
  worklet:onsizeupdate="onSizeUpdate"
>
  <scroll-view 
    scroll-y="{{true}}" 
    type="list" 
    associative-container="draggable-sheet"
    bounces="{{true}}"
  >
    <view class="sheet-content">
      <view class="handle"></view>
      <text class="title">半屏面板</text>
      <!-- 内容 -->
    </view>
  </scroll-view>
</draggable-sheet>
```

```javascript
Page({
  onReady() {
    // 获取 sheet context
    this.createSelectorQuery()
      .select('.sheet')
      .node()
      .exec(res => {
        this.sheetContext = res[0].node
      })
  },
  
  onSizeUpdate(e) {
    'worklet'
    console.log(`size: ${e.size}, pixels: ${e.pixels}`)
  },
  
  // 程序化控制
  expandSheet() {
    this.sheetContext.scrollTo({
      size: 0.8,
      animated: true,
      duration: 300,
      easingFunction: 'ease'
    })
  },
  
  collapseSheet() {
    this.sheetContext.scrollTo({
      size: 0.2,
      animated: true,
      duration: 300
    })
  }
})
```

```css
/* WXSS */
.sheet {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  border-radius: 24rpx 24rpx 0 0;
  box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.handle {
  width: 60rpx;
  height: 8rpx;
  background: #ddd;
  border-radius: 4rpx;
  margin: 16rpx auto;
}
```

### span - 行内图文容器

```xml
<!-- 图标 + 文本 -->
<view class="btn">
  <span>
    <image src="/icons/star.svg" class="icon" />
    <text>收藏</text>
  </span>
</view>

<!-- 内联多个元素 -->
<view class="info">
  <span>
    <text class="label">作者: </text>
    <text class="value">{{author}}</text>
  </span>
</view>
```

### snapshot - 截图组件

```xml
<snapshot id="target">
  <view class="card">
    <image src="{{cover}}" />
    <text>{{title}}</text>
  </view>
</snapshot>
```

```javascript
Page({
  takeSnapshot() {
    this.createSelectorQuery()
      .select('#target')
      .node()
      .exec(res => {
        const node = res[0].node
        node.takeSnapshot({
          type: 'arraybuffer',
          format: 'png'
        }).then(result => {
          // 保存到相册
          const fs = wx.getFileSystemManager()
          const filePath = `${wx.env.USER_DATA_PATH}/snapshot.png`
          fs.writeFileSync(filePath, result.data, 'binary')
          wx.saveImageToPhotosAlbum({ filePath })
        })
      })
  }
})
```

---

## 完整示例: 滚动渐变导航栏

```xml
<!-- pages/index/index.wxml -->
<view class="page">
  <!-- 自定义导航栏 -->
  <view class="navbar">
    <text class="title">首页</text>
  </view>

  <!-- 滚动内容 -->
  <scroll-view 
    class="content"
    type="custom"
    scroll-y
    bindscroll="onScroll"
  >
    <view class="banner">
      <image src="/images/banner.jpg" mode="aspectFill" />
    </view>
    
    <grid-view 
      type="masonry"
      cross-axis-count="{{2}}"
      main-axis-gap="{{16}}"
      cross-axis-gap="{{16}}"
      style="padding: 16rpx;"
    >
      <view 
        class="product-card"
        wx:for="{{products}}" 
        wx:key="id"
        bindtap="goDetail"
        data-id="{{item.id}}"
      >
        <image src="{{item.cover}}" mode="widthFix" lazy-load />
        <view class="info">
          <text class="title">{{item.title}}</text>
          <text class="price">¥{{item.price}}</text>
        </view>
      </view>
    </grid-view>
  </scroll-view>
</view>
```

```javascript
// pages/index/index.js
const { shared } = wx.worklet

Page({
  data: {
    products: []
  },

  onLoad() {
    // 创建共享变量
    this.scrollTop = shared(0)
    
    // 应用动画样式到导航栏
    wx.nextTick(() => {
      this.applyAnimatedStyle('.navbar', () => {
        'worklet'
        const opacity = Math.min(this.scrollTop.value / 200, 1)
        return {
          backgroundColor: `rgba(255, 255, 255, ${opacity})`,
          boxShadow: opacity > 0.5 
            ? `0 2rpx 8rpx rgba(0, 0, 0, ${opacity * 0.1})` 
            : 'none'
        }
      })
      
      // 标题透明度
      this.applyAnimatedStyle('.navbar .title', () => {
        'worklet'
        const opacity = Math.min(this.scrollTop.value / 200, 1)
        return { opacity }
      })
    })
    
    this.loadProducts()
  },
  
  onScroll(e) {
    // 更新共享变量，自动触发动画
    this.scrollTop.value = e.detail.scrollTop
  },
  
  async loadProducts() {
    const res = await wx.cloud.callFunction({
      name: 'getProducts',
      data: { page: 1, pageSize: 20 }
    })
    this.setData({ products: res.result.data })
  },
  
  goDetail(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/detail/index?id=${id}` })
  }
})
```

```css
/* pages/index/index.wxss */
.page {
  min-height: 100vh;
  background: #f5f5f5;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 88rpx;
  padding-top: env(safe-area-inset-top);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  /* 初始透明 */
  background-color: rgba(255, 255, 255, 0);
}

.navbar .title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  opacity: 0;
}

.content {
  height: 100vh;
}

.banner {
  height: 400rpx;
}

.banner image {
  width: 100%;
  height: 100%;
}

.product-card {
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.product-card image {
  width: 100%;
  display: block;
}

.product-card .info {
  padding: 16rpx;
}

.product-card .title {
  display: block;
  font-size: 28rpx;
  color: #333;
  line-height: 1.4;
  margin-bottom: 8rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-card .price {
  font-size: 32rpx;
  color: #ff4757;
  font-weight: bold;
}
```

---

## Skyline 组件速查表

| 组件 | 说明 | 基础库 |
|------|------|--------|
| span | 行内文本+图标容器 | 2.29.0 |
| snapshot | 截图组件 | 2.29.0 |
| sticky-header | 吸顶头部 | 2.29.0 |
| sticky-section | 吸顶分组 | 2.29.0 |
| list-view | 高性能列表 | 2.29.0 |
| grid-view | 网格/瀑布流 | 2.29.0 |
| nested-scroll-header | 嵌套滚动头部 | 2.29.0 |
| nested-scroll-body | 嵌套滚动主体 | 2.29.0 |
| draggable-sheet | 可拖拽半屏 | 3.2.0 |
| pan-gesture-handler | 拖动手势 | 2.29.0 |
| tap-gesture-handler | 点击手势 | 2.29.0 |
| double-tap-gesture-handler | 双击手势 | 2.29.0 |
| long-press-gesture-handler | 长按手势 | 2.29.0 |
| scale-gesture-handler | 缩放手势 | 2.29.0 |
| force-press-gesture-handler | 重压手势 | 2.29.0 |
| horizontal-drag-gesture-handler | 横向拖动 | 2.29.0 |
| vertical-drag-gesture-handler | 纵向拖动 | 2.29.0 |

---

## Worklet API 速查

| 类型 | API | 说明 |
|------|-----|------|
| 基础 | shared(value) | 创建共享变量 |
| 基础 | derived(fn) | 派生变量 |
| 基础 | cancelAnimation(sharedValue) | 取消动画 |
| 工具 | runOnUI(fn) | 在 UI 线程执行 |
| 工具 | runOnJS(fn) | 返回 JS 线程执行 |
| 动画 | timing(toValue, options) | 渐变动画 |
| 动画 | spring(toValue, options) | 弹性动画 |
| 动画 | decay(velocity, options) | 衰减动画 |
| 组合 | sequence(...animations) | 顺序执行 |
| 组合 | repeat(animation, count) | 重复执行 |
| 组合 | delay(ms, animation) | 延迟执行 |
| 缓动 | Easing.linear/ease/easeIn/easeOut | 缓动函数 |
| 实例 | applyAnimatedStyle(selector, updater) | 应用动画样式 |
| 实例 | clearAnimatedStyle(selector) | 清除动画样式 |

---

## 官方示例模式 (来自 awesome-skyline)

以下是微信官方 Skyline 示例库中提炼的核心交互模式。

### 模式1: 半屏弹窗 (手势协商)

实现可拖动关闭的半屏弹窗，手势与 scroll-view 滚动协商。

```xml
<!-- 半屏容器 -->
<view class="half-screen">
  <!-- 顶部拖动区域 -->
  <pan-gesture-handler worklet:ongesture="handlePan">
    <view class="header">
      <view class="handle"></view>
      <text>标题</text>
    </view>
  </pan-gesture-handler>
  
  <!-- 滚动区与 pan 手势协商 -->
  <pan-gesture-handler 
    id="pan" 
    worklet:should-response-on-move="shouldPanResponse"
    simultaneous-handlers="{{['scroll']}}"
    worklet:ongesture="handlePan"
  >
    <vertical-drag-gesture-handler 
      id="scroll" 
      native-view="scroll-view"
      worklet:should-response-on-move="shouldScrollViewResponse"
      simultaneous-handlers="{{['pan']}}"
    >
      <scroll-view 
        class="content"
        scroll-y 
        type="list"
        worklet:onscrollupdate="handleScroll"
        worklet:adjust-deceleration-velocity="adjustDecelerationVelocity"
        show-scrollbar="{{false}}"
      >
        <!-- 内容 -->
      </scroll-view>
    </vertical-drag-gesture-handler>
  </pan-gesture-handler>
</view>
```

```javascript
const { shared, timing } = wx.worklet

const GestureState = {
  POSSIBLE: 0, BEGIN: 1, ACTIVE: 2, END: 3, CANCELLED: 4
}

Component({
  lifetimes: {
    created() {
      this.transY = shared(1000)        // 半屏位置
      this.scrollTop = shared(0)        // 滚动位置
      this.startPan = shared(true)      // 是否允许 pan
      this.height = shared(1000)        // 半屏高度
    },
    ready() {
      // 获取半屏高度
      this.createSelectorQuery()
        .select('.half-screen')
        .boundingClientRect()
        .exec(res => {
          this.transY.value = this.height.value = res[0].height
        })
      
      // 绑定动画
      this.applyAnimatedStyle('.half-screen', () => {
        'worklet'
        return { transform: \`translateY(\${this.transY.value}px)\` }
      })
    }
  },
  
  methods: {
    // 打开半屏
    open() {
      'worklet'
      this.transY.value = timing(0, { duration: 300 })
    },
    
    // 关闭半屏
    close() {
      'worklet'
      this.transY.value = timing(this.height.value, { duration: 200 })
    },
    
    // pan 手势是否响应
    shouldPanResponse() {
      'worklet'
      return this.startPan.value
    },
    
    // scroll-view 是否响应
    shouldScrollViewResponse(e) {
      'worklet'
      // 半屏正在移动时，滚动不响应
      if (this.transY.value > 0) return false
      
      // 滚动到顶部且下拉时，切换到 pan
      const result = this.scrollTop.value <= 0 && e.deltaY > 0
      this.startPan.value = result
      return !result
    },
    
    // 处理 pan 手势
    handlePan(e) {
      'worklet'
      if (e.state === GestureState.ACTIVE) {
        // 移动半屏
        const dest = Math.max(0, this.transY.value + e.deltaY)
        this.transY.value = dest
      }
      
      if (e.state === GestureState.END || e.state === GestureState.CANCELLED) {
        // 根据速度和位置决定开/关
        if (e.velocityY > 500 && this.transY.value > 50) {
          this.close()
        } else if (this.transY.value > this.height.value / 2) {
          this.close()
        } else {
          this.open()
        }
      }
    },
    
    // 处理滚动
    handleScroll(e) {
      'worklet'
      this.scrollTop.value = e.detail.scrollTop
    },
    
    // 滚动衰减
    adjustDecelerationVelocity(velocity) {
      'worklet'
      return this.scrollTop.value <= 0 ? 0 : velocity
    }
  }
})
```

---

### 模式2: 分段式半屏 (3个吸附点)

半屏可吸附到3个位置: 最小/中间/最大。

```javascript
const { shared, timing } = wx.worklet
const { screenHeight, statusBarHeight, safeArea } = wx.getSystemInfoSync()

function clamp(val, min, max) {
  'worklet'
  return Math.min(Math.max(val, min), max)
}

Component({
  lifetimes: {
    created() {
      this.transY = shared(1000)
      this.scrollTop = shared(0)
      this.startPan = shared(true)
      this.initTransY = shared(0)  // 最小位置
      this.upward = shared(false)  // 滑动方向
    },
    ready() {
      // 初始位置 = 只露出 header
      this.createSelectorQuery()
        .select('.header')
        .boundingClientRect()
        .exec(res => {
          this.transY.value = this.initTransY.value = 
            screenHeight - res[0].height - (screenHeight - safeArea.bottom)
        })
    }
  },
  
  methods: {
    scrollTo(toValue) {
      'worklet'
      this.transY.value = timing(toValue, { duration: 200 })
    },
    
    handlePan(e) {
      'worklet'
      if (e.state === GestureState.ACTIVE) {
        this.upward.value = e.deltaY < 0
        // 移动范围: [状态栏高度, 屏幕高度]
        const dest = clamp(
          this.transY.value + e.deltaY, 
          statusBarHeight, 
          screenHeight
        )
        this.transY.value = dest
      }
      
      if (e.state === GestureState.END) {
        // 3个吸附点: 顶部 / 中间 / 底部
        if (this.transY.value <= screenHeight / 2) {
          this.scrollTo(this.upward.value ? statusBarHeight : screenHeight / 2)
        } else if (this.transY.value <= this.initTransY.value) {
          this.scrollTo(this.upward.value ? screenHeight / 2 : this.initTransY.value)
        } else {
          this.scrollTo(this.initTransY.value)
        }
      }
    }
  }
})
```

---

### 模式3: Tab 指示条跟手滑动

Tab 指示条跟随 swiper 滑动实时移动。

```xml
<view class="tabs">
  <view class="tab-list">
    <view wx:for="{{tabs}}" wx:key="*this" 
      class="tab {{selected === index ? 'active' : ''}}"
      data-index="{{index}}"
      bindtap="selectTab"
    >{{item}}</view>
    <view class="indicator"></view>
  </view>
</view>

<swiper 
  current="{{selected}}"
  bindchange="onTabChange"
  worklet:onscrollupdate="onTabTransition"
  worklet:onscrollend="onTabTransitionEnd"
  duration="{{400}}"
>
  <swiper-item wx:for="{{tabs}}" wx:key="*this">
    <!-- 内容 -->
  </swiper-item>
</swiper>
```

```javascript
const { shared } = wx.worklet

Component({
  data: { tabs: ['Tab1', 'Tab2', 'Tab3'], selected: 0 },
  
  lifetimes: {
    created() {
      const { windowWidth } = wx.getSystemInfoSync()
      this._tabWidth = shared(windowWidth / 3)
      this._translateX = shared(0)
      this._lastTranslateX = shared(0)
      this._windowWidth = shared(windowWidth)
    },
    attached() {
      this.applyAnimatedStyle('.indicator', () => {
        'worklet'
        return { transform: \`translateX(\${this._translateX.value}px)\` }
      })
    }
  },
  
  methods: {
    selectTab(e) {
      this.setData({ selected: e.currentTarget.dataset.index })
    },
    
    onTabChange(e) {
      this.setData({ selected: e.detail.current })
    },
    
    onTabTransition(e) {
      'worklet'
      // 根据 swiper 拖动比例计算指示条位置
      const ratio = e.detail.dx / this._windowWidth.value
      this._translateX.value = this._lastTranslateX.value + ratio * this._tabWidth.value
      
      if (e.detail.state === 2) { // scrollEnd
        this._lastTranslateX.value = this._translateX.value
      }
    },
    
    onTabTransitionEnd(e) {
      'worklet'
      this.onTabTransition(e)
      this._lastTranslateX.value = this._translateX.value
    }
  }
})
```

---

### 模式4: 搜索栏吸附 + 瀑布流

搜索栏滚动时吸附到顶部，配合瀑布流商品列表。

```xml
<scroll-view 
  type="custom" 
  scroll-y
  show-scrollbar="{{false}}"
  worklet:onscrollupdate="handleScroll"
>
  <!-- 顶部占位 -->
  <view class="top-spacer"></view>
  
  <sticky-section push-pinned-header="{{false}}">
    <!-- 吸顶搜索栏 -->
    <sticky-header>
      <view class="search-bar">
        <input placeholder="搜索商品" />
      </view>
    </sticky-header>
    
    <!-- 分类轮播 -->
    <swiper class="categories">
      <swiper-item wx:for="{{categoryPages}}" wx:key="page">
        <view class="category-grid">
          <view wx:for="{{item}}" wx:key="id" class="category-item">
            <image src="{{item.icon}}" />
            <text>{{item.name}}</text>
          </view>
        </view>
      </swiper-item>
    </swiper>
  </sticky-section>

  <sticky-section push-pinned-header="{{false}}">
    <!-- 二级分类吸顶 -->
    <sticky-header>
      <scroll-view 
        class="sub-categories"
        scroll-x 
        type="list"
        enable-flex
        scroll-into-view="{{activeSubCat}}"
        scroll-into-view-alignment="center"
      >
        <view wx:for="{{subCategories}}" wx:key="id" 
          class="sub-cat {{selected === index ? 'active' : ''}}"
          bindtap="selectSubCat"
          data-index="{{index}}"
          id="sub-cat-{{index}}"
        >{{item.name}}</view>
      </scroll-view>
    </sticky-header>
    
    <!-- 瀑布流商品 -->
    <grid-view
      type="masonry"
      cross-axis-count="{{2}}"
      cross-axis-gap="{{12}}"
      main-axis-gap="{{12}}"
      padding="{{[12, 12, 12, 12]}}"
    >
      <view wx:for="{{goods}}" wx:key="id" class="product-card">
        <image src="{{item.cover}}" mode="widthFix" fade-in />
        <view class="info">
          <text class="title">{{item.title}}</text>
          <text class="price">¥{{item.price}}</text>
        </view>
      </view>
    </grid-view>
  </sticky-section>
</scroll-view>
```

```javascript
const { shared, Easing } = wx.worklet

const lerp = (a, b, t) => { 'worklet'; return a + (b - a) * t }
const clamp = (v, min, max) => { 'worklet'; return Math.min(Math.max(v, min), max) }

Component({
  lifetimes: {
    created() {
      this.searchBarWidth = shared(100)
      this.navBarOpacity = shared(1)
    },
    attached() {
      // 搜索栏宽度动画
      this.applyAnimatedStyle('.search-bar input', () => {
        'worklet'
        return { width: \`\${this.searchBarWidth.value}%\` }
      })
      
      // 导航栏透明度动画
      this.applyAnimatedStyle('.nav-bar', () => {
        'worklet'
        return { opacity: this.navBarOpacity.value }
      })
    }
  },
  
  methods: {
    handleScroll(e) {
      'worklet'
      const maxDist = 60
      const scrollTop = clamp(e.detail.scrollTop, 0, maxDist)
      const progress = scrollTop / maxDist
      const eased = Easing.cubicBezier(0.4, 0, 0.2, 1)(progress)
      
      this.searchBarWidth.value = lerp(100, 70, eased)
      this.navBarOpacity.value = lerp(1, 0, progress)
    }
  }
})
```

---

### 模式5: 通讯录 (sticky-section + 索引导航)

带字母索引的通讯录列表。

```xml
<scroll-view 
  type="custom" 
  scroll-y
  scroll-into-view="{{currentAlpha}}"
  show-scrollbar="{{false}}"
  bindscroll="handleScroll"
>
  <sticky-section wx:for="{{list}}" wx:key="alpha">
    <sticky-header>
      <view class="section-header" id="{{item.alpha}}">
        <text>{{item.alpha}}</text>
      </view>
    </sticky-header>
    <list-view>
      <view wx:for="{{item.contacts}}" wx:key="name" class="contact-item">
        <image src="{{item.avatar}}" class="avatar" />
        <text>{{item.name}}</text>
      </view>
    </list-view>
  </sticky-section>
</scroll-view>

<!-- 右侧字母索引 -->
<view class="alphabet-bar" 
  catchtouchstart="onAlphabetTouch"
  catchtouchmove="onAlphabetTouch"
  catchtouchend="onAlphabetEnd"
>
  <view wx:for="{{alphabet}}" wx:key="*this" 
    data-alpha="{{item}}"
    class="alpha {{currentAlpha === item ? 'active' : ''}}">
    {{item}}
  </view>
</view>
```

```javascript
const throttle = (fn, wait) => {
  let last = 0
  return function(...args) {
    const now = Date.now()
    if (now - last >= wait) {
      last = now
      return fn.apply(this, args)
    }
  }
}

Component({
  lifetimes: {
    created() {
      this._handleTouch = throttle(this._handleTouch, 100)
      this._sharedScrollTop = wx.worklet.shared(0)
      this._sharedTops = wx.worklet.shared([])
      this._sharedCurrentIdx = wx.worklet.shared(0)
    }
  },
  
  methods: {
    onAlphabetTouch(e) {
      const y = e.changedTouches[0].clientY
      const index = Math.floor((y - this.data._anchorTop) / this.data._anchorItemH)
      const alpha = this.data.alphabet[index]
      if (alpha && alpha !== this.data.currentAlpha) {
        wx.vibrateShort({ type: 'light' })
        this.setData({ currentAlpha: alpha })
      }
    },
    
    handleScroll(e) {
      'worklet'
      const scrollTop = e.detail.scrollTop
      this._sharedScrollTop.value = scrollTop
      
      // 根据滚动位置更新当前字母
      const tops = this._sharedTops.value
      for (let i = tops.length - 1; i >= 0; i--) {
        if (scrollTop + 100 > tops[i]) {
          if (i !== this._sharedCurrentIdx.value) {
            wx.worklet.runOnJS(this.updateCurrent.bind(this))(i)
          }
          break
        }
      }
    },
    
    updateCurrent(idx) {
      this.setData({ currentAlpha: this.data.alphabet[idx] })
    }
  }
})
```

---

### 模式6: 店铺详情下拉展开

下拉展开店铺详情，上滑收起。

```javascript
const { shared, timing, decay, derived, runOnJS } = wx.worklet

const clamp = (v, min, max) => { 'worklet'; return Math.min(Math.max(v, min), max) }

const InteractionState = {
  INITIAL: 0,
  ANIMATING: 1,
  UNFOLD: 2,
  SCROLL: 3,
  RESET: 4
}

Component({
  lifetimes: {
    created() {
      this._state = shared(InteractionState.INITIAL)
      this._tabsTop = shared(0)
      this._mainHeight = shared(700)
      this._translY = shared(0)
      this._scrollTop = shared(0)
      this._canPan = shared(true)
    }
  },
  
  methods: {
    bindAnimatedStyle() {
      // 页面整体跟随
      this.applyAnimatedStyle('.page', () => {
        'worklet'
        const y = clamp(this._translY.value, -this._tabsTop.value, 0)
        return { transform: \`translateY(\${y}px)\` }
      })
      
      // 导航栏渐变
      this.applyAnimatedStyle('.nav-bar', () => {
        'worklet'
        const y = clamp(this._translY.value, -this._tabsTop.value, 0)
        const opacity = y / -this._tabsTop.value
        return { backgroundColor: \`rgba(255,255,255,\${opacity})\` }
      })
      
      // 主内容下移
      this.applyAnimatedStyle('.main', () => {
        'worklet'
        const y = clamp(this._translY.value, 0, Number.MAX_VALUE)
        return { transform: \`translateY(\${y}px)\` }
      })
      
      // 简介隐藏
      this.applyAnimatedStyle('.shop-brief', () => {
        'worklet'
        const y = clamp(this._translY.value, 50, 100) - 50
        return { opacity: 1 - (y / 50) }
      })
      
      // 详情显示
      this.applyAnimatedStyle('.shop-detail', () => {
        'worklet'
        const y = clamp(this._translY.value, 100, 150) - 100
        return { opacity: y / 50 }
      })
    },
    
    handlePan(e) {
      'worklet'
      if (this._state.value === InteractionState.ANIMATING) return
      
      if (e.state === GestureState.ACTIVE) {
        if (this._state.value === InteractionState.UNFOLD) {
          // 展开状态上滑收起
          if (e.absoluteY - this._startY.value < 0) {
            this._state.value = InteractionState.ANIMATING
            this._translY.value = timing(0, { duration: 250 }, () => {
              'worklet'
              this._state.value = InteractionState.RESET
            })
          }
        } else {
          this._translY.value = e.absoluteY - this._startY.value
        }
      }
      
      if (e.state === GestureState.END) {
        const _state = this._state
        if (this._translY.value > 100) {
          // 下拉超过 100 展开
          _state.value = InteractionState.ANIMATING
          this._translY.value = timing(this._mainHeight.value, { duration: 250 }, () => {
            'worklet'
            _state.value = InteractionState.UNFOLD
          })
        } else if (this._translY.value > 0) {
          // 没超过回弹
          _state.value = InteractionState.ANIMATING
          this._translY.value = timing(0, { duration: 250 }, () => {
            'worklet'
            _state.value = InteractionState.INITIAL
          })
        } else if (this._translY.value > -this._tabsTop.value) {
          // 上滑做衰减动画
          this._state.value = InteractionState.SCROLL
          this._translY.value = decay({
            velocity: e.velocityY, 
            clamp: [-this._tabsTop.value, 0]
          })
        }
      }
    }
  }
})
```

---

## 官方示例项目

| 示例 | 说明 | 关键技术 |
|------|------|----------|
| [通讯录](https://github.com/wechat-miniprogram/awesome-skyline/tree/main/examples/address-book) | 字母索引列表 | sticky-section, list-view |
| [半屏弹窗](https://github.com/wechat-miniprogram/awesome-skyline/tree/main/examples/half-screen) | 可拖动半屏 | pan-gesture, 手势协商 |
| [分段式半屏](https://github.com/wechat-miniprogram/awesome-skyline/tree/main/examples/segmented-half-screen) | 3点吸附半屏 | pan-gesture, timing |
| [Tab 指示条](https://github.com/wechat-miniprogram/awesome-skyline/tree/main/examples/tab-indicator) | 跟手滑动指示条 | swiper worklet 回调 |
| [搜索栏吸附](https://github.com/wechat-miniprogram/awesome-skyline/tree/main/examples/product-list) | 商品列表 | sticky-header, grid-view |
| [沉浸式浏览](https://github.com/wechat-miniprogram/awesome-skyline/tree/main/examples/expanded-scroll-view) | 店铺详情展开 | derived, 多动画协调 |
| [分类联动](https://github.com/wechat-miniprogram/awesome-skyline/tree/main/examples/associated-scroll-view) | 左右联动列表 | 垂直 swiper, scroll 协商 |

---

**Version**: 2.1
**Last Updated**: 2026-06-02
**Based On**: 微信官方 Skyline 文档 + awesome-skyline 示例库
