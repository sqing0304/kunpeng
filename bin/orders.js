var express = require('express');
var router = express.Router();
var db = require('./model');
var utils = require('./utils');
var config = require('../config/config');
var moment = require('moment');
var fs = require('fs');
var posts = utils.getposts();

// 产品列表
router.get('/lists', function(req, res){

    utils.autologin(req, res, function(userid){
        var result = {
            code: 0,
            msg: 'ok'
        };
        db.Users.findOne({
            attributes: ['name', 'permission', 'type', 'position'],
            where: {
                id: userid
            }
        }).then(function(user){

            if(!user){
                res.json({code: -1, msg: 'No such user'});
                return;
            };

            user = JSON.parse(JSON.stringify(user));

            result.user = user;

            getListsData(user);
        });

        //  获取所有订单数据
        function getListsData(user){
            var page = parseInt(req.query.page)?parseInt(req.query.page):1;
            var limit = 20;

            var map = {
                limit: limit,
                offset: (page - 1) * limit,
                order: "createdAt DESC"
            };

            if(req.query.search){
                map.where = { 
                    coding: {
                        $like: "%" + (req.query.search).toUpperCase() + "%"
                    }
                }
            }
            db.Orders.findAndCountAll(map).then(function(lists){
                if(!lists){
                    res.json({code: -2, msg: '订单获取失败'});
                    return;
                }

                lists = JSON.parse(JSON.stringify(lists));

                result.count = lists.count;

                getCustomers(lists.rows);
            });

            //  获取所有订单的客户信息
            function getCustomers(lists){

                //  订单所有的客户ID
                var customerLists = [];
                for(var i in lists){
                    customerLists.push(lists[i].customerid);
                };

                //  获取所有订单的客户信息
                db.Customers.findAll({
                    where: {
                        id: {
                            $in: customerLists
                        }
                    }
                }).then(function(customers){

                    for(var i in lists){
                        lists[i].nowstep = JSON.parse(lists[i].nowstep);
                        for(var j in customers){
                            if(customers[j].id == lists[i].customerid || customers[j].name == lists[i].customerid){

                                //  客户信息赋值到订单数据中
                                lists[i].customer = customers[j];
                            }
                        }
                        if(!lists[i].customer)lists[i].customer = {name: lists[i].customerid, coding: '暂未分配'};
                    }
                    result.lists = lists;
                    //  订单总条数
                    returndata(result);
                })

                function returndata(result){

                    res.json(result);

                }
            }
        }
    });

});

