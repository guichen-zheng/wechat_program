const WASH_PLANS = [
  {
    id: 1,
    name: '基础洗车',
    description: '外观清洗，去除表面污垢，保持车身整洁',
    price: 38,
    duration: 30,
    tag: '热门'
  },
  {
    id: 2,
    name: '精洗套餐',
    description: '外观清洗 + 内饰吸尘 + 玻璃水迹处理',
    price: 88,
    duration: 60,
    tag: '推荐'
  },
  {
    id: 3,
    name: '深度清洁',
    description: '全车深度清洁 + 引擎盖清洗 + 轮毂抛光',
    price: 188,
    duration: 90,
    tag: ''
  },
  {
    id: 4,
    name: '豪华套餐',
    description: '深度清洁 + 车身镀膜 + 内饰皮革养护 + 香氛',
    price: 388,
    duration: 120,
    tag: '精品'
  },
  {
    id: 5,
    name: '年卡套餐',
    description: '全年不限次数基础洗车，购买即生效',
    price: 999,
    duration: -1,
    tag: '超值'
  }
]

const STORES = [
  {
    id: 1,
    name: '天猫洗车·朝阳店',
    address: '北京市朝阳区建国路88号',
    lat: 39.9196,
    lng: 116.4855,
    capacity: 3,
    phone: '010-12345678'
  },
  {
    id: 2,
    name: '天猫洗车·海淀店',
    address: '北京市海淀区中关村大街1号',
    lat: 39.9842,
    lng: 116.3160,
    capacity: 2,
    phone: '010-23456789'
  },
  {
    id: 3,
    name: '天猫洗车·西城店',
    address: '北京市西城区西长安街10号',
    lat: 39.9088,
    lng: 116.3671,
    capacity: 4,
    phone: '010-34567890'
  }
]

const BANNER_IMAGES = [
  'https://picsum.photos/750/360?random=10',
  'https://picsum.photos/750/360?random=20',
  'https://picsum.photos/750/360?random=30',
  'https://picsum.photos/750/360?random=40',
  'https://picsum.photos/750/360?random=50'
]

