var config={
    cdnImagesPath:'http://ipano3.sz-sti.com/',
    version:'1.0.0',

    AppSecret:'dce97430fc38b2da39b34148f6949ca7',
    AppID:'wxec58fce24188eb77',

    dbHost:'localhost',
    dbUser:'root',
    dbPassword:'suteng-qson',
    dbDatabase:'mes',


    steps: [
        "startassemble",
        "preassemble",
        "adjreflector",
        "poireflector",
        "poiemission",
        "poiemitc",
        "poireceive",
        "uvretest",
        "dimming",
        "dimmingretest",
        "dynbalance",
        "assembly",
        "reflectivity",
        "static",
        "agingtest",
        "evaluation",
        "deliver"
    ],
    stepname: {
        "startassemble": "开始生产",
        "preassemble": "预组装",
        "adjreflector": "调小反射镜",
        "poireflector": "点小反射镜",
        "poiemission": "点发射",
        "poiemitc": "点发射完TC",
        "poireceive": "点接收+复测",
        "uvretest": "UV+复测",
        "dimming": "UV复测后TC老化",
        "dimmingretest": "TC后复测",
        "dynbalance": "动平衡",
        "assembly": "总装",
        "reflectivity": "标反射率",
        "static": "标静态量",
        "agingtest": "老化测试",
        "evaluation": "产品评估",
        "deliver": "交付使用"
    },
    stepupimg: {
        "startassemble": 0,
        "preassemble": 0,
        "adjreflector": 0,
        "poireflector": 0,
        "poiemission": 0,
        "poiemitc": 0,
        "poireceive": 1,
        "uvretest": 1,
        "dimming": 0,
        "dimmingretest": 2,
        "dynbalance": 1,
        "assembly": 1,
        "reflectivity": 2,
        "static": 1,
        "agingtest": 1,
        "evaluation": 0,
        "deliver": 0
    },
    stepdate: {//各环节所需天数
        "startassemble": 0,
        "preassemble": 0.5,
        "adjreflector": 1,
        "poireflector": 0.5,
        "poiemission": 1,
        "poiemitc": 0.2,
        "poireceive": 2,
        "uvretest": 0.1,
        "dimming": 0.2,
        "dimmingretest": 0.2,
        "dynbalance": 0.2,
        "assembly": 0.3,
        "reflectivity": 0.6,
        "static": 0.1,
        "agingtest": 0.2,
        "evaluation": 1.2,
        "deliver": 0.1
    },
    orderStep: [
        "start",
        "intention",
        "marketapproval",
        "approval",
        // "confirm",
        "drawpage",
        "confirmpage",
        "signpage",
        // "pageconfirm",
        "pay",
        "checkpay",
        "deliver",
        "balance"
    ],
    orderStepName: {
        "start": "开始录入",
        "intention": "确定合作意向",
        "marketapproval": "销售总监审批",
        "approval": "运营总监审批",
        // "confirm": "供应链确认",
        "drawpage": "拟定合同",
        "confirmpage": "合同审批",
        "signpage": "合同签订",
        // "pageconfirm": "确认收到合同",
        // "ordered": "下单",
        "pay": "支付",
        "checkpay": "支付验证",
        "deliver": "订单交付",
        "balance": "余款确认"
    },
    orderUpimg: {
        "start": 0,
        "intention": 0,
        "marketapproval": 0,
        "approval": 0,
        // "confirm": 0,
        "drawpage": 2,
        "confirmpage": 0,
        "signpage": 1,
        // "pageconfirm": 0,
        // "ordered": 0,
        "pay": 1,
        "checkpay": 0,
        "deliver": 0,
        "balance": 1
    },
	producers: {
        1: "速腾聚创",
        2: "步科科技",
        3: "卓翼科技"
    },
    debug: {
        "poiemission": {
            1: "发射光斑基准位置(cm)",
            2: "发射光斑调测位置(cm)",
            3: "发射TC前验证30m回波幅值(mv)"
        },
        "poireceive": {
            1: "发射TC后验证30m回波幅值(mv)",
            2: "调测30m回波幅值(mv)",
            3: "原工位复测光斑位置(cm)",
            4: "原工位复测信号幅值(mv)"
        },
        "uvretest": {
            1: "UV后复测光斑位置(cm)",
            2: "UV后复测回波幅值(mv)"
        },
        "dimmingretest": {
            1: "TC后复测光斑位置(cm)",
            2: "TC后复测信号幅值(mv)"
        }
    },
    debugsteps: [
        'D0','D1','D2','D3','D4','D5','D6','D7',
        'U7','U6','U5','U4','U3','U2','U1','U0'
    ],
    standard: {
        "poiemission": {
            D0: '600',
            U0: '600',
            D1: '800',
            U1: '800',
            other: '950'
        },
        "poireceive": {
            D0: '600',
            U0: '600',
            D1: '800',
            U1: '800',
            other: '900'
        },
        "uvretest": {
            D0: '600',
            U0: '600',
            D1: '800',
            U1: '800',
            other: '900'
        },
        "dimmingretest": {
            D0: '550',
            U0: '550',
            D1: '720',
            U1: '720',
            other: '850'
        }
    }
}

module.exports = config;