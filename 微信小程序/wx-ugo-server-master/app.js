var express = require('express');
var https = require('https');
var bodyParser = require('body-parser');
var path = require("path");
var fs = require("fs");

// 路由加载
var mount = require('mount-routes');
var _ = require('lodash');
var app = express();

// 同步读取密钥和签名证书，需要自行申请SSL证书，用于开启 HTTPS 服务
var options = {
    key: fs.readFileSync('./pem/1532249811725.key'),
    cert: fs.readFileSync('./pem/1532249811725.pem')
}
var httpsServer = https.createServer(options, app);


var jwt = require("jsonwebtoken");
var jwt_config = require("config").get("jwt_config");

/**
 *
 * 公共系统初始化
 * 
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 初始化数据库模块
var database = require('./modules/database');
database.initialize(app, function(err) {
    if (err) {
        console.error("连接数据库失败失败 %s", err);
    }
});

/**
 *
 *	后台管理系统初始化
 * 
 */
// 获取管理员逻辑模块
var managerService = require(path.join(process.cwd(), "services/ManagerService"));
// 获取角色服务模块
var roleService = require(path.join(process.cwd(), "services/RoleService"));

// 设置跨域和相应数据格式
app.all('/api/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With, mytoken")
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization")
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200); /*让options请求快速返回*/
    else next()
});

// 初始化统一响应机制
var resextra = require('./modules/resextra');
app.use(resextra);

// 初始化 后台登录 passport 策略
admin_passport = require('./modules/passport');

var userServ = require(path.join(process.cwd(), "/services/UserService"));
// 设置登录模块的登录函数衔接 passport 策略
admin_passport.setup(app, managerService.login);

// 设置 passport 登录入口点
app.use("/api/private/v1/login", admin_passport.login);


var userServ = require(path.join(process.cwd(), "/services/UserService"));
app.post("/api/public/v1/login", (req, res, next) => {
    var username = req.body.username
    var password = req.body.password
    if (!username || !password) return res.sendResult(null, 400, "参数为空")
    userServ.login(username, password, function(err, user) {
        if (err) return res.sendResult(null, 400, err);

        var result = {}
        var token = jwt.sign({ "uid": user.user_id }, jwt_config.get("secretKey"), { "expiresIn": jwt_config.get("expiresIn") });
        user.token = "Bearer " + token;
        user.mobile = user.username;
        return res.sendResult(_.omit(user, "password"), 200, '登录成功');
        // jwt.verify(token, jwt_config.get("secretKey"), function (err, decode) {
        // 	if (err) { return done("验证错误"); }
        // 	return done(null, decode);
        // });
    });
});

// 设置 passport 验证路径
app.use("/api/private/v1/*", admin_passport.tokenAuth);
const client_passport = require('passport');
app.use("/api/public/v1/my/*", (req, res, next) => {
    client_passport.authenticate('bearer', { session: false }, function(err, tokenData) {
        console.log(err)
        if (err) return res.sendResult(null, 401, '无效token');
        if (!tokenData) return res.sendResult(null, 401, '无效token');
        if (tokenData["isMgr"]) return res.sendResult(null, 400, '现在是后台管理员登录，请使用正常的前台登录');
        req.userInfo = {};
        req.userInfo.uid = tokenData["uid"];
        next();
    })(req, res, next);
});
// 获取验证模块
var authorization = require(path.join(process.cwd(), "/modules/authorization"));

// 设置全局权限
authorization.setAuthFn(function(req, res, next, serviceName, actionName, passFn) {
    if (!req.userInfo || isNaN(parseInt(req.userInfo.rid))) return res.sendResult("无角色ID分配");
    // 验证权限
    roleService.authRight(req.userInfo.rid, serviceName, actionName, function(err, pass) {
        passFn(pass);
    });
});




/**
 *
 * public 客户端验证
 * 
 */

