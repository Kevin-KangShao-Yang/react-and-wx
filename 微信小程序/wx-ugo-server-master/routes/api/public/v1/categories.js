var express = require('express');
var router = express.Router();
var path = require("path");

var catServ = require(path.join(process.cwd(),"/services/CategoryService"));

router.get("/",
    // 参数验证
    function(req,res,next){
        next();
    },
    // 业务逻辑
    function(req,res,next) {
        catServ.getAllCategories(3,null,function(err,result){
            if(err) return res.sendResult(null,400,"获取分类列表失败");
            res.sendResult(result,200,"获取成功");
        })
    }
);

module.exports = router;
