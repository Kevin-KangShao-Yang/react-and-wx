var _ = require('lodash');
var path = require("path");
var dao = require(path.join(process.cwd(),"dao/DAO"));
var Promise = require("bluebird");
var Password = require("node-php-password");



// 验证码生成
function generateCode() {
	return ("0000"+Math.ceil(Math.random()*10000)).slice(-4);
}

// 检查表单参数
function doCheckRegParams(params) {
	return new Promise(function(resolve,reject) {
		var mobile = params["mobile"] ? params["mobile"].trim() : "";
		var code =  params["code"] ? params["code"].trim() : "";
		var email = params["email"] ? params["email"].trim() : "";
		var pwd = params["pwd"] ? params["pwd"].trim() : "";
		var gender = params["gender"] ? params["gender"].trim() : "";
		
		if(code.length != 4) {
			return reject("验证码格式不正确");
		}

		if(email.length == 0) {
			return reject("邮箱不能为空");
		}

		var emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/i;
		if(!emailRegex.test(email)) {
			return reject("邮箱格式不正确");
		}

		if(pwd.length == 0) {
			return reject("密码不能为空");
		}
		var newparams = {
			"mobile" : mobile,
			"email" : email,
			"code" : code,
			"pwd" : pwd,
			"gender" : gender
		}
		resolve(newparams);
	});

	
}

// 检查用户是否已存在
function doCheckUserExist(params) {
	return new Promise(function(resolve,reject) {
		dao.exists(
			"UserModel",
			{
				"username":params.mobile
			},
			function(err,isExist) {
				if(err) return reject(err);
				if(isExist) return reject("用户已存在");
				resolve(params);
			}
		);
	});
	
}

// 获取用户信息
function doGetUserInfo(uid) {
	return new Promise(function(resolve,reject) {
		dao.findOne("UserModel",{"user_id":uid},function(err,user){
			if(err) return reject(err);
			if(!user) return reject("用户不存在");
			resolve(user);
		})
		// dao.exists(
		// 	"UserModel",
		// 	{
		// 		"username":params.mobile
		// 	},
		// 	function(err,isExist) {
		// 		if(err) return reject(err);
		// 		if(isExist) return reject("用户已存在");
		// 		resolve(params);
		// 	}
		// );
	});
}

// 检查验证码是否正确
function doCheckRegCode(params) {
	return new Promise(function(resolve,reject) {
		dao.findOne("MobileCodeModel",{"mobile":params.mobile,"type":1},function(err,mobileCode){
			if(err) return reject(err);
			if(!mobileCode) return reject("无效验证码");
			var second = Math.ceil((new Date() - mobileCode.expires_time) / 1000);
			if(second > 60) {
				return reject("验证码已过期");
			}
			if(params.code != mobileCode.code) {
				return reject("验证码不一致");
			}

			resolve(params);
		});
	});
}
// 执行注册操作
function doRegisterUser(params) {
	return new Promise(function(resolve,reject) {
		dao.create(
			"UserModel",
			{
				"username":params.mobile,
				"qq_open_id":"",
				"password":Password.hash(params.pwd),
				"user_email":params.email,
				"user_email_code":generateCode(),
				"is_active": "否",
				"user_sex":params.gender,
				"user_qq":"",
				"user_tel":params.mobile,
				"user_xueli":"本科",
				"user_hobby":"",
				"create_time":(Date.parse(new Date())/1000),
				"update_time":(Date.parse(new Date())/1000)
			},
			function(err,user) {
				console.log(err);
				if(err) return reject("注册失败");
				resolve(user);
			}
		)
	});
}

// 用户登录
module.exports.login = function(mobile,password,cb) {
	
	dao.findOne("UserModel",{"username":mobile},function(err,user) {
		if(err || !user) return cb("用户名不存在");
		if(Password.verify(password, user.password)){
			cb(
				null,
				user
			);
		} else {
			return cb("密码错误");
		}
	});
}

