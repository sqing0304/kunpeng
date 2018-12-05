var Sequelize = require("sequelize");
var config = require("../config/config");
var sequelize = new Sequelize(config.dbDatabase, config.dbUser, config.dbPassword, {
    host: config.dbHost,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    charset:'utf8',
    timezone: '+08:00'
});

var Users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.CHAR(50),
        field: 'name'
    },
    type: {
        type: Sequelize.INTEGER,
        field: 'type'
    },
    position: {
        type: Sequelize.CHAR(50),
        field: 'position'
    },
    permission: {
        type: Sequelize.INTEGER,
        field: 'permission'
    },
    passwd: {
        type: Sequelize.CHAR(100),
        field: 'passwd'
    },
    overseas: {
        type: Sequelize.INTEGER(255),
        field: 'overseas'
    }
}, {
    freezeTableName: true
});

var Products = sequelize.define('products', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        autoIncrement: true,
        primaryKey: true
    },
    coding: {
        type: Sequelize.CHAR(100),
        field: 'coding'
    },
    finalcode: {
        type: Sequelize.CHAR(255),
        field: 'finalcode'
    },
    orderid: {
        type: Sequelize.INTEGER,
        field: 'orderid'
    },
    status: {
        type: Sequelize.INTEGER,
        field: 'status'
    },
    holder: {
        type: Sequelize.INTEGER,
        field: 'holder'
    },
    sended: {
        type: Sequelize.INTEGER,
        field: 'sended'
    },
    charger: {
        type: Sequelize.CHAR(80),
        field: 'charger'
    },
    producer: {
        type: Sequelize.CHAR(80),
        field: 'producer'
    },
    startassemble: {
        type: Sequelize.CHAR(80),
        field: 'startassemble'
    },
    preassemble: {
        type: Sequelize.CHAR(80),
        field: 'preassemble'
    },
    adjreflector: {
        type: Sequelize.CHAR(80),
        field: 'adjreflector'
    },
    poireflector: {
        type: Sequelize.CHAR(80),
        field: 'poireflector'
    },
    poiemission: {
        type: Sequelize.CHAR(80),
        field: 'poiemission'
    },
    poireceive: {
        type: Sequelize.CHAR(80),
        field: 'poireceive'
    },
    uvretest: {
        type: Sequelize.CHAR(80),
        field: 'uvretest'
    },
    dimming: {
        type: Sequelize.CHAR(80),
        field: 'dimming'
    },
    dimmingimg: {
        type: Sequelize.CHAR(255),
        field: 'dimmingimg'
    },
    dimmingretest: {
        type: Sequelize.CHAR(80),
        field: 'dimmingretest'
    },
    dimmingretestimg: {
        type: Sequelize.CHAR(255),
        field: 'dimmingretestimg'
    },
    dynbalance: {
        type: Sequelize.CHAR(80),
        field: 'dynbalance'
    },
    assembly: {
        type: Sequelize.CHAR(80),
        field: 'assembly'
    },
    static: {
        type: Sequelize.CHAR(80),
        field: 'static'
    },
    reflectivity: {
        type: Sequelize.CHAR(80),
        field: 'reflectivity'
    },
    agingtest: {
        type: Sequelize.CHAR(80),
        field: 'agingtest'
    },
    evaluation: {
        type: Sequelize.CHAR(80),
        field: 'evaluation'
    },
    deliver: {
        type: Sequelize.CHAR(80),
        field: 'deliver'
    },
    deliverdate: {
        type: Sequelize.CHAR(80),
        field: 'deliverdate'
    },
    nowstep: {
        type: Sequelize.CHAR(80),
        field: 'nowstep'
    },
    situation: {
        type: Sequelize.CHAR(255),
        field: 'situation'
    },
    unnormal: {
        type: Sequelize.CHAR(255),
        field: 'unnormal'
    },
    remarks: {
        type: Sequelize.TEXT(255),
        field: 'remarks'
    },
    express: {
        type: Sequelize.CHAR(255),
        field: 'express'
    },
    logisticremark: {
        type: Sequelize.CHAR(255),
        field: 'logisticremark'
    },
    courier: {
        type: Sequelize.CHAR(255),
        field: 'courier'
    },
    stationid: {
        type: Sequelize.CHAR(255),
        field: 'stationid'
    },
    debuger: {
        type: Sequelize.CHAR(50),
        field: 'debuger'
    }
}, {
    freezeTableName: true
});


