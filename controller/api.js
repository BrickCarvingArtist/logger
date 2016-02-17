import Agent from "../model/agent";
import {clientId, systemId, browserId} from "./config/agent";
export default (router, request) => {
	router
		.route("/api/log/func/:id")
		.get((req, res, next) => {
			let id = req.params.id;
			if(isNaN(id - 0)){
				next();
			}else{
				res.send(id);
			}
		});
	router
		.route("/del/log/func")
		.get((req, res, next) => {
			Agent.remove({}, (err, data) => {
				if(err){
					console.log(err);
				}else{
					let result = data.result;
					if(result.ok && result.n){
						res.send(`delete ${result.n} itmes`);
					}else{
						res.send("nothing has been deleted");
					}
				}
			});
		});
	router
		.route("/api/log/visitorheader/getfilter")
		.get((req, res, next) => {
			res.json({
				filter : [clientId, systemId, browserId]
			});
		});
	router
		.route("/api/log/visitorheader/search/:id")
		.get((req, res, next) => {
			let id = req.params.id;
			Agent.findById(id, (err, data) => {
				if(err){
					console.log(err);
				}else{
					res.json(data);
				}
			});
		});
	return router;
}