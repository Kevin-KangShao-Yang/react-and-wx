var _ = require('lodash');
var path = require("path");
var Promise = require("bluebird");
var dao = require(path.join(process.cwd(),"dao/DAO"));


// 判断购物车是否存在
function doIsExistUserCartInfoByUid(uid) {
    return new Promise(function(resolve,reject) {
        dao.exists(
			"UserCartModel",
			{
				"user_id":uid
			},
			function(err,isExist) {
				if(err) return reject(err);
				resolve(isExist);
			}
		);
    });
}

// 创建用户购物车
function doCreateUserCartByUid(uid) {
    return new Promise(function(resolve,reject) {
        dao.create("UserCartModel",{
            "user_id":uid,
            "cart_info":"",
            "created_at":new Date(),
            "updated_at":new Date()
        },function(err,userCart){
            if(err) return reject(err);
            resolve(userCart);
        })
    });
}

// 获取用户购物车
function doGetUserCartInfoByUid(uid) {
    return new Promise(function(resolve,reject) {
        dao.findOne("UserCartModel",{"user_id":uid},function(err,userCart){
            if(err) return reject("获取用户购物车失败");
            if(!userCart) {
                return reject("用户购物车不存在");
            }
            resolve(userCart);
        })
    });
}

// 为用户添加购物记录
function doAppendInfo(userCart,infoString) {
    return new Promise(function(resolve,reject) {
        var jsonData = {};
        if(userCart.cart_info && userCart.cart_info != "") {
            jsonData = JSON.parse(userCart.cart_info);
        }
        var info = JSON.parse(infoString);
        if(info && info.goods_id) {
            if(jsonData[info.goods_id]) {
                jsonData[info.goods_id].amount = jsonData[info.goods_id].amount + 1;
            } else {
                jsonData[info.goods_id] = info;
                jsonData[info.goods_id].amount = 1;
            }
        }
        userCart.cart_info = JSON.stringify(jsonData);
        userCart.save({"cart_info":JSON.stringify(jsonData)},function(err,userCart){
            if(err) return reject(err);
            resolve(userCart);
        });
    });
}

function doSyncInfos(userCart,infosString) {
    return new Promise(function(resolve,reject) {
        var infos = {};
        
        if(infosString != "") {
            infos = JSON.parse(infosString);
        }
        userCart.save(
            {
                "cart_info":JSON.stringify(infos),
                "updated_at":new Date()
            },
            function(err,userCart){
            if(err) return reject(err);
            resolve(userCart);
        });
    });
}

// 添加购物车
module.exports.addInfo = function(uid,info,cb) {
    doIsExistUserCartInfoByUid(uid)
    .then(function(isExist){
        if(!isExist) {
            return doCreateUserCartByUid(uid);
        } else {
            return doGetUserCartInfoByUid(uid);
        }
    })
    .then(function(userCart){
        return doAppendInfo(userCart,info);
    })
    .then(function(userCart){
        cb(null,userCart);
    })
    .catch(function(err) {
        console.log("err:",err);
		cb(err);
	});
}

// 同步购物车
module.exports.syncInfos = function(uid,infos,cb) {
    doIsExistUserCartInfoByUid(uid)
    .then(function(isExist){
        if(!isExist) {
            return doCreateUserCartByUid(uid);
        } else {
            return doGetUserCartInfoByUid(uid);
        }
    })
    .then(function(userCart){
        return doSyncInfos(userCart,infos);
    })
    .then(function(userCart){
        cb(null,userCart);
    })
    .catch(function(err) {
        console.log("err:",err);
		cb(err);
	});
}

// 获取购物车
module.exports.getMyCart = function(uid,cb) {
    doIsExistUserCartInfoByUid(uid)
    .then(function(isExist){
        if(!isExist) {
            return doCreateUserCartByUid(uid);
        } else {
            return doGetUserCartInfoByUid(uid);
        }
    })
    .then(function(userCart){
        cb(null,userCart);
    })
    .catch(function(err) {
        console.log("err:",err);
		cb(err);
	});
}