var Productsteps = sequelize.define('productsteps', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        autoIncrement: true,
        primaryKey: true
    },
    productid: {
        type: Sequelize.INTEGER,
        field: 'productid'
    },
    enname: {
        type: Sequelize.CHAR(50),
        field: 'enname'
    },
    cnname: {
        type: Sequelize.CHAR(50),
        field: 'cnname'
    },
    time: {
        type: Sequelize.CHAR(50),
        field: 'time'
    },
    charger: {
        type: Sequelize.CHAR(50),
        field: 'charger'
    },
    submiter: {
        type: Sequelize.CHAR(50),
        field: 'submiter'
    },
    operator: {
        type: Sequelize.CHAR(100),
        field: 'operator'
    },
    img: {
        type: Sequelize.CHAR(50),
        field: 'img'
    },
    situation: {
        type: Sequelize.CHAR(255),
        field: 'situation'
    },
    status: {
        type: Sequelize.INTEGER,
        field: 'status'
    },
    revoke: {
        type: Sequelize.INTEGER,
        field: 'revoke'
    }
}, {
    freezeTableName: true
});


var Ordersteps = sequelize.define('ordersteps', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        autoIncrement: true,
        primaryKey: true
    },
    orderid: {
        type: Sequelize.INTEGER,
        field: 'orderid'
    },
    enname: {
        type: Sequelize.CHAR(50),
        field: 'enname'
    },
    cnname: {
        type: Sequelize.CHAR(50),
        field: 'cnname'
    },
    time: {
        type: Sequelize.CHAR(50),
        field: 'time'
    },
    charger: {
        type: Sequelize.CHAR(50),
        field: 'charger'
    },
    submiter: {
        type: Sequelize.CHAR(50),
        field: 'submiter'
    },
    img: {
        type: Sequelize.CHAR(50),
        field: 'img'
    },
    situation: {
        type: Sequelize.CHAR(255),
        field: 'situation'
    },
    status: {
        type: Sequelize.CHAR(50),
        field: 'status'
    },
    revoke: {
        type: Sequelize.INTEGER,
        field: 'revoke'
    },
    price: {
        type: Sequelize.CHAR(50),
        field: 'price'
    },
    delivery: {
        type: Sequelize.CHAR(255),
        field: 'delivery'
    }
}, {
    freezeTableName: true
});

