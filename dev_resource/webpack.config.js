module.exports = {
	entry : {
		home : "./entry/home",
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