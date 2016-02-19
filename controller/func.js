import {funcId, moduleId, actionId} from "./config/func";
export default (option) => {
	return {
		getFuncType(){
			let funcTypes = [];
			for(let i in funcId){
				funcTypes.push(i);
			}
			const reg = new RegExp(`${funcTypes.join("|")}`, "i"); 
			return option.match(reg) ? option.match(reg)[0] : "other";
		},
		getModuleType(){
			let moduleTypes = [];
			for(let i in moduleId){
				moduleTypes.push(i);
			}
			const reg = new RegExp(`${moduleTypes.join("|")}`, "i");
			return option.match(reg) ? option.match(reg)[0] : "other";
		},
		getActionType(){
			let pageTypes = [];
			for(let i in actionId){
				actionTypes.push(i);
			}
			const reg = new RegExp(`${actionTypes.join("|")}`, "i");
			return option.match(reg) ? option.match(reg)[0] : "other";
		}
	};
}