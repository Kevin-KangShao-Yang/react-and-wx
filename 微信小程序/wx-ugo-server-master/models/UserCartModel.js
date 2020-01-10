module.exports = function(db,callback){
    // 用户购物车模型
	db.define("UserCartModel",{
		cart_id : {type: 'serial', key: true},
		user_id : Number,
		cart_info: String,
		created_at : Date,
		updated_at : Date,
		delete_time : Date
	},{
		table : "sp_user_cart"
	});
    return callback();
};