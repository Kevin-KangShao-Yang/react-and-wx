var express = require('express');
var router = express.Router();
var path = require("path");
const sha1 = require('node-sha1')
var userServ = require(path.join(process.cwd(), "/services/UserService"));
var wxsdk = require(path.join(process.cwd(), "/modules/wxsdk"))
var config = require(path.join(process.cwd(), "/config/wxconfig"))
var jwt = require("jsonwebtoken");
var jwt_config = require("config").get("jwt_config")
var _ = require('lodash');
router.post("/reg",
    // 验证参数
    function(req, res, next) {
        var mobile = req.body.mobile;
        if (!mobile || mobile.trim().length == 0) {
            return res.sendResult(null, 400, "手机号不能为空");
        }
        var mobileRegex = /^1[0-9]{10}/;
        if (!mobileRegex.test(mobile)) {
            return res.sendResult(null, 400, "手机号格式不正确");
        }
        var code = req.body.code;
        if (!code || code.trim().length != 4) {
            return res.sendResult(null, 400, "验证码格式不正确");
        }

        var email = req.body.email;
        if (!email || email.trim().length == 0) {
            return res.sendResult(null, 400, "邮箱不能为空");
        }
        var emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/i;
        if (!emailRegex.test(email)) {
            return res.sendResult(null, 400, "邮箱格式不正确");
        }
        var pwd = req.body.pwd;
        if (!pwd || pwd.trim().length == 0) {
            return res.sendResult(null, 400, "密码不能为空");
        }
        var gender = req.body.gender;
        if (!gender || gender.trim().length == 0) {
            return res.sendResult(null, 400, "性别不能为空");
        }
        next();
    },
    // 正常业务逻辑
    function(req, res, next) {
        userServ.register({
            "mobile": req.body.mobile.trim(),
            "code": req.body.code.trim(),
            "email": req.body.email.trim(),
            "pwd": req.body.pwd.trim(),
            "gender": req.body.gender.trim()
        }, function(err) {
            if (err) return res.sendResult(null, 400, err);
            return res.sendResult(null, 200, "注册成功");
        });
    }
);
router.post("/get_reg_code",
    // 验证参数
    function(req, res, next) {
        var mobile = req.body.mobile;
        if (!mobile || mobile.trim().length != 11) {
            return res.sendResult(null, 400, "手机号不能为空");
        }
        var mobileRegex = /^1[0-9]{10}/;
        console.log(mobile);
        if (!mobileRegex.test(mobile)) {
            return res.sendResult(null, 400, "手机号格式不正确");
        }
        next();
    },
    // 正常业务逻辑
    function(req, res, next) {
        userServ.getRegCode(req.body.mobile, function(err, code) {
            if (err) return res.sendResult(null, 400, err);
            return res.sendResult(code, 200, "获取成功");
        });
    }
);
router.post("/wxlogin",
    function(req, res, next) {
        // 从客户端提供的code
        const { code, iv, encryptedData, signature, rawData } = req.body
        if (!code || !signature || !rawData || !encryptedData || !iv) return res.sendResult(null, 400, "缺少必要参数")
        next()
    },
    function(req, res, next) {
        const { code, iv, encryptedData, signature, rawData } = req.body
            // 通过客户端的 code 获取用户信息（openid + session_key）

        wxsdk.getWxWXMPOpenid(config.AppID, config.AppSecret, code)
            .then(wxUserInfo => {
                if (!wxUserInfo) return res.sendResult(null, 400, "服务器端获取 openid + session_key 失败")
                let { openid, session_key, unionid } = wxUserInfo
                if (!openid || !session_key) return res.sendResult(null, 400, "获取用户信息失败")

                // 验证用户数据从未被篡改 -----  这里导致用户需要点击两次??
                // const signature2 = sha1(`${rawData}${session_key}`)
                // if (signature != signature2) {
                //     return res.sendResult(null, 400, "登录数据验证失败")
                // }

                const clientUserInfo = JSON.parse(rawData)
                const nickname = clientUserInfo.nickName
                const avatar_url = clientUserInfo.avatar_url

                // 解密加密数据，验证数据
                const decodedData = wxsdk.decryptData(config.AppID, session_key, encryptedData, iv)

                if (decodedData && decodedData.watermark && decodedData.watermark.appid != config.AppID) return res.sendResult(null, 400, '登录失败')

                // 业务查询用户id关联openid并且保存openid和 session_key

                userServ.findOneOrCreate(openid, unionid, session_key, (err, user) => {
                    if (err) return res.sendResult(null, 400, "关联账户失败")

                    // 获取角色信息
                    var token = jwt.sign({ "uid": user.user_id }, jwt_config.get("secretKey"), { "expiresIn": jwt_config.get("expiresIn") });
                    user.token = "Bearer " + token;
                    return res.sendResult(_.omit(user, "wx_open_id", "wx_session_key", "wx_union_id", "password", "username", "user_email", "qq_open_id"), 200, '登录成功');
                })

            })
            .catch(err => {
                console.log(err)
                res.sendResult(null, 400, err + "")
            })


    }
)
module.exports = router;