import AgentModel from "../model/Agent";
import Agent from "../controller/agent";
import {clientId, systemId, browserId} from "./config/agent";
const addZero = (num, length) => {
	let chars = num.toString().split(""),
		charsLen = chars.length;
	if(length - chars.length){
		for(let i = 0; i <= length - chars.length; i++){
			chars.unshift("0");
		}
	}
	return chars.join("");
};
const combineId = (clientType, systemType, browserType) => {
	return `${addZero(clientId[clientType], 1)}${addZero(systemId[systemType], 2)}${addZero(browserId[browserType], 3)}`;
};
export default (req) => {
	AgentModel.fetch((err, data) => {
		console.log("\n\t----- all the logs start -----\n");
		console.log(data);
		console.log("\n\t------ all the logs end ------\n");
	});
	let headers = req.headers,
		agent = Agent(headers["user-agent"]),
		agentModel = new AgentModel({
			id : combineId(agent.getClientType(), agent.getSystemType(), agent.getBrowserType()),
			agent : headers["user-agent"],
			client : agent.getClientType(),
			system : agent.getSystemType(),
			browser : agent.getBrowserType(),
			referer : headers["referer"] || ""
		});
	agentModel.save((err, data) => {
		if(err){
			console.log(err);
		}else{
			console.log("\n\t----- current item start -----\n");
			console.log(data);
			console.log("\n\t------ current item end ------\n");
		}
	});
}