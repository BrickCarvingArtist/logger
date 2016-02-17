import {Page as home} from "../dev_resource/pack/home";
import {Page as agent} from "../dev_resource/pack/agent";
import {clientId, systemId, browserId} from "./config/agent";
export default (router, react, reactDOMServer) => {
	router
		.route("/")
		.get((req, res, next) => {
			res.render("./index", {
				style : [
					"/css/home.css"
				],
				script : [
					"/js/home.js"
				],
				title : "首页",
				page : reactDOMServer.renderToString(react.createFactory(home)({}))
			});
		});
	router
		.route("/log/agent")
		.get((req, res, next) => {
			res.render("./index", {
				style : [
					"/css/agent.css"
				],
				script : [
					"/js/agent.js"
				],
				title : "HTTP访问头日志分析系统",
				page : reactDOMServer.renderToString(react.createFactory(agent)({
					filter : [clientId, systemId, browserId]
				}))
			});
		});
	router
		.route("*")
		.get((req, res, next) => {
			res.render("./index", {
				style : [],
				script : [],
				title : "404",
				page : "访问路径不存在"
			});
		});
	return router;
}