/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  config.cluster = {
    listen: {
      port: 7008
    }
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1553860609300_579';

  // add your middleware config here
  config.middleware = ['verification'];

  // 跨域
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*']
  };

  // websocket
  config.io = {
    init: {
      wsEngine: 'ws',
    }, // passed to engine.io
    namespace: {
      '/': {
        connectionMiddleware: ['connection'],
        packetMiddleware: [ /* 'packet' */],
      }
    },

    // cluster 模式下，通过 redis 实现数据共享
    redis: {
      // host: 'qiuluo.xin',
      // port: 6377,
      host: '127.0.0.1',
      port: 6379,
    },
  };

  // mongo数据库连接
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/richman',
    // url: 'mongodb://qiuluo.xin:27019/richman',
    options: {
      useNewUrlParser: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0
    }
  };

  // redis连接
  config.redis = {
    client: {
      // port: 6377,          // Redis port
      // host: 'qiuluo.xin',   // Redis host
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: '',
      db: 0,
    },
    prefix: 'richman-'
  }

  //错误码
  config.result = {
    SUCCESS: { errno: 1000, errmsg: '成功' },
    ERROR: { errno: 1002, errmsg: '失败' },
    EXCEPTION: { errno: 1004, errmsg: '出现异常' },
    PARA_MISS: { errno: 1006, errmsg: '缺少必要参数' },
    PARA_ERROR: { errno: 1008, errmsg: '参数格式错误' },
    TOKEN_MISS: { errno: 1010, errmsg: 'token缺失' },
    TOKEN_NOT_FOUND: { errno: 1012, errmsg: '查无此token' },
    TOKEN_INVALID: { errno: 1014, errmsg: 'token不匹配' },
    USER_NOT_FOUND: { errno: 1016, errmsg: '用户不存在' },
    LOGIN_FAIL: { errno: 1018, errmsg: '账号或密码不正确' },
    HAS_EXIST: { errno: 1020, errmsg: '已存在' },
    NOT_EXIST: { errno: 1022, errmsg: '不存在' },
    HTTP_METHOD_ERROR: { errno: 1024, errmsg: 'HTTP请求类型错误' },
    NO_PERMISSION: { errno: 1026, errmsg: '当前用户没有权限操作' },
    UNIONID_MISS_PERMISSION: { errno: 1028, errmsg: '用户没有授权获取unionId，需请求权限获得unionId' },
    SEND_SUCCESS: { errno: 1030, errmsg: '发送成功，请等待wamp回复' },
    NONE_FOUND: { errno: 1034, errmsg: '查询为空' },
    SYS_BUSY: { errno: 1036, errmsg: '系统繁忙，请稍后再试' },
    CODE_INVALID: { errno: 1038, errmsg: 'code无效' },
    DECYPT_FAIL: { errno: 1040, errmsg: '解密失败' },
    APPLY_FAIL: { errno: 1042, errmsg: '申请失败' },
    NAME_UNVERIFIED: { errno: 1044, errmsg: '未实名' },
    API_UNDEFINED: { errno: 1046, errmsg: 'api未定义' },
    ROOME_NOT_FOUND: { errno: 1048, errmsg: '房间未找到' },
    HAS_START: { errno: 1050, errmsg: '中途不可加入' },
    HAS_MAX: { errno: 1052, errmsg: '已达到最大人数' },
  };

  config.jwt = {
    secretKey: "itisaserectforrichman",
    max_token_expire: 60 * 60 * 24 * 30,
    token_expire: 120 * 60,
    whiteList: ['/login', '/signup', '/api/login', '/api/signup']
  }

  // 坐标x以右为正方向，坐标y以下为正方向
  config.country = {
    0: {
      id: 0,
      type: "start",
      country: "起点",
      price: 0,
      upgradePrice: 0,
      position: {
        x: 91.67,
        y: 85.815
      }
    },
    1: {
      id: 1,
      type: "place",
      country: "中国",
      price: 4000,
      income: {
        1: 180,
        2: 2000,
        3: 6000,
        4: 14000,
        5: 17000,
        6: 20000
      },
      upgradePrice: 2000,
      position: {
        x: 83.34,
        y: 85.815
      }
    },
    2: {
      id: 2,
      type: "place",
      country: "日本",
      price: 1000,
      income: {
        1: 60,
        2: 300,
        3: 900,
        4: 2700,
        5: 4000,
        6: 5500
      },
      upgradePrice: 500,
      position: {
        x: 75.01,
        y: 85.815
      }
    },
    3: {
      id: 3,
      type: "chance",
      country: "机会",
      price: 0,
      upgradePrice: 0,
      position: {
        x: 66.68,
        y: 85.815
      }
    },
    4: {
      id: 4,
      type: "place",
      country: "韩国",
      price: 1000,
      income: {
        1: 60,
        2: 300,
        3: 900,
        4: 2700,
        5: 4000,
        6: 5500
      },
      upgradePrice: 500,
      position: {
        x: 58.35,
        y: 85.815
      }
    },
    5: {
      id: 5,
      type: "place",
      country: "菲律宾",
      price: 600,
      income: {
        1: 40,
        2: 200,
        3: 600,
        4: 1800,
        5: 3200,
        6: 4500
      },
      upgradePrice: 500,
      position: {
        x: 50.02,
        y: 85.815
      }
    },
    6: {
      id: 6,
      type: "place",
      country: "印度",
      price: 1400,
      income: {
        1: 100,
        2: 500,
        3: 1500,
        4: 4500,
        5: 6250,
        6: 7500
      },
      upgradePrice: 1000,
      position: {
        x: 41.69,
        y: 85.815
      }
    },
    7: {
      id: 7,
      type: "ocean",
      country: "太平洋",
      price: 0,
      upgradePrice: 0,
      position: {
        x: 33.36,
        y: 85.815
      }
    },
    8: {
      id: 8,
      type: "place",
      country: "伊朗",
      price: 2000,
      income: {
        1: 160,
        2: 800,
        3: 2200,
        4: 6000,
        5: 8000,
        6: 10000
      },
      upgradePrice: 1000,
      position: {
        x: 25.03,
        y: 85.815
      }
    },
    9: {
      id: 9,
      type: "place",
      country: "沙特阿拉伯",
      price: 1800,
      income: {
        1: 140,
        2: 700,
        3: 2000,
        4: 5500,
        5: 7500,
        6: 9500
      },
      upgradePrice: 1000,
      position: {
        x: 16.7,
        y: 85.815
      }
    },
    10: {
      id: 10,
      type: "place",
      country: "叙利亚",
      price: 3500,
      income: {
        1: 350,
        2: 1750,
        3: 5000,
        4: 11000,
        5: 13000,
        6: 15000
      },
      upgradePrice: 2000,
      position: {
        x: 8.37,
        y: 85.815
      }
    },
    11: {
      id: 11,
      type: "place",
      country: "伊拉克",
      price: 1600,
      income: {
        1: 140,
        2: 700,
        3: 2000,
        4: 5500,
        5: 7500,
        6: 9500
      },
      upgradePrice: 1000,
      position: {
        x: 0.04,
        y: 85.815
      }
    },
    12: {
      id: 12,
      type: "place",
      country: "土耳其",
      price: 3500,
      income: {
        1: 350,
        2: 1750,
        3: 5000,
        4: 11000,
        5: 13000,
        6: 15000
      },
      upgradePrice: 2000,
      position: {
        x: 0.04,
        y: 71.53
      }
    },
    13: {
      id: 13,
      type: "fate",
      country: "命运",
      price: 0,
      upgradePrice: 0,
      position: {
        x: 0.04,
        y: 57.245
      }
    },
    14: {
      id: 14,
      type: "place",
      country: "俄罗斯",
      price: 1000,
      income: {
        1: 60,
        2: 300,
        3: 900,
        4: 2700,
        5: 4000,
        6: 5500
      },
      upgradePrice: 500,
      position: {
        x: 0.04,
        y: 42.96
      }
    },
    15: {
      id: 15,
      type: "chance",
      country: "机会",
      price: 0,
      upgradePrice: 0,
      position: {
        x: 0.04,
        y: 28.675
      }
    },
    16: {
      id: 16,
      type: "place",
      country: "英国",
      price: 2200,
      income: {
        1: 180,
        2: 900,
        3: 2500,
        4: 7000,
        5: 8750,
        6: 10500
      },
      upgradePrice: 1500,
      position: {
        x: 0.04,
        y: 14.39
      }
    },
    17: {
      id: 17,
      type: "ocean",
      country: "北极",
      price: 0,
      upgradePrice: 0,
      position: {
        x: 0.04,
        y: 0.105
      }
    },
    18: {
      id: 18,
      type: "place",
      country: "芬兰",
      price: 3200,
      income: {
        1: 220,
        2: 1100,
        3: 3300,
        4: 8000,
        5: 9750,
        6: 11500
      },
      upgradePrice: 1500,
      position: {
        x: 8.37,
        y: 0.105
      }
    },
    19: {
      id: 19,
      type: "place",
      country: "丹麦",
      price: 2800,
      income: {
        1: 220,
        2: 1200,
        3: 3600,
        4: 8500,
        5: 10250,
        6: 12000
      },
      upgradePrice: 1500,
      position: {
        x: 16.7,
        y: 0.105
      }
    },
    20: {
      id: 20,
      type: "place",
      country: "意大利",
      price: 1400,
      income: {
        1: 100,
        2: 500,
        3: 1500,
        4: 4500,
        5: 6250,
        6: 7500
      },
      upgradePrice: 1000,
      position: {
        x: 25.03,
        y: 0.105
      }
    },
    21: {
      id: 21,
      type: "fate",
      country: "命运",
      price: 0,
      upgradePrice: 0,
      position: {
        x: 33.36,
        y: 0.105
      }
    },
    22: {
      id: 22,
      type: "place",
      country: "西班牙",
      price: 1400,
      income: {
        1: 350,
        2: 1750,
        3: 5000,
        4: 11000,
        5: 13000,
        6: 15000
      },
      upgradePrice: 1000,
      position: {
        x: 41.69,
        y: 0.105
      }
    },
    23: {
      id: 23,
      type: "place",
      country: "埃及",
      price: 1800,
      income: {
        1: 140,
        2: 700,
        3: 2000,
        4: 5500,
        5: 7500,
        6: 9500
      },
      upgradePrice: 1000,
      position: {
        x: 50.02,
        y: 0.105
      }
    },
    24: {
      id: 24,
      type: "place",
      country: "赞比亚",
      price: 600,
      income: {
        1: 20,
        2: 100,
        3: 300,
        4: 900,
        5: 1600,
        6: 2500
      },
      upgradePrice: 500,
      position: {
        x: 58.35,
        y: 0.105
      }
    },
    25: {
      id: 25,
      type: "chance",
      country: "机会",
      price: 0,
      upgradePrice: 0,
      position: {
        x: 66.68,
        y: 0.105
      }
    },
    26: {
      id: 26,
      type: "place",
      country: "加拿大",
      price: 3500,
      income: {
        1: 350,
        2: 1750,
        3: 5000,
        4: 11000,
        5: 13000,
        6: 15000
      },
      upgradePrice: 2000,
      position: {
        x: 75.01,
        y: 0.105
      }
    },
    27: {
      id: 27,
      type: "place",
      country: "美国",
      price: 3500,
      income: {
        1: 350,
        2: 1750,
        3: 5000,
        4: 11000,
        5: 13000,
        6: 15000
      },
      upgradePrice: 2000,
      position: {
        x: 83.34,
        y: 0.105
      }
    },
    28: {
      id: 28,
      type: "place",
      country: "墨西哥",
      price: 1000,
      income: {
        1: 60,
        2: 300,
        3: 900,
        4: 2700,
        5: 4000,
        6: 5500
      },
      upgradePrice: 500,
      position: {
        x: 91.67,
        y: 0.105
      }
    },
    29: {
      id: 29,
      type: "place",
      country: "洪都拉斯",
      price: 1200,
      income: {
        1: 80,
        2: 400,
        3: 1000,
        4: 3000,
        5: 4500,
        6: 6000
      },
      upgradePrice: 1500,
      position: {
        x: 91.67,
        y: 14.39
      }
    },
    30: {
      id: 30,
      type: "fate",
      country: "命运",
      price: 0,
      upgradePrice: 0,
      position: {
        x: 91.67,
        y: 28.675
      }
    },
    31: {
      id: 31,
      type: "place",
      country: "巴拿马",
      price: 3200,
      income: {
        1: 280,
        2: 1500,
        3: 4500,
        4: 10000,
        5: 12000,
        6: 14000
      },
      upgradePrice: 2000,
      position: {
        x: 91.67,
        y: 42.96
      }
    },
    32: {
      id: 32,
      type: "place",
      country: "巴西",
      price: 2600,
      income: {
        1: 220,
        2: 1100,
        3: 3300,
        4: 8000,
        5: 9750,
        6: 11500
      },
      upgradePrice: 1500,
      position: {
        x: 91.67,
        y: 57.245
      }
    },
    33: {
      id: 33,
      type: "place",
      country: "澳大利亚",
      price: 3200,
      income: {
        1: 280,
        2: 1500,
        3: 4500,
        4: 10000,
        5: 12000,
        6: 14000
      },
      upgradePrice: 2000,
      position: {
        x: 91.67,
        y: 71.53
      }
    }
  }

  config.chances = {
    1: {
      text: "畅游尼加拉瓜",
      result: "得500元",
      // result: "可在翻下一张机会",
      effect: 500
    },
    2: {
      text: "直飞美国、会见白马王子从事政治",
      result: "得2000元",
      // result: "如经过起点得2000元",
      effect: 2000
    },
    3: {
      text: "为登月第一人",
      result: "得500元",
      effect: 500
    },
    4: {
      text: "观赏西班牙斗牛",
      result: "门票200分",
      effect: -200
    },
    5: {
      text: "太空船故障",
      result: "失去现金1000元",
      // result: "失去所有现金1/10",
      effect: -1000
    },
    6: {
      text: "巴黎铁塔一日游",
      result: "买香水1000元",
      effect: -1000
    },
    7: {
      text: "能源危机解除，经济复苏",
      result: "获利2500元",
      effect: 2500
    },
    8: {
      text: "破奥运会记录",
      result: "得奖金2000元",
      effect: 2000
    },
    9: {
      text: "荣获诺贝尔奖金",
      result: "得3000元",
      effect: 3000
    },
    10: {
      text: "误入食人族",
      result: "损失600元",
      effect: -600
    },
    11: {
      text: "飞机失事（美国大峡谷）",
      result: "损失1000元",
      effect: -1000
    },
    12: {
      text: "经过梵蒂冈，拜见教宗",
      result: "得1000元",
      effect: 1000
    },
    13: {
      text: "变魔术，自由女神像不见了",
      result: "酬劳2000元",
      effect: 2000
    },
    14: {
      text: "付户税",
      result: "付1500元",
      // result: "房屋每幢250元\n旅馆每幢1000元",
      effect: -1500
    },
    15: {
      text: "拉斯维加斯赌博，现金输光",
      result: "救济2000元",
      // result: "每人救济1000元",
      effect: 2000
    },
    16: {
      text: "探险被人面兽身怪兽侵袭",
      result: "损失300元",
      effect: -300
    },
    17: {
      text: "英国女王接见",
      result: "赏500元",
      effect: 500
    },
    18: {
      text: "载游客游览尼罗河风光",
      result: "得300分",
      effect: 300
    },
    19: {
      text: "越南沦亡",
      result: "失去2000元",
      // result: "退回起点",
      effect: -2000
    },
    20: {
      text: "违章建筑",
      result: "罚款500元",
      effect: -500
    }
  }

  config.fates = {
    1: {
      text: "破获泰北毒品走私案",
      result: "奖金1000元",
      effect: 1000
    },
    2: {
      text: "金字塔内，寻得宝藏",
      result: "得2000元",
      effect: 2000
    },
    3: {
      text: "遭受原子弹轰炸",
      result: "损失500元",
      effect: -500
    },
    4: {
      text: "吃韩国烧烤",
      result: "付200元",
      effect: -200
    },
    5: {
      text: "跳西班牙舞、舞姿美妙",
      result: "奖200元",
      // result: "前进二步", // 得200元
      effect: 200
    },
    6: {
      text: "畅游狄斯尼乐园",
      result: "门票200元",
      effect: -200
    },
    7: {
      text: "进入影城，好莱坞当明星",
      result: "得1000元",
      effect: 1000
    },
    8: {
      text: "梦见埃及艳后",
      result: "赏赐500元",
      effect: 500
    },
    9: {
      text: "泛莱茵河",
      result: "船租金1000",
      effect: -1000
    },
    10: {
      text: "衡越英吉利海峡",
      result: "精神奖励1000元",
      effect: 1000
    },
    11: {
      text: "击落战斗机",
      result: "得奖金300元",
      effect: 3000
    },
    12: {
      text: "环游世界、第一天晕船",
      result: "买药500元",
      // result: "暂停一次",
      effect: -500
    },
    13: {
      text: "付户税",
      result: "付1500元",
      // result: "房屋每幢250元\n旅馆每幢1000元",
      effect: -1500
    },
    14: {
      text: "到夏威夷度假",
      result: "得500元",
      // result: "如经过起点得2000元",
      effect: 500
    },
    15: {
      text: "与木乃伊合照冲洗相片",
      result: "费用300元",
      effect: -300
    },
    16: {
      text: "登喜马拉雅山成功",
      result: "奖励金1000元",
      effect: 1000
    },
    17: {
      text: "参加世界小姐选美",
      result: "奖金500元",
      effect: 500
    },
    18: {
      text: "飞机跌落太平洋",
      result: "损失2000元",
      // result: "退回起点",
      effect: -2000
    },
    19: {
      text: "渴死在撒哈拉沙漠",
      result: "得救济金1000元",
      effect: 1000
    },
    20: {
      text: "进入银月城，维也纳",
      result: "付学费1000元",
      effect: -1000
    }
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
