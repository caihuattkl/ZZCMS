module.exports = function() {
	return {
		partialsDir: __dirname + '/views/template/partials/',
		//模版文件的绝对路径
		layoutsDir: __dirname + "/views/template/",
		helpers: {
			section: function(name, options) {
				if(!this._sections) this._sections = {};
				this._sections[name] = options.fn(this);
				return null;
			}
		}
	}
}