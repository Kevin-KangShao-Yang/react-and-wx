var express = require('express');
var router = express.Router();
var path = require("path");
var orderServ = require(path.join(process.cwd(),"/services/OrderService"));
var userCartServ = require(path.join(process.cwd(),"/services/CartService"));

router.post("/create",
    function(req,res,next) {
        next();
    },
    function(req,res,next) {
        var params = req.body;
        params.user_id = req.userInfo.uid;
        orderServ.createOrder(params,function(err,newOrder){
            userCartServ.syncInfos(req.userInfo.uid,"",function(userCartErr){
                
                if(err) return res.sendResult(null,400,err);
                return res.sendResult(newOrder,200,"创建订单成功");
            })
		})
    }
);

router.get("/all2",
    function(req,res,next) {
        next();
    },
    function(req,res,next) {
        var type=req.query.type ? req.query.type : 1;
        var uid = req.userInfo.uid;
        var params = {};
        params.user_id = uid;


        if(type == 2) {
            params.is_send = '否';
            params.pay_status = '0';
        }
        if(type == 3) {
            params.is_send = '否';
            params.pay_status = '1';
        }

        orderServ.simpleOrders(params,function(err,orders){
            if(err) return res.sendResult(null,400,err);
            return res.sendResult(orders,200,"获取订单列表成功");
        })
    }
);

router.post("/req_unifiedorder",
    function(req,res,next) {
        if(!req.body.order_number) return res.sendResult(null,400,"支付订单不能为空")
        next()
    },
    function(req,res,next) {
        var uid = req.userInfo.uid
        orderServ.reqUnifiedOrder(uid,req.body.order_number,function(err,unifiedOrder) {
            if(err) return res.sendResult(null,400,err);
            return res.sendResult(unifiedOrder,200,"预付订单生成成功");
        })
    }

);

router.post("/chkOrder",
    function(req,res,next) {
        if(!req.body.order_number) return res.sendResult(null,400,"支付订单不能为空")
        next()
    },
    function(req,res,next) {
        var uid = req.userInfo.uid
        orderServ.chkOrder(uid,req.body.order_number,function(err,result) {
            if(err) return res.sendResult(null,400,err);
            return res.sendResult(result,200,"验证成功");
        })
    }

);

//分页查询订单信息
router.get("/all",
    function(req,res,next) {
        next();
    },
    function(req,res,next) {
        //类型:1:全部  2:未付款  3:已支付  4:退货/退款
        var type=req.query.type ? req.query.type : 1;
        //页码
        const pageIndex = req.query.pageIndex ? parseInt(req.query.pageIndex) : 1
        //页容量
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10
        var uid = req.userInfo.uid;
        var params = {};
        params.user_id = uid;
        params.pageIndex = pageIndex
        params.pageSize = pageSize
        params.type = type
        
        if(type == 2) {
            params.is_send = '否';
            params.pay_status = '0';
        }
        if(type == 3) {
            params.is_send = '否';
            params.pay_status = '1';
        }
        
        if(type == 4){
            params.is_send = '否';
            params.pay_status = '2';
        }

        orderServ.getOrderList(params,function(err,ordersInfo){
            if(err) return res.sendResult(null,400,err);
            return res.sendResult(ordersInfo,200,"获取订单列表成功");
        })
    }
);

module.exports = router;
