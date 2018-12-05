var express = require('express');
var router = express.Router();
var db = require('./model');
var utils = require('./utils');
var config = require('../config/config');
var moment = require('moment');
var posts = utils.getposts();

// 产品列表
router.get('/lists',function(req, res){

    var result = {
        code: 0
    };

    utils.autologin(req, res, function(userid){

        db.Users.findOne({
            attributes: ['name','permission','type','position'],
            where: {
                id: userid
            }
        }).then(function(user){

            if(!user){
                res.json({code: -1, msg: 'No such user'});
                return;
            };

            user = JSON.parse(JSON.stringify(user));
            user.post = posts[user.type];

            result.user = user;

            if(user.permission > 20){//市场工作人员
                returndate([]);
                return;
            }

            getListsData(user);
        });
    });

    function getListsData(user) {

        var page = parseInt(req.query.page)?parseInt(req.query.page):1;
        var limit = 20;

        var map = {
            limit: limit,
            offset:(page-1)*limit,
        };

        if(req.query.search){
            map.where = { 
                coding: {
                    $like: "%"+req.query.search+"%"
                }
            }
        }
        
        db.Products.findAll(map).then(function(lists){

            if(!lists){
                res.json({code: -2, msg: 'Failed'});
                return;
            }

            lists = JSON.parse(JSON.stringify(lists));

            distrib(lists);
        });
    }

    function distrib(lists) {

        var situation;
        
        for(var i in lists){

            lists[i].deliverdate = 0;
            lists[i].nowstep = JSON.parse(lists[i].nowstep);

            situation = JSON.parse(lists[i].situation);

            for(var j in lists[i]){

                if(config.steps.indexOf(j)!=-1){   

                    if(!lists[i][j]){
                    //     lists[i].nowstep = {
                    //         enname: j,
                    //         cnname: config.stepname[j],
                    //         situation: situation[j]?situation[j]:"正常",
                    //         time: lists[i][j]
                    //     }
                    // }else{
                        lists[i].deliverdate += config.stepdate[j];
                    }
                    
                    lists[i][j] = undefined;
                }
            }
            lists[i].deliverdate = parseInt(lists[i].deliverdate*10)/10;
        }

        if(result.user.type == 7){//如果是生产岗位负责人，去掉非到岗设备信息
            var newlists = [], positions = JSON.parse(result.user.position);
            for(var i in lists){
                for(var j in positions){
                    if(lists[i].nowstep.enname == config.steps[config.steps.indexOf(positions[j]) - 1]||lists[i].nowstep.enname == positions[j])
                        newlists.push(lists[i]);
                }
            }
            // lists = lists.filter(function(list){
            //     return list.nowstep.enname == config.steps[config.steps.indexOf(result.user.position) - 1]||list.nowstep.enname == result.user.position;
            // })
            returndate(newlists);
        }else{
            returndate(lists);
        }
    }

    function returndate(lists){
        result.lists = lists;
        res.json(result);
    }
});



// 产品更新
router.get('/save/data',function(req, res){

    utils.autologin(req, res, function(userid){
        
        var result = {};

        result.producers = config.producers;
        console.log(config.producers);

        db.Orders.findAll({
            attributes: ['id', 'coding'],
            where: {
                deliver: {
                    $ne: ''
                }
            }
        }).then(function(orders){
            
            result.orders = orders;
            res.json(result);
        });
    });
});

router.get('/test', function(req, res){
    res.json(new Date().Format('yyyy-MM-dd hh:mm:ss'));
})

router.post('/save', function(req, res){
    
    utils.autologin(req, res, function(userid){

        var coding = req.body.coding;

        db.Products.findOne({
            where: {
                coding: coding
            }
        }).then(function(product){
            
            if(product){
                res.json({code:-1,msg:'已存在该型号的生产信息'});
                return;
            }

            var date = new Date(req.body.date).Format('yyyy-MM-dd hh:mm:ss')
            var data = {
                coding: coding,
                producer: req.body.producer,
                orderid: req.body.orderid,
                nowstep: JSON.stringify({
                    enname: config.steps[0],
                    cnname: config.stepname[config.steps[0]],
                    situation: '正常',
                    time: date
                }),
                startassemble: date
            }

            db.Products.create(data).then(function(newproduct){

                newproduct.nowstep = JSON.parse(newproduct.nowstep);
                newproduct.deliverdate = 0;

                for(var i in config.stepdate){
                    newproduct.deliverdate += config.stepdate[i];
                }

                for(var i in newproduct){
                    if(config.steps.indexOf(i)!=-1){
                        newproduct[i] = undefined;
                    }
                }

                res.json({code:0,msg:'添加成功',product:newproduct});
            });
        })
    });
});

// 产品录入
// router.post('/save',function(){

// });


router.get('/:id', function(req, res){
    
    var id = parseInt(req.params.id);

    if(isNaN(id)){
        res.json({code:-1,msg:'参数不对'});
        return;
    }

    var result = {};

    utils.autologin(req, res, function(userid){
        
        db.Users.findOne({
            attributes: ['name','permission','type','position'],
            where: {
                id: userid
            }
        }).then(function(user){

            result.user = user;

            getProductInfo();
        });
    });

    function getProductInfo(){

        var map = {
            id: id
        };

        // if(result.user.type == 7){
        //     //查找到岗设备
        //     map.nowstep = {
        //         $like: '%' + config.steps[config.steps.indexOf(result.user.position) - 1] + '%'
        //     }
        // }
        
        db.Products.findOne({
            where: map
        }).then(function(product){

            if(!product){
                res.json({code:-1,msg:'无该设备生产信息'});
                return;
            }

            var product = JSON.parse(JSON.stringify(product));
            product.nowstep = JSON.parse(product.nowstep);
            product.situation = JSON.parse(product.situation);

            // if(result.user.type == 7&&product.nowstep.enname != config.steps[config.steps.indexOf(result.user.position) - 1]){
            //     res.json({code:-2,msg:'您无权查看该作品'});
            //     return;
            // }

            var steps = [];

            for(var i in product){
                if(config.steps.indexOf(i)!=-1){   
                    if(product[i]){
                        steps.push({
                            code: 0,
                            name: config.stepname[i],
                            time: product[i],
                            situation: product.situation[i]?product.situation[i]:'正常'
                        });
                    }else{
                        steps.push({
                            code: -1,
                            name: config.stepname[i]
                        });
                    }
                    product[i] = undefined;
                }
            }

            var deliverdate = 0;

            result.nowstep = product.nowstep;
            var nextstep = config.steps[config.steps.indexOf(product.nowstep.enname) + 1];
            result.nextstep = {
                enname: nextstep?nextstep:'',
                cnname: nextstep?config.stepname[nextstep]:''
            };
            product.isdone = product.nowstep.enname == config.steps[config.steps.length-2];
            product.nowstep = undefined;
            product.situation = undefined;
            result.product = product;
            result.steps = steps;
            getcustomer();
        });
    }

    function getcustomer(){
        
        db.Orders.findOne({
            attributes: ['id','coding','customerid'],
            where: {
                id: result.product.orderid
            }
        }).then(function(order) {
            
            db.Customers.findOne({
                attributes: ['id','coding','name','logo'],
                where: {
                    id: order.customerid
                }
            }).then(function(customer) {
                
                result.customer = customer;
                res.json(result);
            });
        })
    }
});


module.exports = router;