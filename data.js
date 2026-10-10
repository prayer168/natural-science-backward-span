/* 題庫只使用課程地圖列出的自然科主題與基本、可辨識詞語。 */
window.SCIENCE_SETS = [
  {id:"plant-basics",grade:3,term:"三上",publisher:"康軒",unit:"多采多姿的植物",topic:"植物構造與功能",items:[{text:"根",icon:"◡"},{text:"莖",icon:"╱"},{text:"葉",icon:"❧"},{text:"花",icon:"✿"},{text:"果實",icon:"◉"},{text:"種子",icon:"◌"}]},
  {id:"plant-hanlin",grade:3,term:"三上",publisher:"翰林",unit:"植物大發現",topic:"認識植物",items:[{text:"根",icon:"◡"},{text:"莖",icon:"╱"},{text:"葉",icon:"❧"},{text:"花",icon:"✿"},{text:"果實",icon:"◉"},{text:"種子",icon:"◌"}]},
  {id:"plant-nani",grade:3,term:"三上",publisher:"南一",unit:"認識植物",topic:"植物的身體",items:[{text:"根",icon:"◡"},{text:"莖",icon:"╱"},{text:"葉",icon:"❧"},{text:"花",icon:"✿"},{text:"果實",icon:"◉"},{text:"種子",icon:"◌"}]},
  {id:"animals",grade:3,term:"三下",publisher:"康軒",unit:"我是動物解說員",topic:"動物身體構造與生存",items:[{text:"眼睛",icon:"◉"},{text:"翅膀",icon:"⌁"},{text:"鰭",icon:"◖"},{text:"腳",icon:"╱"},{text:"觸角",icon:"〰"},{text:"尾巴",icon:"⌒"}]},
  {id:"animals-hanlin",grade:3,term:"三下",publisher:"翰林",unit:"動物王國",topic:"動物構造與功能",items:[{text:"眼睛",icon:"◉"},{text:"翅膀",icon:"⌁"},{text:"鰭",icon:"◖"},{text:"腳",icon:"╱"},{text:"觸角",icon:"〰"},{text:"尾巴",icon:"⌒"}]},
  {id:"weather",grade:3,term:"三下",publisher:"康軒",unit:"天氣變變變",topic:"天氣觀測",items:[{text:"晴天",icon:"☼"},{text:"多雲",icon:"☁"},{text:"下雨",icon:"☂"},{text:"風向",icon:"➤"},{text:"風力",icon:"〰"},{text:"氣溫",icon:"♨"}]},
  {id:"weather-hanlin",grade:3,term:"三下",publisher:"翰林",unit:"天氣看聽停",topic:"觀測天氣",items:[{text:"晴天",icon:"☼"},{text:"多雲",icon:"☁"},{text:"下雨",icon:"☂"},{text:"風向",icon:"➤"},{text:"風力",icon:"〰"},{text:"氣溫",icon:"♨"}]},
  {id:"weather-nani",grade:3,term:"三下",publisher:"南一",unit:"天氣特派員",topic:"認識天氣狀態",items:[{text:"晴天",icon:"☼"},{text:"多雲",icon:"☁"},{text:"下雨",icon:"☂"},{text:"風向",icon:"➤"},{text:"風力",icon:"〰"},{text:"氣溫",icon:"♨"}]},
  {id:"water-life",grade:4,term:"四上",publisher:"康軒",unit:"水生生物與環境",topic:"水生生物",items:[{text:"魚",icon:"◁"},{text:"蝦",icon:"⌁"},{text:"水草",icon:"♧"},{text:"荷葉",icon:"◒"},{text:"青蛙",icon:"◉"},{text:"池塘",icon:"▱"}]},
  {id:"water-life-hanlin",grade:4,term:"四上",publisher:"翰林",unit:"水域環境",topic:"水生植物與動物",items:[{text:"魚",icon:"◁"},{text:"蝦",icon:"⌁"},{text:"水草",icon:"♧"},{text:"荷葉",icon:"◒"},{text:"青蛙",icon:"◉"},{text:"池塘",icon:"▱"}]},
  {id:"water-life-nani",grade:4,term:"四上",publisher:"南一",unit:"水中世界",topic:"水中生物外形與構造",items:[{text:"魚",icon:"◁"},{text:"蝦",icon:"⌁"},{text:"水草",icon:"♧"},{text:"荷葉",icon:"◒"},{text:"青蛙",icon:"◉"},{text:"池塘",icon:"▱"}]},
  {id:"insects",grade:4,term:"四下",publisher:"康軒",unit:"昆蟲大解密",topic:"昆蟲觀察",items:[{text:"蝴蝶",icon:"⋈"},{text:"蜜蜂",icon:"⌘"},{text:"螞蟻",icon:"⋯"},{text:"瓢蟲",icon:"●"},{text:"蜻蜓",icon:"⌁"},{text:"甲蟲",icon:"◉"}]},
  {id:"insects-nani",grade:4,term:"四下",publisher:"南一",unit:"昆蟲家族",topic:"昆蟲的一生與生活",items:[{text:"蝴蝶",icon:"⋈"},{text:"蜜蜂",icon:"⌘"},{text:"螞蟻",icon:"⋯"},{text:"瓢蟲",icon:"●"},{text:"蜻蜓",icon:"⌁"},{text:"甲蟲",icon:"◉"}]},
  {id:"sun-moon",grade:4,term:"四上",publisher:"翰林",unit:"閃亮的天空",topic:"月亮與月相",items:[{text:"太陽",icon:"☼"},{text:"月亮",icon:"☾"},{text:"星星",icon:"✦"},{text:"朔月",icon:"●"},{text:"上弦月",icon:"◐"},{text:"滿月",icon:"○"}]},
  {id:"sun-moon-nani",grade:4,term:"四上",publisher:"南一",unit:"地球的夥伴－日月星辰",topic:"日月星辰與月相",items:[{text:"太陽",icon:"☼"},{text:"月亮",icon:"☾"},{text:"星星",icon:"✦"},{text:"朔月",icon:"●"},{text:"上弦月",icon:"◐"},{text:"滿月",icon:"○"}]},
  {id:"rocks",grade:5,term:"五下",publisher:"康軒",unit:"大地的奧祕",topic:"地層與地表",items:[{text:"岩石",icon:"⬟"},{text:"礦物",icon:"◆"},{text:"土壤",icon:"▰"},{text:"地層",icon:"▤"},{text:"河流",icon:"〰"},{text:"化石",icon:"◉"}]},
  {id:"rocks-hanlin",grade:6,term:"六上",publisher:"翰林",unit:"發現大地的奧祕",topic:"岩石、礦物與土壤",items:[{text:"岩石",icon:"⬟"},{text:"礦物",icon:"◆"},{text:"土壤",icon:"▰"},{text:"地層",icon:"▤"},{text:"河流",icon:"〰"},{text:"化石",icon:"◉"}]},
  {id:"ecology",grade:6,term:"六下",publisher:"康軒",unit:"地球的生態",topic:"生物與生態系",items:[{text:"植物",icon:"♧"},{text:"昆蟲",icon:"⋈"},{text:"鳥類",icon:"⌁"},{text:"魚類",icon:"◁"},{text:"森林",icon:"♣"},{text:"水域",icon:"▱"}]},
  {id:"ecology-hanlin",grade:6,term:"六下",publisher:"翰林",unit:"寰宇永續護地球",topic:"生物與環境",items:[{text:"植物",icon:"♧"},{text:"昆蟲",icon:"⋈"},{text:"鳥類",icon:"⌁"},{text:"魚類",icon:"◁"},{text:"森林",icon:"♣"},{text:"水域",icon:"▱"}]},
  {id:"ecology-nani",grade:6,term:"六下",publisher:"南一",unit:"地球的環境與生態",topic:"族群、群落與生態系",items:[{text:"植物",icon:"♧"},{text:"昆蟲",icon:"⋈"},{text:"鳥類",icon:"⌁"},{text:"魚類",icon:"◁"},{text:"森林",icon:"♣"},{text:"水域",icon:"▱"}]}
];

window.COURSE_MAP_SOURCE = "https://prayer168.github.io/science-course/";
