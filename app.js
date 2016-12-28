var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var flashConfig = require('./core/flash');
var credentials = require('./core/secret/credentials'); //cookie秘钥
var exphbs = require('express-hbs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app = express();
var routes = require('./routes/routes');
var auth = require('./routes/auth');
require("./core/helpers/pinyin");
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
app.set('view engine', 'hbs');

//中间件
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser(credentials.cookieSecret)); //cookie秘钥

app.use(cookieParser());
app.use(session({
	secret: 'rD8h1iyXevIlHrF2h6jgenHhfX9w7ts',
	cookie: {
		maxAge: 60000*30
	}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//flash config
flashConfig(app);

//登录认证
auth(passport, LocalStrategy)

//配置路由
routes(app);

// 定制 500 页面
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.type('text/plain');
	res.status(500).send('500 - Server Error');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	res.send('Not Found')
	next(err);
});

module.exports = app;