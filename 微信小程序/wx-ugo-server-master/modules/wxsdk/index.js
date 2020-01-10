
const path = require('path')
const md5 = require('md5')
const WXBizDataCrypt = require('./WXBizDataCrypt.js')
const xml2js = require('xml2js')
const xmlParser = require('xml2js-parser')

// 引入请求模块
const Request = require('request-promise')

/**
 * 
 * 签名生成算法
 * 
 * @param {Object} params 参数
 * @param {*} payKey 支付密钥
 */
function wxsign(params,payKey) {

    console.log("wxsign:",arguments)

    var querystring =
    // 获取所有的 key
     Object.keys(params)
     // 通过过滤函数把不需要的字段过滤
     .filter(key => {
		return params[key] !== undefined && params[key] !== '' && ['sign'].indexOf(key)<0;
    }).
    // 对所有Key进行排序
    sort().
    // 让所有的项的key转换成 `key = val` 结果
    map(key => {
		return key + '=' + params[key];
    }).
    // 1. 把数组合并成字符串并且以 & 符号连接
    // 2. 把加密key追加到字段之后
    join("&") + "&key=" + payKey;
	return md5(querystring).toUpperCase();
}

/**
 * 请求微信服务器通过 code 换取 session_key 和 open_id
 * 
 * @param {String} appId 微信提供的 appId
 * @param {String} appSecret 微信提供的 appSecret
 * @param {String} code 小程序端 wx.wxlogin() 获取的 code
 */
async function getWxWXMPOpenid(appId,appSecret,code) {
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`

    let result = await Request.get(url)
    let session = JSON.parse(result)
    if(session['session_key'] && session['openid']) {
        console.log("session:",session)
        return session
    }
    if(session['errcode'] && session['errmsg']) {
        throw new Error(session['errmsg'])
    }
    throw new Error('session is null')
}

/**
 * 解密加密数据
 * 
 * @param {String} appId 微信提供的 appId
 * @param {String} sessionKey 通过 code 换取的 session_key
 * @param {String} encryptedData 加密后的数据
 * @param {String} iv 加密向量
 */
function decryptData(appId, sessionKey, encryptedData, iv) {
    const dataCrypt = new WXBizDataCrypt(appId,sessionKey)
    return dataCrypt.decryptData(encryptedData,iv)
}


/**
 * 
 * 向微信请求预付订单
 * 
 * @param {String} AppId 应用ID
 * @param {String} MchId 商户ID
 * @param {String} PayKey 支付密钥
 * @param {String} openid 用户openid
 * @param {String} order_number 订单流水号
 * @param {Number} total_fee 价格
 * @param {String} body 商品详情
 * @param {String} notifiy_url 支付通知地址
 */
async function reqWXUnifiedorder(AppId,MchId,PayKey,openid,out_trade_no,total_fee,body,notifiy_url) {
    /* 支付参数 */
    const params = {
        appid:  AppId,                                              // 小程序ID
        mch_id: MchId,                                              // 商户号
        nonce_str: md5(Date.now()+"mmis"),                          // 随机数
        body: body,                                                 // 商品描述
        out_trade_no: out_trade_no,                                 // 订单号
        total_fee: total_fee,                                       // 价格
        spbill_create_ip: '127.0.0.1',                              // IP
        notify_url: notifiy_url,                                    // 支付成功通知地址
        trade_type: 'JSAPI',                                        // 支付方式
        openid: openid                                              // 用户ID
    }
    /* 通过签名生成算法进行签名 */
    params['sign'] = wxsign(params,PayKey)
    /* 创建xml构建对象 */
    let builder = new xml2js.Builder()
    /* 通过params转换成xml请求对象 */
    let reqXML = builder.buildObject(params)
    /* 向微信商户平台发起请求获取预付订单 */
    try {
        let resultXML = await Request.post({
            method:'post',
            url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
            body: reqXML,
            agentOptions: {
                passphrase: params.mch_id
            }
        })
        if(resultXML) {
            /* 解析结果并且构建预付订单对象 */
            let result = xmlParser.parseStringSync(resultXML,{ trim:true, explicitArray:false, explicitRoot:false})
            
            if(result && result['result_code'] == 'SUCCESS') {
                const timeStamp = (Math.ceil(Date.now() / 1000))+''
                const nonceStr = result.nonce_str
                const package = `prepay_id=${result.prepay_id}`
                const signType = 'MD5'
                let wxmporder = {
                    appId:AppId,
                    timeStamp:timeStamp,
                    nonceStr:nonceStr,
                    package:package,
                    signType:signType
                }
                wxmporder.paySign = wxsign(wxmporder,PayKey)
                return wxmporder
            } else {
                // console.log("reqWXUnifiedorder:",result)
                return result
            }
        }
    } catch (error) {
        throw error
    }
    throw new Error("创建预付订单失败")
}

/**
 * 
 * 向微信支付平台验证支付状态
 * 
 * @param {String} AppId 应用ID
 * @param {String} MchId 商户ID
 * @param {String} PayKey 支付密钥
 * @param {String} out_trade_no 订单流水号
 */
async function chkWXPayOrder(AppId,MchId,PayKey,out_trade_no) {
    if(!out_trade_no) throw new Error('out_trade_no 为空')
    /* 构建参数 */
    const params = {
        appid: AppId,
        mch_id: MchId,
        out_trade_no: out_trade_no,
        nonce_str: md5(Date.now()+"mmis")
    }
    /* 构建签名 */
    params.sign = wxsign(params,PayKey)
    let builder = new xml2js.Builder()
    let reqXML = builder.buildObject(params)
    
    let resultXML = await Request.post({
        method:'post',
        url: 'https://api.mch.weixin.qq.com/pay/orderquery',
        body: reqXML,
        agentOptions: {
            passphrase: params.mch_id
        }
    })
    
    if(resultXML) {
        let result = xmlParser.parseStringSync(resultXML,{ trim:true, explicitArray:false, explicitRoot:false})
        return result
    }
    throw new Error('验证失败')
}

module.exports = {
    getWxWXMPOpenid,
    decryptData,
    reqWXUnifiedorder,
    chkWXPayOrder
}
