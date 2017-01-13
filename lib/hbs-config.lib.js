/**
 * hbs配置文件
 */
module.exports = {
	partialsDir: './views/template/partials/',
	//模版文件的绝对路径
	layoutsDir:"./views/template/layouts/",
//	defaultLayout:'index',
	extname:'.hbs',
	helpers: {
		section: function(name, options) {
			if(!this._sections) this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		}
	}

};