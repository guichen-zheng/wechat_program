# 洗车预约小程序

基于微信小程序 **Skyline** 渲染引擎开发的洗车 / 汽车服务预约应用。涵盖账号注册登录、车辆管理、洗车套餐下单、余额充值、门店定位与交易流水等完整业务闭环。当前后端以本地存储（`wx.getStorageSync`）模拟，便于纯前端联调与演示。

## ✨ 主要功能

- **账号体系** —— 手机号注册 / 登录，会话持久化，内置管理员账号
- **车辆管理** —— 添加 / 选择我的车辆，多车切换
- **洗车下单** —— 多档套餐（基础洗车 → 豪华套餐 → 年卡），预约队列
- **资金账户** —— 余额充值、消费扣款、交易流水与单条交易详情
- **门店定位** —— 基于 `getLocation` 显示附近门店及距离排序
- **个人中心** —— 我的信息、车辆、订单、流水入口聚合

## 🛠 技术栈

| 项 | 说明 |
| --- | --- |
| 渲染引擎 | Skyline（`renderer: skyline`） |
| 组件框架 | glass-easel |
| 样式规范 | `style: v2`、自定义导航栏 |
| 基础库 | 3.0.0 ～ 15.255.255 |
| 数据层 | 本地存储模拟（`utils/storage.js`） |

## 📁 目录结构

```
wechat_program/
├── app.js / app.json / app.wxss      # 小程序入口与全局配置
├── project.config.json               # 项目配置（appid、编译选项）
├── sitemap.json                      # 索引配置
├── components/
│   └── navigation-bar/               # 自定义导航栏组件
├── custom-tab-bar/                   # 自定义底部 TabBar
├── pages/
│   ├── login / register              # 登录 / 注册
│   ├── home                          # 首页
│   ├── my / my-vehicles / vehicle-add  # 个人中心与车辆管理
│   ├── car-select                    # 车辆选择
│   ├── book-wash / wash-detail       # 洗车下单与详情
│   ├── recharge                      # 余额充值
│   ├── transactions / transaction-detail  # 交易流水与详情
│   ├── store-location                # 门店定位
│   └── index                         # 占位 / 入口页
└── utils/
    ├── mock-data.js                  # 套餐、门店等模拟数据
    └── storage.js                    # 用户/车辆/订单/交易 本地存储层
```

## 🗄 本地存储约定

`utils/storage.js` 统一管理数据，主要存储键：

| 键 | 含义 |
| --- | --- |
| `user` | 当前登录会话用户 |
| `user_<phone>` | 账号注册表（按手机号持久保存） |
| `all_phones` | 所有注册手机号（管理员汇总） |
| `vehicles_<phone>` | 用户车辆列表 |
| `orders_<phone>` | 用户订单列表 |
| `transactions_<phone>` | 用户资金流水 |
| `tx_detail_<txId>` | 单条交易详情 |
| `appointments_<store>` | 门店预约队列 |

## 🚀 本地运行

1. 安装并打开 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 选择「导入项目」，目录指向本仓库根目录
3. 在 `project.config.json` 中确认 / 替换为你自己的 `appid`
4. 编译模式确保开启 **Skyline 渲染**（已在 `app.json` 配置）
5. 点击「编译」即可在模拟器中预览

> 提示：默认管理员账号手机号为 `13800000000`（见 `utils/storage.js`）。

## 📄 License

详见 [LICENSE](LICENSE)。
