import mongoose from "mongoose";
const Log = new mongoose.Schema({
	id : {
		type : Number,
		required : 1 
	},
	url : {
		param : {
			type : String
		},
		body : {
			type : String
		},
		query : {
			type : String
		}
	},
	header : {
		httpVersion : {
			type : String
		},
		method : {
			type : String
		},
		cookie : {
			type : String
		},
		host : {
			type : String
		},
		connection : {
			type : String
		},
		pragma : {
			type : String
		},
		cacheControl : {
			type : String
		},
		upgradeInsecureRequests : {
			type : String
		},
		userAgent : {
			type : String
		},
		acceptEncoding : {
			type : String
		},
		acceptLanguage : {
			type : String
		},
		referer : {
			type : String
		}
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
			.findOne({
				id : id
			})
			.exec(callback);
	}
};
export default Log;