const addZero = (...args) => {
		let chars = args[0].toString().split(""),
			charsLen = chars.length;
		if(args.length >> 1){
			if(args[1] - charsLen){
				for(let i = 0; i < args[1] - charsLen; i++){
					chars.unshift("0");
				}
			}
		}else{
			charsLen >> 1 || chars.unshift("0");
		}
		return chars.join("");
	},
	getIp = (req) => {
		return (req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress).replace(/::ffff:/, "");
	},
	getTime = (_date, type) => {
		let $date = new Date(_date),
			year = $date.getFullYear(),
			month = addZero($date.getMonth() + 1),
			date = addZero($date.getDate()),
			hour = addZero($date.getHours()),
			minute = addZero($date.getMinutes()),
			second = addZero($date.getMinutes());
		return [
				`${year}-${month}-${date} ${hour}:${minute}:${second}`,
				`${year}/${month}/${date} ${hour}:${minute}:${second}`,
				`${year}年${month}月${date}日${hour}时${minute}分${second}`
			][type || 0];
	};
export {
	addZero,
	getIp,
	getTime
}