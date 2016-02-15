import Log from "../model/log";
const combineId = () => {
	let id = 1;
	return id;
};
export default (req) => {
	Log.fetch((err, data) => {
		console.log(data);
	});
	let headers = req.headers,
		log = new Log({
			id : combineId(),
			url : {
				param : JSON.stringify(req.param),
				body : JSON.stringify(req.body),
				query : JSON.stringify(req.query)
			},
			header : {
				httpVersion : req.httpVersion,
				method : req.method,
				cookie : JSON.stringify(req.cookies),
				host : headers.host,
				connection : headers.connection,
				pragma : headers.pragma,
				cacheControl : headers["cache-control"],
				upgradeInsecureRequests : headers["upgrade-insecure-requests"],
				userAgent : headers["user-agent"],
				acceptEncoding : headers["accept-encoding"],
				acceptLanguage : headers["accept-language"],
				referer : headers["referer"] || ""
			}
		});
	log.save((err, data) => {
		if(err){
			console.log(err);
		}else{
			console.log("save successfully");
		}
	});
}