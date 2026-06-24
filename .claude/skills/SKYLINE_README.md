# Skyline 渲染引擎技能 v2.1

## 更新内容

### v2.1 (官方示例增强版)

新增来自 awesome-skyline 的 6 个官方示例模式:

1. ✅ 半屏弹窗 (手势协商) - pan-gesture + scroll-view 协商
2. ✅ 分段式半屏 (3个吸附点) - 多吸附点半屏交互
3. ✅ Tab 指示条跟手滑动 - swiper worklet 回调
4. ✅ 搜索栏吸附 + 瀑布流 - sticky-header + grid-view masonry
5. ✅ 通讯录 (sticky-section + 索引导航)
6. ✅ 店铺详情下拉展开 - 复杂交互状态机

### v2.0 (完整修正版)

基于微信官方文档深度分析，修复所有已知错误:

1. ✅ 修复手势回调绑定语法 (onGestureEvent)
2. ✅ 添加 timing/spring/decay/Easing 动画函数
3. ✅ 添加 runOnUI/runOnJS 线程通信
4. ✅ 补充 WXSS 样式差异和 rendererOptions 配置
5. ✅ 添加 Worklet 使用限制和注意事项
6. ✅ 补充 draggable-sheet 可拖拽半屏组件
7. ✅ 完善 Skyline 新增组件列表 (17个组件)
8. ✅ 补充 scroll-view type 属性 (list/custom/nested)
9. ✅ 添加完整示例代码
10. ✅ scroll-view 完整指南 (refresher/nested/builder)

### 核心内容

- **Worklet 动画**: shared, timing, spring, decay, Easing
- **手势系统**: pan, tap, scale, drag 等 8 种手势组件
- **专属组件**: list-view, grid-view, draggable-sheet, sticky-section 等
- **WXSS 差异**: flex 布局, border-box, rendererOptions 配置
- **官方示例**: 6 种高质量交互模式

## 官方示例项目

| 示例 | 说明 | 
|------|------|
| [通讯录](https://github.com/wechat-miniprogram/awesome-skyline/tree/main/examples/address-book) | 字母索引列表 |
| [半屏弹窗](https://github.com/wechat-miniprogram/awesome-skyline/tree/main/examples/half-screen) | 可拖动半屏 |
| [分段式半屏](https://github.com/wechat-miniprogram/awesome-skyline/tree/main/examples/segmented-half-screen) | 3点吸附半屏 |
| [Tab 指示条](https://github.com/wechat-miniprogram/awesome-skyline/tree/main/examples/tab-indicator) | 跟手滑动指示条 |
| [搜索栏吸附](https://github.com/wechat-miniprogram/awesome-skyline/tree/main/examples/product-list) | 商品列表 |
| [沉浸式浏览](https://github.com/wechat-miniprogram/awesome-skyline/tree/main/examples/expanded-scroll-view) | 店铺详情展开 |
| [分类联动](https://github.com/wechat-miniprogram/awesome-skyline/tree/main/examples/associated-scroll-view) | 左右联动列表 |

---

**安装时间**: 2026-06-02T09:37:50.697Z
**版本**: 2.1 (官方示例增强版)