var Orders = sequelize.define('orders', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        autoIncrement: true,
        primaryKey: true
    },
    coding: {
        type: Sequelize.CHAR(100),
        field: 'coding'
    },
    customerid: {
        type: Sequelize.INTEGER,
        field: 'customerid'
    },
    deliverdate: {
        type: Sequelize.CHAR(50),
        field: 'deliverdate'
    },
    quantity: {
        type: Sequelize.INTEGER,
        field: 'quantity'
    },
    address: {
        type: Sequelize.CHAR(255),
        field: 'address'
    },
    singleprice: {
        type: Sequelize.INTEGER,
        field: 'singleprice'
    },
    price: {
        type: Sequelize.INTEGER,
        field: 'price'
    },
    fullpay: {
        type: Sequelize.INTEGER,
        field: 'fullpay'
    },
    priority: {
        type: Sequelize.INTEGER,
        field: 'priority'
    },
    type: {
        type: Sequelize.INTEGER,
        field: 'type'
    },
    status: {
        type: Sequelize.INTEGER,
        field: 'status'
    },
    payment: {
        type: Sequelize.INTEGER,
        field: 'payment'
    },
    charger: {
        type: Sequelize.CHAR(50),
        field: 'charger'
    },
    invoice: {
        type: Sequelize.CHAR(50),
        field: 'invoice'
    },
    date: {
        type: Sequelize.CHAR(50),
        field: 'date'
    },
    toer: {
        type: Sequelize.CHAR(50),
        field: 'toer'
    },
    attn: {
        type: Sequelize.INTEGER,
        field: 'attn'
    },
    tel: {
        type: Sequelize.CHAR(50),
        field: 'tel'
    },
    fax: {
        type: Sequelize.CHAR(50),
        field: 'fax'
    },
    email: {
        type: Sequelize.CHAR(50),
        field: 'email'
    },
    format: {
        type: Sequelize.CHAR(50),
        field: 'format'
    },
    purpose: {
        type: Sequelize.CHAR(50),
        field: 'purpose'
    },
    currency: {
        type: Sequelize.CHAR(50),
        field: 'currency'
    },
    paymentterms: {
        type: Sequelize.TEXT(255),
        field: 'paymentterms'
    },
    priceterms: {
        type: Sequelize.TEXT(255),
        field: 'priceterms'
    },
    shipment: {
        type: Sequelize.CHAR(255),
        field: 'shipment'
    },
    remark: {
        type: Sequelize.TEXT(255),
        field: 'remark'
    },
    //  实际交货日期
    deliver: {
        type: Sequelize.CHAR(50),
        field: 'deliver'
    },
    nowstep: {
        type: Sequelize.CHAR(80),
        field: 'nowstep'
    },
    //  步骤描述
    situation: {
        type: Sequelize.CHAR(255),
        field: 'situation'
    },
    unnormal: {
        type: Sequelize.CHAR(255),
        field: 'unnormal'
    },
    submiter: {
        type: Sequelize.INTEGER,
        field: 'submiter'
    },
    isdelete: {
        type: Sequelize.INTEGER,
        field: 'isdelete'
    },
    remarks: {
        type: Sequelize.CHAR(255),
        field: 'remarks'
    },
    finished: {
        type: Sequelize.INTEGER,
        field: 'finished'
    }
}, {
    freezeTableName: true
});

var Customers = sequelize.define('customers', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.CHAR(100),
        field: 'name'
    },
    logo: {
        type: Sequelize.CHAR(100),
        field: 'logo'
    },
    coding: {
        type: Sequelize.CHAR(50),
        field: 'coding'
    },
    location: {
        type: Sequelize.CHAR(50),
        field: 'location'
    },
    phone: {
        type: Sequelize.CHAR(50),
        field: 'phone'
    },
    isdelete: {
        type: Sequelize.INTEGER,
        field: 'isdelete'
    }
}, {
    freezeTableName: true
});

var Express = sequelize.define('express', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        autoIncrement: true,
        primaryKey: true
    },
    express: {
        type: Sequelize.CHAR(255),
        field: 'express'
    },
    logistic: {
        type: Sequelize.CHAR(255),
        field: 'logistic'
    },
    orderid: {
        type: Sequelize.INTEGER,
        field: 'orderid'
    },
    returned: {
        type: Sequelize.INTEGER,
        field: 'returned'
    },
    type: {
        type: Sequelize.INTEGER,//0是发货，1是退货
        field: 'type'
    },
    productid: {
        type: Sequelize.CHAR(50),
        field: 'productid'
    },
    sended: {
        type: Sequelize.INTEGER,
        field: 'sended'
    },
    courier: {
        type: Sequelize.CHAR(255),
        field: 'courier'
    },
    submiter: {
        type: Sequelize.INTEGER,
        field: 'submiter'
    },
    remarks: {
        type: Sequelize.CHAR(255),
        field: 'remarks'
    },
    deliverdate: {
        type: Sequelize.CHAR(255),
        field: 'deliverdate'
    },
    invoice: {
        type: Sequelize.CHAR(255),
        field: 'invoice'
    },
    invoicedate: {
        type: Sequelize.CHAR(255),
        field: 'invoicedate'
    }
}, {
    freezeTableName: true
});

