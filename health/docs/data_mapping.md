# 健康数据管理系统 - 字段映射说明文档

## 1. 项目概述

本项目是一个**人体成分分析报告**展示系统，基于小米运动健康数据进行可视化展示。系统通过读取多个 JSON 文件，将健康数据渲染到 HTML 页面中，展示用户的身体指标、身体成分、评估指标、趋势图表和运动日历等信息。

### 项目结构

```
health/
├── data/
│   ├── profile.json      # 个人基本信息和当前健康指标
│   ├── history.json      # 体重体脂历史记录
│   └── activities.json   # 活动记录（运动、饮食等）
├── css/
│   └── style.css         # 样式文件
├── js/
│   └── app.js            # 数据处理与渲染逻辑
├── index.html            # 主页面
└── docs/
    └── data_mapping.md   # 本说明文档
```

---

## 2. JSON 数据结构详解

### 2.1 整体数据结构

项目使用三个独立的数据源文件，便于单独更新：
- **profile.json**: 包含个人基本信息、健康评分、身体指标、身体成分、评估指标和节段数据
- **history.json**: 体重和体脂的历史记录数组（用于趋势图表）
- **activities.json**: 活动记录数组（用于日历展示）

---

### 2.2 profile.json - 个人信息和当前健康指标

#### 文件结构
```json
{
  "profile": {},
  "score": {},
  "bodyMetrics": {},
  "bodyComposition": {},
  "assessment": {},
  "segmentalFat": {},
  "segmentalMuscle": {}
}
```

#### profile - 用户基本信息

| 字段 | 类型 | 说明 | 示例值 |
| :--- | :--- | :--- | :--- |
| `gender` | String | 性别 | "男" / "女" |
| `age` | Number | 年龄 | 29 |
| `height` | Number | 身高（cm） | 179 |
| `measurementDate` | String | 测量日期（ISO格式） | "2026-05-30" |

**页面映射**：`index.html` 顶部个人信息区域

---

#### score - 健康评分

| 字段 | 类型 | 说明 | 示例值 |
| :--- | :--- | :--- | :--- |
| `total` | Number | 综合评分（0-100） | 81 |
| `advice` | String | 健康建议文案 | "你的BMI和体脂率均高于正常范围..." |

**页面映射**：`index.html` 评分卡片区域

---

#### bodyMetrics - 身体指标

每个指标包含以下子字段：

| 子字段 | 类型 | 说明 |
| :--- | :--- | :--- |
| `value` | Number | 指标数值 |
| `unit` | String | 单位 |
| `level` | String | 等级评价 |
| `range` | Array | 等级范围（用于进度条计算） |

##### bodyMetrics 包含的指标

| 指标字段 | 说明 | 等级范围 | 页面元素ID |
| :--- | :--- | :--- | :--- |
| `weight` | 体重（kg） | ["偏瘦", "正常", "超重", "肥胖"] | `metric-weight`, `progress-weight` |
| `bmi` | 身体质量指数 | ["偏低", "标准", "偏高", "过高"] | `metric-bmi`, `progress-bmi` |
| `bodyFatRate` | 体脂率（%） | ["偏瘦", "标准", "偏胖", "肥胖"] | `metric-fat`, `progress-fat` |
| `heartRate` | 心率（次/分） | ["心率过低", "正常", "正常", "心率过高"] | `metric-heart`, `progress-heart` |

**页面映射**：`index.html` 身体指标卡片

---

#### bodyComposition - 身体成分

| 指标字段 | 说明 | 单位 | 页面元素ID |
| :--- | :--- | :--- | :--- |
| `water` | 体水分量 | kg | `comp-water`, `badge-water` |
| `protein` | 蛋白质质量 | kg | `comp-protein`, `badge-protein` |
| `fat` | 脂肪量 | kg | `comp-fat`, `badge-fat` |
| `bone` | 骨盐量 | kg | `comp-bone`, `badge-bone` |
| `muscle` | 肌肉量 | kg | `comp-muscle`, `badge-muscle` |
| `visceralFat` | 内脏脂肪等级 | - | `comp-visceral`, `badge-visceral` |
| `basalMetabolism` | 基础代谢率 | kcal | `comp-metabolism` |

**页面映射**：`index.html` 身体成分卡片

---

#### assessment - 评估指标

| 字段 | 类型 | 说明 | 示例值 | 页面元素ID |
| :--- | :--- | :--- | :--- | :--- |
| `bodyShape` | String | 身体形态 | "倒三角型" | `assess-shape` |
| `bodyType` | String | 身体类型 | "肥胖" | `assess-type` |
| `waistHipRatio` | Number | 腰臀比 | 0.9 | `assess-whr` |
| `bodyAge` | Number | 身体年龄 | 25 | `assess-age` |
| `skeletalMuscleIndex` | Number | 骨骼肌指数 | 8.4 | `assess-skeletal` |
| `suggestedCalorieIntake` | Number | 建议热量摄入（kcal） | 2519 | `assess-calorie` |

**页面映射**：`index.html` 评估指标卡片

---

#### segmentalFat / segmentalMuscle - 节段数据