//  订单详情列表
router.get('/lists/:id', function(req, res){

    utils.autologin(req, res, function(userid){
        var result = {
            code: 0
        };
        db.Users.findOne({
            attributes: ['name', 'permission', 'type', 'position'],
            where: {
                id: userid
            }
        }).then(function(user){

            if(!user){
                res.json({code: -1, msg: 'No such user'});
                return;
            };

            user = JSON.parse(JSON.stringify(user));

            result.user = user;

            getOrderData();

        });

        //  获取订单详情
        function getOrderData(){

            var orderId = parseInt(req.params.id);

            db.Orders.findOne({
                where: {
                    id: orderId
                }
            }).then(function(order){

                if(!order){
                    res.json({code: -2, msg: '传入的参数错误或找不到订单'});
                    return;
                }

                result.order = JSON.parse(JSON.stringify(order));
                result.nowstep = JSON.parse(order.nowstep);

                result.order.nowstep = undefined;

                getCustomer(order);

            })

        }

        //  获取订单的客户
        function getCustomer(order){

            db.Customers.findOne({
                where: {
                    id: order.customerid
                }
            }).then(function(customer){

                result.customer = customer?customer:{name: order.customerid};

                getOrderStep(result.order);

            })
        }

        //  订单步骤细分化
        function getOrderStep(order){

            db.Users.findAll().then(function(users){
            
                var steps = [];
                var situation = JSON.parse(order.situation);

                db.Ordersteps.findAll({
                    where: {
                        orderid: order.id
                    }
                }).then(function(steps){

                    var useridarr = [];

                    for(var i in steps){
                        useridarr.push(steps[i].submiter);
                    }

                    db.Users.findAll({
                        attributes: ['id','name'],
                        where: {
                            id: {
                                $in: useridarr
                            }
                        }
                    }).then(function(users){

                        var stepnameobj = {};

                        for(var i in users)
                            stepnameobj[users[i].id] = users[i].name;

                        for(var i in steps){
                            steps[i].submiter = stepnameobj[steps[i].submiter]?stepnameobj[steps[i].submiter]:'';
                            if(steps[i].status == 1)steps[i].cnname += '（异常）';
                            steps[i].img = steps[i].img?(config.cdnImagesPath+steps[i].img):''
                        }

                        var nextstep = config.orderStep[config.orderStep.indexOf(result.nowstep.enname) + 1];
                        result.nextstep = {
                            enname: nextstep?nextstep:'',
                            cnname: nextstep?config.orderStepName[nextstep]:''
                        };

                        for(var i in config.orderStep){
                            console.log(config.orderStep.indexOf(result.nowstep.enname))
                            if(i > config.orderStep.indexOf(result.nowstep.enname)){
                                var stepinfo = {
                                    status: -1,
                                    enname: config.orderStep[i],
                                    cnname: config.orderStepName[config.orderStep[i]],
                                    upimg: config.orderUpimg[config.orderStep[i]]
                                }
                                steps.push(stepinfo);
                            }
                        }
                        result.order = order;
                        result.steps = steps;

                        res.json(result);
                    });
                })
                // fs.readFile('orders_unnormal.json', 'utf-8', function(err,data){
                //     if(err){
                //         console.log(err);
                //     }
                //     var unnormal = JSON.parse(data)[order.coding]?JSON.parse(data)[order.coding]:'';
                //     for(var i in config.orderStep){
                //         if(unnormal[config.orderStep[i]]){
                //             steps.push({
                //                 code: 1,
                //                 enname: config.orderStep[i],
                //                 name: config.orderStepName[config.orderStep[i]] + '（异常）',
                //                 time: unnormal[config.orderStep[i]].time,
                //                 charger: unnormal[config.orderStep[i]].charger,
                //                 situation: unnormal[config.orderStep[i]].situation
                //             })  
                //         }
                //         if(order[config.orderStep[i]]){
                //             var data = {
                //                 code: 0,
                //                 name: config.orderStepName[config.orderStep[i]],
                //                 time: order[config.orderStep[i]].split('_')[0],
                //                 situation: situation[config.orderStep[i]]?situation[config.orderStep[i]]:'正常'
                //             };
                //             //  公司老大分配 支付金额
                //             if(config.orderStep[i] == 'pay' && (result.user.permission > 0 && result.user.permission <=5 || result.user.permission == 23)){
                //                 data.name += '('+ order.payment +' 元)';
                //             }
                //             for(var j in users){
                //                 if(result.order[config.orderStep[i]].split('_')[1] == users[j].id){
                //                     data.charger = users[j].name;
                //                 }
                //             }
                //             data.charger = data.charger?data.charger:'';
                //             steps.push(data);
                //         }else{
                //             steps.push({
                //                 code: -1,
                //                 name: config.orderStepName[config.orderStep[i]]
                //             });
                //         }
                //     }
                //     result.steps = steps;

                    // for(var i in result.order){ 
                    //     if(config.orderStep.indexOf(i)!=-1){
                    //         result.order[i] = undefined;
                    //     }
                    // }

                    
                    // // 返回数据
                    // res.json(result);
                // });
            })
        } 
    });
});

//  录入新订单时，返回客户名称列表供录入人员选择
router.get('/customers', function(req, res){

    utils.autologin(req, res, function(userid){

        db.Customers.findAll({
            attributes: ['id', 'name', 'logo', 'phone']
        }).then(function(customers){
            res.json({code: 0, msg: 'ok', customers: customers})
        })

    });

})


