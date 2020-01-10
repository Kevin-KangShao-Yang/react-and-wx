var express = require('express');
var router = express.Router();
var path = require("path");
var userCartServ = require(path.join(process.cwd(),"/services/CartService"));

router.post("/add",
    function(req,res,next){
        next();
    },
    function(req,res,next){
        userCartServ.addInfo(req.userInfo.uid,req.body.info,function(err,userCart){
            if(err) return res.sendResult(null,400,"添加购物车失败");
            return res.sendResult(userCart,200,"添加购物车成功");
        });
    }
);

router.post("/sync",
    function(req,res,next) {
        next();
    },
    function(req,res,next) {
        userCartServ.syncInfos(req.userInfo.uid,req.body.infos,function(err,userCart){
            if(err) return res.sendResult(null,400,"同步更新失败");
            return res.sendResult(userCart,200,"同步更新成功");
        });
    }
);

router.get("/all",
    function(req,res,next) {
        next();
    },
    function(req,res,next) {
        userCartServ.getMyCart(req.userInfo.uid,function(err,userCart){
            if(err) return res.sendResult(null,400,"获取失败");
            return res.sendResult(userCart,200,"获取成功");
        });
    }
);
module.exports = router;