| 字段 | 说明 | 单位 | 页面元素ID（脂肪） | 页面元素ID（肌肉） |
| :--- | :--- | :--- | :--- | :--- |
| `leftArm` | 左上肢 | kg | `fat-left-arm` | `muscle-left-arm` |
| `rightArm` | 右上肢 | kg | `fat-right-arm` | `muscle-right-arm` |
| `trunk` | 躯干 | kg | `fat-trunk` | `muscle-trunk` |
| `leftLeg` | 左下肢 | kg | `fat-left-leg` | `muscle-left-leg` |
| `rightLeg` | 右下肢 | kg | `fat-right-leg` | `muscle-right-leg` |

**页面映射**：`index.html` 节段分析卡片

---

### 2.3 history.json - 历史记录（趋势图表数据）

#### 文件结构
```json
[
  {
    "date": "2026-05-19",
    "weight": 82.9,
    "bodyFatRate": 23.7
  },
  ...
]
```

#### 记录字段

| 字段 | 类型 | 说明 |
| :--- | :--- | :--- |
| `date` | String | 日期（ISO格式） |
| `weight` | Number | 体重（kg） |
| `bodyFatRate` | Number | 体脂率（%） |

**用途**：用于 `trendChart` 图表展示体重与体脂率变化趋势

---

### 2.4 activities.json - 活动记录（日历数据）

#### 文件结构
```json
[
  {
    "date": "2026-05-19",
    "type": "6KM",
    "category": "exercise"
  },
  ...
]
```

#### 记录字段

| 字段 | 类型 | 说明 |
| :--- | :--- | :--- |
| `date` | String | 日期（ISO格式） |
| `type` | String | 活动类型描述 |
| `category` | String | 活动类别（用于样式区分） |

######### category 类别说明

| 类别值 | 说明 | 样式类 |
| :--- | :--- | :--- |
| `exercise` | 运动（如跑步、健身） | `.exercise`（绿色背景） |
| `bad_eating` | 不良饮食（如吃大餐、乱吃） | `.bad_eating`（红色背景） |
| `warning` | 警告（如奶茶、饮料等高糖饮品） | `.warning`（黄色背景） |

**用途**：用于日历展示，标记每日活动状态

---

## 3. 等级与样式映射

### 3.1 等级分类与样式类

| 等级值 | 含义 | CSS样式类 | 进度条颜色类 |
| :--- | :--- | :--- | :--- |
| 正常 / 标准 / 优 | 良好状态 | `level-normal` | `progress-green` |
| 偏瘦 / 偏低 / 心率过低 | 偏低状态 | `level-low` | `progress-blue` |
| 超重 / 偏胖 / 偏高 / 警戒 | 警告状态 | `level-warning` | `progress-yellow` |
| 稍多 | 较多状态 | `level-high` | `progress-orange` |
| 肥胖 / 过高 / 危险 | 危险状态 | `level-danger` | `progress-red` |

### 3.2 进度条计算逻辑

进度条宽度根据 `level` 在 `range` 数组中的索引位置计算：

```
进度宽度 = ((索引 + 1) / range数组长度) * 100%
```

---

## 4. 数据更新说明

### 4.1 文件更新指南

项目使用三个独立的数据源文件，可单独更新：

1. **更新当前指标**：修改 `profile.json` 中的对应字段
2. **添加历史记录**：向 `history.json` 数组追加新记录
3. **添加活动记录**：向 `activities.json` 数组追加新记录

### 4.2 各文件更新内容

#### profile.json 更新
当从小米运动健康获取新数据后，需要更新以下字段：
- `profile.measurementDate` - 更新为最新测量日期
- `bodyMetrics` - 更新各项指标的 `value` 和 `level`
- `bodyComposition` - 更新各项成分的 `value` 和 `level`
- `assessment` - 更新评估指标
- `segmentalFat / segmentalMuscle` - 更新节段数据

#### history.json 更新
- 向数组末尾追加新的历史记录，格式：
  ```json
  {
    "date": "2026-05-30",
    "weight": 82.7,
    "bodyFatRate": 23.5
  }
  ```

#### activities.json 更新
- 向数组末尾追加新的活动记录，格式：
  ```json
  {
    "date": "2026-05-30",
    "type": "10KM",
    "category": "exercise"
  }
  ```

### 4.3 注意事项

- 日期格式必须为 `YYYY-MM-DD`（ISO 8601 格式）
- `history.json` 和 `activities.json` 数组按日期升序排列
- `level` 字段值必须与 `range` 数组中的值一致，否则样式可能显示异常
- 体重存储单位为 **kg**，前端展示时会自动转换为 **斤**（×2）
- 三个数据源文件使用 `Promise.all` 并行加载，任一下载失败不影响其他文件（但可能导致对应模块显示异常）

---

## 5. 数据源说明

本项目数据来源于**小米运动健康 App**，通过导出功能获取人体成分分析数据，分别整理为三个 JSON 文件。

---

## 6. 技术栈

| 组件 | 说明 |
| :--- | :--- |
| HTML5 | 页面结构 |
| CSS3 | 样式设计 |
| JavaScript (ES6+) | 数据处理与 DOM 操作 |
| Chart.js | 图表绘制（CDN引入） |
| Promise.all | 并行加载多个数据源文件 |

---

*文档生成日期：2026-05-30*
*最后更新：数据文件解耦重构*