//  订单录入
router.post('/save', function(req, res){

    utils.autologin(req, res, function(userid){

        var deliverdate = req.body.deliverdate;    //  指定交货日期
        var quantity = req.body.quantity;    //  订单数量
        var charger = req.body.charger;    //  负责人
        var customerid = req.body.customerid;  //  客户ID 老客户时传递
        var overseas = req.body.overseas;  // 1：海外
        var year = new Date().getFullYear();
        var month = (new Date().getMonth() + 1) < 10?'0' + (new Date().getMonth() + 1):(new Date().getMonth() + 1);

        db.Orders.findAll().then(function(orders){

            var orders_count = orders.length;

            //  订单信息
            var orderData = {
                coding: (overseas?'PF':'PD') + year + month + (100000 + orders_count + 1 + '').substr(1),  // 生成订单编号
                deliverdate: deliverdate?deliverdate:'',
                quantity: parseInt(quantity)?parseInt(quantity):'',
                charger: charger?charger:'',
                nowstep: JSON.stringify({
                    enname: 'intention',
                    cnname: '确定意向',
                    time: new Date().Format('yyyy-MM-dd hh:mm:ss'),
                    situation: '正常'
                })
            };
            //  是否为新客户 customerid
            if(parseInt(req.body.isnewcustomer)){
                var customerName = req.body.customerName;
                var customerPhone = req.body.customerPhone;
                var customerLocation = req.body.customerLocation;

                if(!customerName){
                    res.json({code: -66, msg: '客户名称不能为空'});
                    return;
                }
                //  先录入新客户，返回客户ID，再录入订单
                
                db.Customers.findOne({
                    where: {
                        name: customerName
                    }
                }).then(function(hascustomer){
                    if(hascustomer){
                        res.json({code: -99, msg: '客户名已存在'});
                        return;
                    }
                    db.Customers.findAll().then(function(customers){
                        var customers_count = customers.length;

                        var data = {
                            name: req.body.customerName,
                            phone: req.body.customerPhone,
                            location: req.body.customerPhone,
                            coding: (overseas?'PF':'PD') + year + month + (100000 + customers_count + 1 + '').substr(1)  // 生成客户编号
                        }
                        //  创建客户
                        createCustomer(data);
                    })

                    function createCustomer(data){

                        db.Customers.create(data).then(function(customer){
                            if(!customer){
                                res.json({code: -1, msg: '创建客户失败'});
                                return;
                            }

                            //  录入订单
                            saveOrder(customer.id);

                        });

                        function saveOrder(customerid){

                            orderData.customerid = customerid;

                            db.Orders.create(orderData).then(function(newOrder){
                                if(!newOrder){
                                    res.json({code: -2, msg: '创建订单失败'});
                                    return;
                                };
                                
                                // 录入订单步骤
                                saveOrdersteps(newOrder);
                            })
                        }
                    }
                })
                
            }else{
                orderData.customerid = customerid;
                //  查找客户编号，决定订单是否为海外订单
                db.Customers.findOne({
                    where: {
                        id: customerid
                    }
                }).then(function(customer){
                    if(!customer){
                        res.json({code: -4, msg: '找不到该客户'});
                        return;
                    }
                    var codeMain = customer.coding.substring(0, 2);
                    orderData.coding = codeMain + year + month + (100000 + orders_count + 1 + '').substr(1);

                    //  录入订单
                    createOrder(orderData);

                })

                function createOrder(orderData){

                    db.Orders.create(orderData).then(function(newOrder){
                        if(!newOrder){
                            res.json({code: -7, mgs: '订单录入失败'});
                            return;
                        }

                        // 录入订单步骤
                        saveOrdersteps(newOrder);
                    })
                }
            }

            function saveOrdersteps(newOrder){

                var data = {
                    orderid: newOrder.id,
                    enname: 'intention',
                    cnname: '确定意向',
                    time: new Date().Format('yyyy-MM-dd hh:mm:ss')
                }

                db.Ordersteps.create(data).then(function(Ordersteps){
                    if(!Ordersteps){
                        res.json({code: -33, msg: 'fail'});
                        return;
                    }
                    res.json({code: 0, msg: 'ok', newOrder: newOrder});
                })  
            }
        })
    });
});


//  订单未完成的状态接口
router.get('/unfinish/:id', function(req, res){

    utils.autologin(req, res, function(userid){

        var id = parseInt(req.params.id);
        db.Orders.findOne({
            where: {
                id: id
            }
        }).then(function(order){
            if(!order){
                res.json({code: -1, msg: '没有该订单'});
                return;
            };

            getUnfinish(order);

        });

        function getUnfinish(order){

            var unfinish = [];
            var steps = ['pay', 'intention', 'signpage', 'approval', 'ordered', 'deliver'];
            for(var i =0; i < steps.length; i++){
                console.log(order[steps[i]]);
                if(!order[steps[i]]){
                    unfinish.push({
                        enname: steps[i],
                        cnname: config.orderStepName[steps[i]]
                    });
                }
            }

            returndata(unfinish);
        }

        //  返回数据
        function returndata(unfinish){

            res.json({code: 0, msg: 'ok', unfinish: unfinish});

        }

    });

});