/*
const client_passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Strategy = require('passport-http-bearer').Strategy;
var userServ = require(path.join(process.cwd(),"/services/UserService"));
var jwt = require("jsonwebtoken");
var jwt_config = require("config").get("jwt_config");
// 用户名密码 登录策略
client_passport.use(new LocalStrategy(
	function(username, password, done) {
		userServ.login(username,password,function(err,user) {
			if(err) return done(err);
			return done(null, user);
		});
	})
);
// token 验证策略
client_passport.use(new Strategy(
	function(token, done) {
		jwt.verify(token, jwt_config.get("secretKey"), function (err, decode) {
			if (err) { return done("验证错误"); }
			return done(null, decode);
		});
	}
 ));
app.use(client_passport.initialize());

// 登录入口
app.use("/api/public/v1/login",function(req,res,next){

	client_passport.authenticate('local', function(err, user, info) {
		if(err) return res.sendResult(null,400,err);
		if(!user) return res.sendResult(null,400,"参数错误");
		// 获取角色信息
		var token = jwt.sign({"uid":user.user_id}, jwt_config.get("secretKey"), {"expiresIn": jwt_config.get("expiresIn")});
		user.token = "Bearer " + token;
		user.mobile = user.username;
		return res.sendResult(_.omit(user,"password"),200,'登录成功');
	})(req,res,next);
})

 // token 验证
app.use("/api/public/v1/my/*",function(req,res,next){
	client_passport.authenticate('bearer', { session: false },function(err,tokenData) {
		if(err) return res.sendResult(null,400,'无效token');
		if(!tokenData) return res.sendResult(null,400,'无效token');
		console.log("tokenData:%s",tokenData.uid);
		req.userInfo = {};
		req.userInfo.uid = tokenData["uid"];
		next();
	})(req, res, next);
});
*/

/**
 *
 * 初始化路由
 * 
 */
// 带路径的用法并且可以打印出路有表
mount(app, path.join(process.cwd(), "/routes"), true);

// 富文本
app.all('/ueditor/ue', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With, mytoken")
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization")
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With, X_Requested_With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200); /*让options请求快速返回*/
    else next()
});

// 富文本编辑器上传
var ueditor = require(path.join(process.cwd(), "/modules/ueditor"));
// 富文本控件处理请求
app.use("/ueditor/ue", ueditor);



app.use('/tmp_uploads', express.static('tmp_uploads'));
app.use('/x/common', express.static('uploads/common'));
app.use('/uploads/goodspics', express.static('uploads/goodspics'));

var upload_config = require('config').get("upload_config");
app.use("/" + upload_config.get("upload_ueditor"), express.static(upload_config.get("upload_ueditor")));

// 设置分类图标路径
app.use("/full", express.static('full'));

// 设置首页图片
app.use("/pyg", express.static('pyg'));

// 设置html页面路径
app.use("/html", express.static('html'));

// 定义日志
// var log4js = require('./modules/logger');
// log4js.use(app);

/**
 *
 * 统一处理无响应
 * 
 */
// 如果没有路径处理就返回 Not Found
app.use(function(req, res, next) {
    res.sendResult(null, 404, "Not Found");
});

//处理微信服务器发送过来的支付反馈
app.get('/orders/notifiy', (req, res) => {
    console.log(`收到微信服务器发送过来的支付反馈GET，请求参数如下`)
    console.log(req.query)
    console.log(req.params)
    res.end("OK")
})

app.post('/orders/notifiy', (req, res) => {
    console.log(`收到微信服务器发送过来的支付反馈POST，请求参数如下`)
    console.log(req.body)
    res.end("OK")
})

// https监听443端口
httpsServer.listen(443, err => {
        if (err) {
            console.log(err)
        }
        console.log(`启动https成功! 检查数据 https://你的域名/api/public/v1/home/swiperdata`)
})

// 本地调试测试端口
// app.listen(8888, err => {
//     if (err) {
//         console.log(err)
//     }
//     console.log(`启动http成功! 检查数据 http://127.0.0.1:8888/api/public/v1/home/swiperdata`)
// })


module.exports = app;