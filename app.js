import express from "express";
import bodyParser from "body-parser";
import path from "path";
import request from "request";
import react from "react";
import reactDOMServer from "react-dom/server";
import cookieParser from "cookie-parser";
import session from "express-session";
import routerApi from "./controller/api";
import routerStatic from "./controller/static";
const port = process.env.PORT || 3002,
	app = express(),
	router = express.Router();
app.set("views", `${__dirname}/view`);
app.set("view engine", "jade");
app.use(cookieParser());
app.use(session({
	secret : "awesome",
	name : "qjd_logger",
	cookie : {
		maxAge : 7200000
	},
	resave : 1,
	saveUninitialized : 1
}));
app.use(bodyParser.urlencoded({
	extended : 1
}));
app.use(express.static(`${__dirname}/resource`, {
	index : 0,
	maxAge : 600000
}));
app.all("*", (req, res, next) => {
	console.log(`\n\n\t\t----------start----------\n\n${req.path}\t|\t${req.method}\n`);
	console.log(req.query);
	console.log("\n\t\t---------- end ----------");
	next();
});
app.use(routerApi(router, request));
app.use(routerStatic(router, react, reactDOMServer));
app.listen(port);
console.log("server started on port " + port);