//  订单状态更新
router.post('/update', function(req, res){

    utils.autologin(req, res, function(userid){
        var result = {
            code: 0
        }
        db.Users.findOne({
            attributes: ['name', 'permission', 'type', 'position'],
            where: {
                id: userid
            }
        }).then(function(user){

            //  接收要更新的状态名称
            var id = req.body.id;
            var updateName = req.body.name;
            var situation = req.body.situation;
            var unnormal = parseInt(req.body.unnormal); 

            db.Orders.findOne({
                where: {
                    id: id
                }
            }).then(function(order){

                if(!order){
                    res.json({code:-1,msg:'没有该订单'});
                    return;
                }

                var nowstep = JSON.parse(order.nowstep)
                //  判断权限
                if((user.permission > 10 && user.permission < 20)||(updateName == 'pay'&&user.permission >2)||(updateName == 'approval'&&user.permission >2)||(updateName == 'confirm'&&user.permission !=41)||(updateName == 'signpage'&&user.permission !=30)||(updateName == 'deliver'&&user.permission !=41)){
                    res.json({code: -11, msg: '您没有该权限'});
                    return;
                }

                var data = {},situation = req.body.situation,time = new Date().Format('yyyy-MM-dd hh:mm:ss');
                var enname = config.orderStep[config.orderStep.indexOf(nowstep.enname) + 1];
                var unnormal = parseInt(req.body.unnormal);


                var stepinfo = {
                    orderid: order.id,
                    enname: enname,
                    cnname: config.orderStepName[enname],
                    time: time,
                    charger: '',
                    submiter: userid,
                    img: req.body.key,
                    status: unnormal,
                    situation: situation?situation:(!unnormal?"正常":"无说明情况")
                };

                db.Ordersteps.create(stepinfo).then(function(newstep){

                    if(!unnormal){

                        var data = {};
                        data.nowstep = JSON.stringify({
                            enname: enname,
                            cnname: config.orderStepName[enname],
                            situation: situation?situation:"正常",
                            time: time
                        });

                        if(situation){
                            var situationobj = JSON.parse(order.situation);
                            situationobj[enname] = situation;
                            data.situation = JSON.stringify(situationobj);
                        }

                        db.Orders.update(data,{
                            where: {
                                id: order.id
                            }
                        }).then(function(up){
                            res.json({code:0,msg:'订单环节变更成功'});
                        });

                    }else{
                        res.json({code:0,msg:'订单环节变更成功'});
                    };
                });
            });
        });
    });
});

//  获取只有名字没有ID的客户
router.get('/unregister_customers', function(req, res){

    utils.autologin(req, res, function(userid){

        db.Orders.findAll({
            attributes: ['customerid']
        }).then(function(orders){
            //  
            var customers = orders.filter(function(order){
                return !order.customerid.match(/\d+/);
            });
            res.json({code: 0, msg: 'ok', customers: customers});
        });

    });

});

//  录入新客户
router.post('/save_customer', function(req, res){

    utils.autologin(req, res, function(userid){

        var name = req.body.name;
        var coding = req.body.coding;
        var phone = req.body.phone;
        var location = req.body.location;

        var data = {
            name: name,
            coding: coding,
            phone: phone,
            location: location
        }

        //  查询是否存在
        db.Customers.findOne({
            where: {
                $or: [
                    {
                        name: name
                    },
                    {
                        coding: coding
                    }
                ]
            }
        }).then(function(customer){
            if(customer){
                res.json({code: -1, msg: '客户已存在'});
                return;
            }

            //  创建新客户
            db.Customers.create(data).then(function(new_customer){
                if(!new_customer){
                    res.json({code: -2, msg: '创建客户失败'});
                    return;
                }

                //  查询订单中 customerid 是名字的数据，并更新
                db.Orders.findAll({
                    where: {
                        customerid: new_customer.name
                    }
                }).then(function(orders){
                    if(!orders){
                        res.json({code: -3, msg: '没有对应的订单'});
                        return;
                    }
                    var customeridArr = [];
                    for(var i in orders){
                        customeridArr.push(orders[i].id);
                    }

                    //  更新订单中 customerid 
                    db.Orders.update({
                        customerid: new_customer.id
                    }, {
                        where: {
                            id: {
                                $in: customeridArr
                            }
                        }
                    }).then(function(update){
                        if(!update){
                            res.json({code: -4, msg: '更新失败'});
                            return;
                        };
                        res.json({code: 0, msg: 'ok'});
                    })
                })
            })
        })
    });

});

module.exports = router;