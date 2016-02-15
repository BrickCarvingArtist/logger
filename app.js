import express from "express";
import bodyParser from "body-parser";
import path from "path";
import request from "request";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import connectMongo from "connect-mongo";
import SaveLog from "./controller/log";
import routerApi from "./controller/api";
import routerStatic from "./controller/static";
import react from "react";
import reactDOMServer from "react-dom/server";
const port = process.env.PORT || 3002,
	app = express(),
	router = express.Router(),
	MongoStore = connectMongo(session);
mongoose.connect("mongodb://localhost/db");
app.use(cookieParser());
app.use(session({
	secret : "awesome",
	name : "qjd_logger",
	cookie : {
		maxAge : 7200000
	},
	store : new MongoStore({
		url : "mongodb://localhost/cookieDb"
	}),
	resave : 0,
	saveUninitialized : 1
}));
app.use(bodyParser.urlencoded({
	extended : 1
}));
app.set("views", `${__dirname}/view`);
app.set("view engine", "jade");
app.use(express.static(`${__dirname}/resource`, {
	index : 0,
	maxAge : 600000
}));
app.all("*", (req, res, next) => {
	SaveLog(req);
	next();
});
app.use(routerApi(router, request));
app.use(routerStatic(router, react, reactDOMServer));
app.listen(port);
console.log("server started on port " + port);