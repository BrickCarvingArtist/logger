module.exports = {
	entry : {
		home : "./entry/home",
		agent : "./entry/agent",
		func : "./entry/func"
	},
	output : {
		filename : "../resource/js/[name].js"
	},
	externals : {
		react : "React",
		"react-dom" : "ReactDOM",
		redux : "Redux",
	},
	module : {
		loaders : [
			{
				test : /\.js/,
				loaders : [
					"jsx",
					"babel"
				]
			}
		]
	},
	extensions : [".js"]
};