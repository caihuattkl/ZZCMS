/**
 * hbs配置文件
 */
var exphbs = require('express-hbs');
require('../core/helpers/channel.helpers');

var options= {
	partialsDir: 'views/template/partials/',
	layoutsDir: "views/template/layouts/",
	defaultLayout:'views/template/layouts/layout-default',
	extname: '.hbs', //partials扩展字符串
	viewsDir: 'views', //app.set('views', 'views');
	beautify:true
	}

module.exports=exphbs.express4(options);