const PROVINCES = [
  { name: '北京', code: '京', cities: ['A'] },
  { name: '天津', code: '津', cities: ['A', 'B', 'C', 'D', 'E', 'F'] },
  { name: '上海', code: '沪', cities: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'K', 'L', 'N'] },
  { name: '重庆', code: '渝', cities: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] },
  { name: '河北', code: '冀', cities: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'R'] },
  { name: '河南', code: '豫', cities: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'U'] },
  { name: '云南', code: '云', cities: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S'] },
  { name: '辽宁', code: '辽', cities: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P'] },
  { name: '黑龙江', code: '黑', cities: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R'] },
  { name: '湖南', code: '湘', cities: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M'] },
  { name: '安徽', code: '皖', cities: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R'] },
  { name: '山东', code: '鲁', cities: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S'] },
  { name: '新疆', code: '新', cities: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R'] },
  { name: '江苏', code: '苏', cities: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N'] },
  { name: '浙江', code: '浙', cities: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L'] },
  { name: '江西', code: '赣', cities: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M'] },
  { name: '湖北', code: '鄂', cities: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R'] },
  { name: '广西', code: '桂', cities: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R'] },
  { name: '甘肃', code: '甘', cities: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P'] },
  { name: '山西', code: '晋', cities: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M'] },
  { name: '内蒙古', code: '蒙', cities: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L'] },
  { name: '陕西', code: '陕', cities: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'] },
  { name: '吉林', code: '吉', cities: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] },
  { name: '福建', code: '闽', cities: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] },
  { name: '贵州', code: '贵', cities: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] },
  { name: '广东', code: '粤', cities: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'] },
  { name: '四川', code: '川', cities: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'] },
  { name: '青海', code: '青', cities: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] },
  { name: '西藏', code: '藏', cities: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] },
  { name: '海南', code: '琼', cities: ['A', 'B', 'C', 'D', 'E', 'F'] },
  { name: '宁夏', code: '宁', cities: ['A', 'B', 'C', 'D', 'E'] }
]

// 品牌库（仅品牌；车型由用户手动输入）。按拼音/字母首字母分组
const _BRAND_GROUPS = {
  '2': ['212'],
  'A': ['ARCFOX极狐', 'AUDI', 'Alpina', '埃尚', '奥迪', '安驰', '爱驰', '阿尔法·罗密欧', '阿斯顿·马丁', '阿维塔'],
  'B': ['BEIJING汽车', '保时捷', '别克', '北京', '北汽', '北汽新能源', '奔腾', '奔驰', '宝沃', '宝马', '宝骏', '宝龙', '宾利', '巴博斯', '本田', '标致', '比亚迪', '比克汽车', '比德文', '比速', '百智新能源'],
  'C': ['传祺', '创维汽车', '成功', '昌河', '曹操', '橙仕', '长城', '长安', '长安凯程', '长安启源', '长安商用', '长安欧尚', '长安跨越', '驰远'],
  'D': ['DS', '东南', '东风', '东风奕派', '东风富康', '东风小康', '东风新能源', '东风风光', '东风风度', '东风风神', '东风风行', '大乘', '大众', '大力牛魔王', '大发', '大运', '大迪', '电动屋', '电咖', '道奇', '道达'],
  'F': ['丰田', '富奇', '方程豹', '法拉利', '福特', '福田', '福迪', '菲亚特', '飞凡汽车', '飞碟'],
  'G': ['GMC', '国吉', '国机智骏', '国金', '广汽', '广汽埃安', '观致', '高合'],
  'H': ['华凯', '华北', '华境', '华晨新日', '华普', '华梓', '华泰', '华阳', '华颂', '华骐', '合创', '哈弗', '哈飞', '宏瑞', '宏远', '幻速', '恒天', '恒润', '恒驰', '悍马', '昊铂', '汇众', '汉腾', '汉龙', '海格', '海马', '红旗', '红星', '鸿蒙智行', '黄海', '黑豹'],
  'I': ['INEOS', 'iCAR'],
  'J': ['Jeep', '九龙', '佳星', '几何', '吉利', '吉奥', '吉祥', '君马', '捷尼赛思', '捷豹', '捷达', '捷途', '捷途纵横', '晶马', '极氪', '极石', '极越', '江南', '江淮', '江淮钇为', '江铃', '江铃集团新能源', '金杯', '金杯新能源', '金程', '金龙', '钧天', '骏驰'],
  'K': ['KTM', '克莱斯勒', '凯翼', '凯迪拉克', '卡威', '卡尔森', '开瑞'],
  'L': ['LEVC', 'LOCAL MOTORS', 'LUMMA', '乐道', '兰博基尼', '凌宝', '力帆', '劳斯莱斯', '岚图', '拉达', '林肯', '灵悉', '猎豹', '理念', '理想', '莲花', '菱势', '蓝电', '路特斯', '路虎', '铃木', '陆地方舟', '陆风', '零跑', '雷丁', '雷克萨斯', '雷诺', '雷达', '领克', '领汇', '领途'],
  'M': ['MG', 'MINI', '摩根', '摩登', '敏安', '猛士', '玛莎拉蒂', '美亚', '迈凯伦', '迈莎锐', '迈迈', '马自达'],
  'N': ['哪吒', '纳智捷'],
  'O': ['欧宝', '欧拉', '欧朗', '欧联', '讴歌'],
  'P': ['Polestar', '朋克汽车'],
  'Q': ['乔治·巴顿', '全球鹰', '前途', '启腾', '启辰', '奇瑞', '庆铃', '起亚', '骐铃'],
  'R': ['RUF', '日产', '瑞翔', '瑞驰', '瑞麒', '睿蓝汽车', '荣威'],
  'S': ['SERES赛力斯', 'SONGSAN MOTORS', 'SPRINGO', 'SRM鑫源', 'SWM斯威汽车', 'Smart', '三菱', '上汽大通MAXUS', '双环', '双龙', '思皓', '思铭', '斯巴鲁', '斯柯达', '沙龙', '深蓝汽车', '示界', '神州', '萨博', '赛宝', '速达', '陕汽通家'],
  'T': ['坦克', '天际', '天马', '特斯拉', '腾势', '通用', '通田'],
  'W': ['WEY', '万丰', '万象', '五十铃', '五菱', '威兹曼', '威旺', '威马', '威麟', '未奥汽车', '沃尔沃', '蔚来'],
  'X': ['小米', '小虎', '小鹏', '新凯', '新吉奥', '新特', '新雅途', '星途', '现代', '西安奥拓', '西雅特', '雪佛兰', '雪铁龙'],
  'Y': ['一汽', '一汽凌河', '云度', '云雀', '仰望', '依维柯', '御捷', '扬子', '永源', '烨', '英致', '英菲尼迪', '萤火虫', '裕路', '远程', '远航', '野马', '银河', '银隆新能源', '驭胜'],
  'Z': ['中兴', '中华', '中国重汽', '中国重汽VGV', '中欧', '中顺', '之诺', '众泰', '智己', '知豆', '自游家']
}

const CAR_DATA = {
  hotBrands: ['福特', '大众', '丰田', '本田', '别克', '现代', '雪佛兰', '奥迪', '宝马', '奔驰'],
  brands: Object.keys(_BRAND_GROUPS).reduce((arr, initial) => {
    _BRAND_GROUPS[initial].forEach(name => arr.push({ initial, name }))
    return arr
  }, [])
}

// 服务分类数据（洗车/美容/轮胎/保养/维修），每类含二级分类与具体项目
// 项目字段：id / name / desc / price / memberPrice / sold / tag / duration / emoji
const SERVICE_DATA = [
  {
    key: 'wash', name: '洗车', emoji: '🚿',
    subCategories: [
      {
        name: '标准净洗', items: [
          { id: 'wash-1', name: '标准洗车（小轿车）', desc: '车表除尘，内饰基础除尘', price: 50, memberPrice: 25, sold: 243, tag: '随机立减', duration: 30 },
          { id: 'wash-2', name: '标准洗车（越野/SUV）', desc: '车表除尘，内饰基础除尘', price: 60, memberPrice: 30, sold: 113, tag: '随机立减', duration: 35 },
          { id: 'wash-3', name: '标准洗车（大型SUV/大型越野车/MPV）', desc: '车表除尘，内饰基础除尘', price: 90, memberPrice: 40, sold: 51, tag: '随机立减', duration: 40 },
          { id: 'wash-4', name: '香氛标准洗车-赠香膏（大型SUV/大型越野车/MPV）', desc: '', price: 160, memberPrice: 128, sold: 3, tag: '随机立减', duration: 45 },
          { id: 'wash-5', name: '香氛标准洗车-赠香膏（越野/SUV）', desc: '', price: 120, memberPrice: 96, sold: 8, tag: '随机立减', duration: 45 },
          { id: 'wash-6', name: '香氛标准洗车-赠香膏（小轿车）', desc: '', price: 110, memberPrice: 88, sold: 0, tag: '随机立减', duration: 40 }
        ]
      },
      {
        name: '精致净洗', items: [
          { id: 'wash-7', name: '香氛精致洗车-赠香膏（大型SUV/大型越野车/MPV）', desc: '', price: 240, memberPrice: 192, sold: 1, tag: '随机立减', duration: 60 },
          { id: 'wash-8', name: '香氛精致洗车-赠香膏（越野/SUV）', desc: '', price: 210, memberPrice: 168, sold: 1, tag: '随机立减', duration: 60 },
          { id: 'wash-9', name: '香氛精致洗车-赠香膏（小轿车）', desc: '', price: 190, memberPrice: 152, sold: 1, tag: '随机立减', duration: 55 }
        ]
      },
      {
        name: '泡沫精洗', items: [
          { id: 'wash-10', name: '雪顶泡沫精洗（大型SUV/大型越野车/MPV）', desc: '', price: 188, memberPrice: 150.4, sold: 1, tag: '随机立减', duration: 60 },
          { id: 'wash-11', name: '雪顶泡沫精洗（越野/SUV）', desc: '', price: 158, memberPrice: 126.4, sold: 5, tag: '随机立减', duration: 55 },
          { id: 'wash-12', name: '雪顶泡沫精洗（小轿车）', desc: '', price: 128, memberPrice: 102.4, sold: 15, tag: '随机立减', duration: 50 }
        ]
      }
    ]
  },
  {
    key: 'beauty', name: '美容', emoji: '✨',
    subCategories: [
      {
        name: '打蜡', items: [
          { id: 'beauty-1', name: '全车打蜡(小轿车)', desc: '洗完车打个蜡，让爱车光彩熠熠', price: 150, memberPrice: 120, sold: 0, tag: '随机立减', duration: 60 },
          { id: 'beauty-2', name: '全车打蜡(越野/SUV)', desc: '洗完车打个蜡，让爱车光彩熠熠', price: 180, memberPrice: 144, sold: 0, tag: '随机立减', duration: 70 },
          { id: 'beauty-3', name: '全车打蜡（大型SUV/大型越野车/MPV）', desc: '洗完车打个蜡，让爱车光彩熠熠', price: 240, memberPrice: 192, sold: 1, tag: '随机立减', duration: 80 }
        ]
      },
      {
        name: '抛光', items: [
          { id: 'beauty-4', name: '漆面抛光(小轿车)', desc: '机器抛光，恢复车漆光泽度', price: 580, memberPrice: 464, sold: 0, tag: '随机立减', duration: 120 },
          { id: 'beauty-5', name: '漆面抛光(越野/SUV)', desc: '机器抛光，恢复车漆光泽度', price: 680, memberPrice: 544, sold: 0, tag: '随机立减', duration: 140 },
          { id: 'beauty-6', name: '漆面抛光（大型SUV/大型越野车/MPV）', desc: '机器抛光，恢复车漆光泽度', price: 780, memberPrice: 624, sold: 0, tag: '随机立减', duration: 160 }
        ]
      },
      {
        name: '内饰清洗', items: [
          { id: 'beauty-7', name: '内饰深度去污(小轿车)', desc: '', price: 480, memberPrice: 384, sold: 1, tag: '随机立减', duration: 120 },
          { id: 'beauty-8', name: '内饰深度去污(越野/SUV)', desc: '', price: 580, memberPrice: 464, sold: 0, tag: '随机立减', duration: 130 },
          { id: 'beauty-9', name: '内饰深度去污（大型SUV/大型越野车/MPV）', desc: '', price: 680, memberPrice: 544, sold: 0, tag: '随机立减', duration: 140 },
          { id: 'beauty-10', name: '全车内饰清洁护理(小轿车)', desc: '深度清洁护理，唤醒内饰质感', price: 680, memberPrice: 544, sold: 0, tag: '随机立减', duration: 150 },
          { id: 'beauty-11', name: '全车内饰清洁护理(越野/SUV)', desc: '深度清洁护理，唤醒内饰质感', price: 750, memberPrice: 600, sold: 0, tag: '随机立减', duration: 160 },
          { id: 'beauty-12', name: '全车内饰清洁护理（大型SUV/大型越野车/MPV）', desc: '深度清洁护理，唤醒内饰质感', price: 820, memberPrice: 656, sold: 0, tag: '随机立减', duration: 170 },
          { id: 'beauty-31', name: '漆面深度去污（大型SUV/大型越野车/MPV）', desc: '', price: 260, memberPrice: 208, sold: 0, tag: '随机立减', duration: 70 },
          { id: 'beauty-32', name: '漆面深度去污（越野/SUV）', desc: '', price: 220, memberPrice: 176, sold: 0, tag: '随机立减', duration: 65 },
          { id: 'beauty-33', name: '漆面深度去污（小轿车）', desc: '', price: 200, memberPrice: 160, sold: 0, tag: '随机立减', duration: 60 },
          { id: 'beauty-13', name: '顶棚去污(小轿车)', desc: '', price: 200, memberPrice: 160, sold: 0, tag: '随机立减', duration: 60 },
          { id: 'beauty-14', name: '顶棚去污(越野/SUV)', desc: '', price: 220, memberPrice: 176, sold: 0, tag: '随机立减', duration: 65 },
          { id: 'beauty-15', name: '顶棚去污（大型SUV/大型越野车/MPV）', desc: '', price: 260, memberPrice: 208, sold: 0, tag: '随机立减', duration: 70 }
        ]
      },
      {
        name: '内饰焕新', items: [
          { id: 'beauty-16', name: '全车座椅滋养焕新', desc: '滋润上光，不伤真皮', price: 280, memberPrice: 224, sold: 0, tag: '随机立减', duration: 90 },
          { id: 'beauty-17', name: '塑料件护理', desc: '', price: 120, memberPrice: 96, sold: 0, tag: '随机立减', duration: 45 }
        ]
      },
      {
        name: '至尊镀晶', items: [
          { id: 'beauty-18', name: '漆面镀晶(小轿车)', desc: '纳米科技，车漆钻石光泽', price: 1680, memberPrice: 1344, sold: 0, tag: '随机立减', duration: 240 },
          { id: 'beauty-19', name: '漆面镀晶(越野/SUV)', desc: '纳米科技，车漆钻石光泽', price: 1880, memberPrice: 1504, sold: 0, tag: '随机立减', duration: 260 },
          { id: 'beauty-20', name: '漆面镀晶（大型SUV/大型越野车/MPV）', desc: '纳米科技，车漆钻石光泽', price: 2180, memberPrice: 1744, sold: 0, tag: '随机立减', duration: 280 }
        ]
      },
      {
        name: '玻璃洗护', items: [
          { id: 'beauty-21', name: '前挡玻璃去油膜', desc: '', price: 100, memberPrice: 80, sold: 4, tag: '随机立减', duration: 30 },
          { id: 'beauty-22', name: '前挡玻璃镀膜', desc: '雨滴瞬间滑落，"免开雨刮"', price: 228, memberPrice: 182.4, sold: 0, tag: '随机立减', duration: 40 },
          { id: 'beauty-23', name: '玻璃去油膜+镀膜', desc: '强力驱水，全车透亮视野', price: 280, memberPrice: 224, sold: 0, tag: '随机立减', duration: 50 }
        ]
      },
      {
        name: '机舱洗护', items: [
          { id: 'beauty-24', name: '发动机舱清洗镀膜', desc: '延缓线路老化，机舱靓丽光泽', price: 380, memberPrice: 304, sold: 0, tag: '随机立减', duration: 60 }
        ]
      },
      {
        name: '漆面精护', items: [
          { id: 'beauty-25', name: '漆面深度去污（小轿车）', desc: '', price: 200, memberPrice: 160, sold: 0, tag: '随机立减', duration: 60 },
          { id: 'beauty-26', name: '漆面深度去污（越野/SUV）', desc: '', price: 220, memberPrice: 176, sold: 0, tag: '随机立减', duration: 65 },
          { id: 'beauty-27', name: '漆面深度去污（大型SUV/大型越野车/MPV）', desc: '', price: 260, memberPrice: 208, sold: 0, tag: '随机立减', duration: 70 },
          { id: 'beauty-28', name: '车漆焕亮6重精护(小轿车)', desc: '', price: 360, memberPrice: 288, sold: 1, tag: '随机立减', duration: 90 },
          { id: 'beauty-29', name: '车漆焕亮6重精护(越野/SUV)', desc: '', price: 380, memberPrice: 304, sold: 0, tag: '随机立减', duration: 100 },
          { id: 'beauty-30', name: '车漆焕亮6重精护（大型SUV/大型越野车/MPV）', desc: '', price: 420, memberPrice: 336, sold: 0, tag: '随机立减', duration: 110 }
        ]
      }
    ]
  },
  {
    key: 'tire', name: '轮胎', emoji: '🛞',
    subCategories: [
      {
        name: '胶片补胎', items: [
          { id: 'tire-1', name: '标准贴片补胎（17寸及以下含动平衡）', desc: '', price: 50, memberPrice: null, sold: 20, tag: '随机立减', duration: 30 },
          { id: 'tire-2', name: '标准贴片补胎（防爆胎/AT胎/静音棉胎17寸及以下）', desc: '防爆胎专用', price: 60, memberPrice: 48, sold: 2, tag: '随机立减', duration: 30 },
          { id: 'tire-3', name: '标准贴片补胎（防爆胎/AT胎/静音棉胎20寸及以上）', desc: '防爆胎专用', price: 80, memberPrice: 64, sold: 2, tag: '随机立减', duration: 30 },
          { id: 'tire-4', name: '标准贴片补胎（18/19寸含动平衡）', desc: '', price: 50, memberPrice: null, sold: 14, tag: '随机立减', duration: 30 },
          { id: 'tire-5', name: '标准贴片补胎（20寸及以上含动平衡）', desc: '', price: 70, memberPrice: null, sold: 2, tag: '随机立减', duration: 30 },
          { id: 'tire-6', name: '标准贴片补胎（防爆胎/AT胎/静音棉胎18/19寸）', desc: '防爆胎专用', price: 60, memberPrice: 48, sold: 0, tag: '随机立减', duration: 30 }
        ]
      },
      {
        name: '蘑菇钉补胎', items: [
          { id: 'tire-7', name: '标准蘑菇钉补胎（20寸及以上含动平衡）', desc: '', price: 110, memberPrice: 88, sold: 7, tag: '随机立减', duration: 35 },
          { id: 'tire-8', name: '标准蘑菇钉补胎（18/19寸含动平衡）', desc: '', price: 90, memberPrice: 72, sold: 27, tag: '随机立减', duration: 35 },
          { id: 'tire-9', name: '标准蘑菇钉补胎（防爆胎/AT胎/静音棉胎17寸及以下）', desc: '防爆胎专用', price: 100, memberPrice: 80, sold: 7, tag: '随机立减', duration: 35 },
          { id: 'tire-10', name: '标准蘑菇钉补胎（防爆胎/AT胎/静音棉胎20寸及以上）', desc: '防爆胎专用', price: 150, memberPrice: 120, sold: 6, tag: '随机立减', duration: 35 },
          { id: 'tire-11', name: '标准蘑菇钉补胎（防爆胎/AT胎/静音棉胎18/19寸）', desc: '防爆胎专用', price: 120, memberPrice: 96, sold: 10, tag: '随机立减', duration: 35 }
        ]
      },
      {
        name: '换轮胎', items: [
          { id: 'tire-12', name: '标准换胎（17寸及以下含动平衡）', desc: '工时费，不含材料', price: 40, memberPrice: 32, sold: 12, tag: '随机立减', duration: 40 },
          { id: 'tire-17', name: '标准换胎（18/19寸含动平衡）', desc: '工时费，不含材料', price: 50, memberPrice: 40, sold: 1, tag: '随机立减', duration: 40 },
          { id: 'tire-13', name: '更换气门嘴', desc: '工时费，不含材料', price: 40, memberPrice: 32, sold: 3, tag: '随机立减', duration: 20 },
          { id: 'tire-18', name: '更换轮毂（17寸及以下含动平衡）', desc: '工时费，不含材料', price: 40, memberPrice: 32, sold: 0, tag: '随机立减', duration: 40 }
        ]
      },
      {
        name: '动平衡', items: [
          { id: 'tire-19', name: '精准动平衡', desc: '高精度仪器，换胎必做！', price: 30, memberPrice: 24, sold: 0, tag: '随机立减', duration: 30 },
          { id: 'tire-14', name: '四轮动平衡', desc: '解决高速方向盘抖动', price: 120, memberPrice: 96, sold: 0, tag: '随机立减', duration: 30 }
        ]
      },
      {
        name: '轮胎换位', items: [
          { id: 'tire-15', name: '四轮换位（不含动平衡）', desc: '', price: 80, memberPrice: 64, sold: 1, tag: '随机立减', duration: 30 }
        ]
      },
      {
        name: '轮胎充气', items: [
          { id: 'tire-20', name: '轮胎充气(普通)', desc: '', price: 10, memberPrice: 0, sold: 161, tag: '随机立减', duration: 10 },
          { id: 'tire-21', name: '轮胎充气(氮气)', desc: '', price: 50, memberPrice: 40, sold: 0, tag: '随机立减', duration: 15 }
        ]
      },
      {
        name: '轮胎护理', items: [
          { id: 'tire-22', name: '轮胎黑亮养护（四轮）', desc: '', price: 80, memberPrice: 64, sold: 0, tag: '随机立减', duration: 30 }
        ]
      },
      {
        name: '轮毂清洗', items: [
          { id: 'tire-16', name: '轮胎轮毂深度去污护理（四轮）', desc: '', price: 160, memberPrice: 128, sold: 0, tag: '随机立减', duration: 40 }
        ]
      }
    ]
  },
  {
    key: 'maintain', name: '保养', emoji: '🛢️',
    subCategories: [
      {
        name: '玻璃水添加', items: [
          { id: 'maintain-1', name: '添加玻璃水（含材料）', desc: '会员全年免费加！', price: 20, memberPrice: null, sold: 129, tag: '随机立减', duration: 15 }
        ]
      },
      {
        name: '安全检查', items: [
          { id: 'maintain-2', name: '全车检测', desc: '出行前必备，会员还免费', price: 50, memberPrice: 0, sold: 132, tag: '随机立减', duration: 30 }
        ]
      }
    ]
  },
  {
    key: 'package', name: '精选套餐', emoji: '🎁',
    subCategories: [
      {
        name: '保养套餐', items: [
          { id: 'package-29', name: '两次小保养¥565（全合成）', desc: '', price: 565, memberPrice: null, originPrice: 1178, save: 613, sold: 8292, tag: '', duration: 120 },
          { id: 'package-30', name: '两次小保养¥765（旗舰顶级全合成）', desc: '', price: 765, memberPrice: null, originPrice: 1360, save: 595, sold: 3407, tag: '', duration: 120 },
          { id: 'package-31', name: '两次小保养¥465（全合成）', desc: '', price: 465, memberPrice: null, originPrice: 960, save: 495, sold: 1933, tag: '', duration: 120 },
          { id: 'package-32', name: '两次小保养¥665（高端全合成）', desc: '', price: 665, memberPrice: null, originPrice: 1192, save: 527, sold: 1650, tag: '', duration: 120 }
        ]
      }
    ]
  }
]

// 按 id 在全部分类中查找项目，返回与 WASH_PLANS 兼容的对象
function findServiceItem(id) {
  for (const cat of SERVICE_DATA) {
    for (const sub of cat.subCategories) {
      const item = sub.items.find(it => it.id === id)
      if (item) {
        return {
          id: item.id,
          name: item.name,
          description: item.desc,
          price: item.price,
          memberPrice: item.memberPrice,
          duration: item.duration,
          tag: item.tag
        }
      }
    }
  }
  return null
}

module.exports = { WASH_PLANS, STORES, BANNER_IMAGES, PROVINCES, CAR_DATA, SERVICE_DATA, findServiceItem }