import {systemId, browserId} from "./config/agent";
export default (agent) => {
	return {
		getClientType(){
			const mobileTypes = ["Mobile", "NetFront", "Android", "SymbianOS", "MQQBrowser", "UC"],
				reg = new RegExp(`${mobileTypes.join("|")}`, "i"); 
			return (agent.match(reg) ? mobile : "pc").toLowerCase();
		},
		getSystemType(){
			let systemTypes = [];
			for(let i in systemId){
				systemTypes.push(i);
			}
			const reg = new RegExp(`${systemTypes.join("|")}`, "i");
			return agent.match(reg) ? agent.match(reg)[0] : "other";
		},
		getBrowserType(){
			let browserTypes = [];
			for(let i in browserId){
				browserTypes.push(i);
			}
			const reg = new RegExp(`${browserTypes.join("|")}`, "i");
			return agent.match(reg) ? agent.match(reg)[0] : "other";
		}
	};
}