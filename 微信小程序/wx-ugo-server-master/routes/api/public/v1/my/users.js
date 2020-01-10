var express = require('express');
var router = express.Router();
var path = require("path");
var userServ = require(path.join(process.cwd(),"/services/UserService"));

router.get("/userinfo",
    function(req,res,next){
        next();
    },
    function(req,res,next){
        userServ.getUserInfo(req.userInfo.uid,function(err,user){
            if(err) return res.sendResult(null,400,err);
            if(!user) return res.sendResult(null,400,"用户信息为空");
            return res.sendResult(user,200,"获取用户信息成功");
        });
    }
);
module.exports = router;