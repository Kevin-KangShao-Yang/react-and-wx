module.exports = function(db,callback){
	// 用户模型
	db.define("MobileCodeModel",{
		id : {type: 'serial', key: true},
		mobile : String,
		code : String,
		expires_time : Date,
		type : Number
	},{
		table : "sp_mobile_code"
	});
	return callback();
}