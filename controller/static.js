import {Page as home} from "../dev_resource/pack/home";
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