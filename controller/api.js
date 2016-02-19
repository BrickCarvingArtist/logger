import Agent from "../model/agent";
import Func from "../model/func";
import {clientId, systemId, browserId} from "./config/agent";
export default (router, request) => {
	router
		.route("/api/log/setfunc/:id")
		.get((req, res, next) => {
			let id = req.params.id;
			if(isNaN(id - 0)){
				res.status(403);
			}else{
				let func = new Func({
					id : id,
					leader : id.slice(0, 1),
					module : id.slice(1, 3),
					action : id.slice(3)
				});
				func.save((err, data) => {
					if(err){
						console.log(err);
					}else{
						res.send(`Save the request id(${id}) successfully.`);
					}
				});
			}
		});
	router
		.route("/api/log/getfunc")
		.get((req, res, next) => {
			Func.fetch((err, data) => {
				if(err){
					console.log(err);
				}else{
					res.json(data);
				}
			});
		});
	router
		.route("/del/log/visitorheader")
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
			const getSearch = (id, option) => {
				let searchType = 1,
					search = {};
				for(let i of option){
					searchType &= i.id;
				}
				if(searchType){
					search = new String(id);
					search.type = "findById";
				}else{
					for(let i of option){
						for(let j in i.agent){
							if(!(i.agent[j] - i.id)){
								search[i.type] = i.id ? j : 0;
								break;
							}
						}
					}
					search.type = "findAll";
				}
				return search;
			};
			let id = req.params.id,
				search = getSearch(id, [
					{
						type : "clientType",
						id : id.slice(0, 1) - 0,
						agent : clientId
					},
					{
						type : "systemType",
						id : id.slice(1, 3) - 0,
						agent : systemId
					},
					{
						type : "browserType",
						id : id.slice(3) - 0,
						agent : browserId
					}
				]);
			Agent[search.type](search, (err, data) => {
				if(err){
					console.log(err);
				}else{
					res.json(data);
				}
			});
		});
	return router;
}