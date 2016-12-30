var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var flashConfig = require('./lib/flash.lib');
var credentials = require('./lib/credentials.lib'); //cookie秘钥
var exphbs = require('express-hbs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app = express();
var routerService = require('./core/routes');
var errors = require('./core/controllers/errors.controller').error;
var auth = require('./lib/auth.lib');

//配置请求头
app.disable('x-powered-by'); //屏蔽服务器信息

//配置模版
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs.express4({
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
	}));
app.set('view engine', '.hbs');

//中间件
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser(credentials.cookieSecret)); //cookie秘钥
app.use(cookieParser());
app.use(session({secret: 'rD8h1iyXevIlHrF2h6jgenHhfX9w7ts',cookie: {maxAge: 60000*30}}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash(),flashConfig);

//登录认证
auth(passport, LocalStrategy)

/**
 * 转给 Roter 处理路由
 */
app.use(routerService);

/**
 * 错误处理程序
 */
app.use(errors);

/**
 * 导出 APP
 */
module.exports = app;