// 用户注册
module.exports.register = function(params,cb) {
	doCheckRegParams(params)
	.then(doCheckUserExist)
	.then(doCheckRegCode)
	.then(doRegisterUser)
	.then(function(){
		cb(null,"注册成功");
	})
	.catch(function(err) {
		console.log(err);
		cb(err);
	});
}

// 获取验证码
module.exports.getRegCode = function(mobile,cb) {
	if(!mobile || mobile.trim().length == 0){
		return cb("手机号不能为空");
	}
	var mobileRegex = /^1[0-9]{10}/;
	if(!mobileRegex.test(mobile)) {
		return cb("手机号格式不正确");
	}
	dao.findOne("MobileCodeModel",{"mobile":mobile,"type":1},function(err,mobileCode){
		if(err) return cb(err);
		if(mobileCode) {
			var second = Math.ceil((new Date() - mobileCode.expires_time) / 1000);
			if(second > 60) {
				// 过期重新发送验证
				mobileCode.save({
					"code":generateCode(),
					"expires_time":new Date()
				},function(err,newMobileCode){
					if(err) return cb("获取验证码失败");
					cb(null,newMobileCode.code);
				});
			} else {
				cb(null,mobileCode.code);
			}
		} else {
			// 如果没有保存验证码就创建保存
			dao.create(
				"MobileCodeModel",{
					"mobile":mobile,
					"code":generateCode(),
					"type":1,
					"expires_time":new Date()
				},
				function(err,mobileCode) {
					if(err) return cb(err);
					cb(null,mobileCode.code);
				}
			)
		}
	});
}

// 获取用户信息
module.exports.getUserInfo = function(uid,cb) {
	doGetUserInfo(uid)
	.then(function(user){
		cb(null,_.omit(user,"password","is_active","qq_open_id"));
	})
	.catch(function(err) {
		cb(err);
	});
}


// 创建获取生成
module.exports.findOneOrCreate = function(openid,unionid,session_key,cb) {
	
	// 判断如果有unionid 通过 unionid 绑定，如果没有走 openid绑定
	if(unionid && unionid != '') {
		dao.findOne("UserModel",{wx_union_id:unionid},function(err,user) {
			// 创建或者更新
			if(err) return cb(err);
			if(user) {
				// 更新
				user.save(
					{
						"wx_session_key":session_key
					},
					(err,newuser)=>{
						if(err) return cb(err);
						return cb(null,newuser)
					}
				)
			} else {
				dao.create(
					"UserModel",
					{
						username:"",
						password:"",
						user_email:"",
						user_sex:"男",
						user_qq:"",
						user_tel:"",
						user_xueli:"本科",
						user_hobby:"",
						create_time:(Date.parse(new Date())/1000),
						update_time:(Date.parse(new Date())/1000),
						wx_union_id:unionid,
						wx_session_key:session_key
					},
					(err,user) => {
						if(err) return cb(err);
						return cb(null,user)
					}
				)
			}
		})
	} else {
		dao.findOne("UserModel",{wx_open_id:openid},function(err,user) {
			if(err) return cb(err);
			if(user) {
				// 更新
				user.save(
					{
						"wx_session_key":session_key
					},
					(err,newuser)=>{
						if(err) return cb(err);
						return cb(null,newuser)
					}
				)
			} else {
				dao.create(
					"UserModel",
					{
						username:"",
						password:"",
						user_email:"",
						user_sex:"男",
						user_qq:"",
						user_tel:"",
						user_xueli:"本科",
						user_hobby:"",
						create_time:(Date.parse(new Date())/1000),
						update_time:(Date.parse(new Date())/1000),
						wx_open_id:openid,
						wx_session_key:session_key
					},
					(err,user) => {
						if(err) return cb(err);
						return cb(null,user)
					}
				)
			}
		})
	}
	
}