var Debug = sequelize.define('debug', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        autoIncrement: true,
        primaryKey: true
    },
    enname: {
        type: Sequelize.CHAR(50),
        field: 'enname'
    },
    step: {
        type: Sequelize.CHAR(50),
        field: 'step'
    },
    productid: {
        type: Sequelize.CHAR(255),
        field: 'productid'
    },
    D0: {
        type: Sequelize.CHAR(100),
        field: 'D0'
    },
    D1: {
        type: Sequelize.CHAR(100),
        field: 'D1'
    },
    D2: {
        type: Sequelize.CHAR(100),
        field: 'D2'
    },
    D3: {
        type: Sequelize.CHAR(100),
        field: 'D3'
    },
    D4: {
        type: Sequelize.CHAR(100),
        field: 'D4'
    },
    D5: {
        type: Sequelize.CHAR(100),
        field: 'D5'
    },
    D6: {
        type: Sequelize.CHAR(100),
        field: 'D6'
    },
    D7: {
        type: Sequelize.CHAR(100),
        field: 'D7'
    },
    U7: {
        type: Sequelize.CHAR(100),
        field: 'U7'
    },
    U6: {
        type: Sequelize.CHAR(100),
        field: 'U6'
    },
    U5: {
        type: Sequelize.CHAR(100),
        field: 'U5'
    },
    U4: {
        type: Sequelize.CHAR(100),
        field: 'U4'
    },
    U3: {
        type: Sequelize.CHAR(100),
        field: 'U3'
    },
    U2: {
        type: Sequelize.CHAR(100),
        field: 'U2'
    },
    U1: {
        type: Sequelize.CHAR(100),
        field: 'U1'
    },
    U0: {
        type: Sequelize.CHAR(100),
        field: 'U0'
    }
}, {
    freezeTableName: true
});


var Station = sequelize.define('station', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        autoIncrement: true,
        primaryKey: true
    },
    producer: {
        type: Sequelize.CHAR(255),
        field: 'producer'
    },
    number: {
        type: Sequelize.CHAR(150),
        field: 'number'
    },
    distance: {
        type: Sequelize.CHAR(150),
        field: 'distance'
    },
    position: {
        type: Sequelize.CHAR(150),
        field: 'position'
    },
    height: {
        type: Sequelize.CHAR(150),
        field: 'height'
    },
    standard: {
        type: Sequelize.CHAR(250),
        field: 'standard'
    }
}, {
    freezeTableName: true
});


var Invoice = sequelize.define('invoice', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        autoIncrement: true,
        primaryKey: true
    },
    orderid: {
        type: Sequelize.CHAR(255),
        field: 'orderid'
    },
    submiter: {
        type: Sequelize.CHAR(255),
        field: 'submiter'
    },
    code: {
        type: Sequelize.CHAR(150),
        field: 'code'
    },
    date: {
        type: Sequelize.CHAR(100),
        field: 'date'
    },
    money: {
        type: Sequelize.CHAR(100),
        field: 'money'
    }
}, {
    freezeTableName: true
});


// var Salesre = sequelize.define('salesre', {
//     id: {
//         type: Sequelize.INTEGER,
//         field: 'id',
//         autoIncrement: true,
//         primaryKey: true
//     },
//     orderid: {
//         type: Sequelize.INTEGER,
//         field: 'orderid'
//     },
//     status: {
//         type: Sequelize.INTEGER,
//         field: 'status'
//     },
//     excoding: {
//         type: Sequelize.CHAR(50),
//         field: 'excoding'
//     },
//     express: {
//         type: Sequelize.CHAR(150),
//         field: 'express'
//     },
//     courier: {
//         type: Sequelize.CHAR(150),
//         field: 'courier'
//     },
//     deliverdate: {
//         type: Sequelize.CHAR(150),
//         field: 'deliverdate'
//     },
//     productid: {
//         type: Sequelize.CHAR(150),
//         field: 'productid'
//     },
//     deliverdate: {
//         type: Sequelize.CHAR(150),
//         field: 'deliverdate'
//     }
// }, {
//     freezeTableName: true
// });

exports.Users = Users;
exports.Products = Products;
exports.Customers = Customers;
exports.Orders = Orders;
exports.Productsteps = Productsteps;
exports.Ordersteps = Ordersteps;
exports.Express = Express;
exports.Debug = Debug;
exports.Station = Station;
exports.Invoice = Invoice;
