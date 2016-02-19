import AgentModel from "../model/agent";
import Agent from "../controller/agent";
import {addZero, getIp} from "../util";
import {clientId, systemId, browserId} from "./config/agent";
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
			ip : getIp(req),
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