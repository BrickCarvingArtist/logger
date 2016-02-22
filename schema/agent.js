import {Schema} from "mongoose";
const Log = new Schema({
	id : {
		type : Number,
		required : 1 
	},
	ip : {
		type : String
	},
	agent : {
		type : String
	},
	client : {
		type : String
	},
	system : {
		type : String
	},
	browser : {
		type : String
	},
	referer : {
		type : String
	},
	createTime : {
		type : Date,
		default : Date.now
	}
});
Log.pre("save", (next) => {
	next();
});
Log.methods = {};
Log.statics = {
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
			.select("-_id -__v -client -system -browser")
			.exec(callback);
	},
	findAll(option, callback){
		return this
			.find({
				client : option.clientType || /.*/,
				system : option.systemType || /.*/,
				browser : option.browserType || /.*/
			})
			.select("-_id -__v -client -system -browser")
			.exec(callback);
	}
};
export default Log;