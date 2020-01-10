var express = require('express');
var router = express.Router();
var path = require("path");
var goodsServ = require(path.join(process.cwd(),"/services/GoodService"));
router.get("/qsearch",
    function(req,res,next) {
        next();
    },
    function(req,res,next) {
        goodsServ.qsearch(req.query.query,function(err,result){
            if(err) return res.sendResult(null,400,err);
            res.sendResult(result,200,"获取成功");
        })
    }
);
router.get("/search",
    // 验证参数
    function(req,res,next){
        next();
    },
    function(req,res,next) {
        var pagenum = (req.query.pagenum && req.query.pagenum > 0) ? req.query.pagenum : 1;
        var pagesize = (req.query.pagesize && req.query.pagesize > 0) ? req.query.pagesize : 20;
        var conditions = {
			"pagenum" : pagenum,
            "pagesize" : pagesize,
            "columns":{}
		};

		if(req.query.query) {
			conditions["query"] = req.query.query;
        }
        if(req.query.cid) {
            conditions["columns"]["cat_id"] = req.query.cid;
        }
        conditions["columns"]["goods_state"] = 2;

		goodsServ.getAllGoods(
			conditions,
			function(err,result){
				if(err) return res.sendResult(null,400,err);
				res.sendResult(result,200,"获取成功");
			}
		);
    }
);

router.get("/detail",
    // 验证参数
    function(req,res,next) {
        if(!req.query.goods_id) return res.sendResult(null,400,"商品ID不能为空");
        if(isNaN(parseInt(req.query.goods_id))) return res.sendResult(null,400,"商品ID必须是数字");
        next();
    },
    // 正常业务逻辑
    function(req,res,next) {
        goodsServ.getGoodById(req.query.goods_id,function(err,good) {
            if(err) return res.sendResult(null,400,err);
            return res.sendResult(good,200,"获取成功");
        })
    }
);

router.get('/goodslist',
    // 验证参数
    function(req,res,next){
        if(!req.query.goods_ids) return res.sendResult(null,400,"商品IDS不能为空");
        next();
    },
    // 正常业务逻辑
    function(req,res,next) {
        goodsServ.getGoodListByIds(req.query.goods_ids,function(err,goodslist) {
            if(err) return res.sendResult(null,400,err);
            return res.sendResult(goodslist,200,"获取成功");
        })
    }
)

module.exports = router;