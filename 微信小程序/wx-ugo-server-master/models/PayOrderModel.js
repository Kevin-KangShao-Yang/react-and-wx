module.exports = function(db,callback){
	// 用户模型
	db.define("PayOrderModel",{
		id : {type: 'serial', key: true},
		po_number : String,
		po_type : [1,2],
		po_detail : String,
		po_body : String,
		po_total_fee : Number,
		createdAt : Date,
		po_status : [1,2,3],
		po_platform_order : String,
		po_pay_time : Date,
		uid : Number,
		updatedAt : Date,
		po_pay_result : String
	},{
		table : "pay_orders"
	});
	return callback();
}