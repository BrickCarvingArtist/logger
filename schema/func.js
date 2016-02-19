import mongoose from "mongoose";
const Func = new mongoose.Schema({
	id : {
		type : Number,
		required : 1 
	},
	leader : {
		type : String
	},
	module : {
		type : String
	},
	action : {
		type : String
	},
	createTime : {
		type : Date,
		default : Date.now
	}
});
Func.pre("save", (next) => {
	next();
});
Func.methods = {};
Func.statics = {
	fetch(callback){
		return this
			.find({})
			.sort({
				_id : 1
			})
			.select("-_id -__v")
			.exec(callback);
	},
	findById(id, callback){
		return this
			.find({
				id
			})
			.select("-_id -__v -leader -module -action")
			.exec(callback);
	},
	findAll(option, callback){
		return this
			.find({
				leader : option.leader || /.*/,
				module : option.module || /.*/,
				action : option.action || /.*/
			})
			.select("-_id -__v -leader -module -action")
			.exec(callback);
	}
};
export default Func;