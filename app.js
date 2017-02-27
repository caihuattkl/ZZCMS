var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('./lib/logger.lib');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var credentials = require('./lib/credentials.lib'); //cookie秘钥
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var routerService = require('./core/routes');
var errors = require('./core/controllers/errors.controller').error;
var auth = require('./lib/auth.lib');
//var autoSpider=require('./core/models/keji_topline.model')();


//配置模版
app.engine('hbs',require('./lib/hbs-config.lib'))
app.set('view engine', 'hbs');
app.use(logger.access());
//中间件
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser(credentials.cookieSecret)); //cookie秘钥
app.use(cookieParser());
app.use(require('./lib/session.lib'));
app.use(require('express-flash')(),require('./lib/flash.lib'));



//登录认证
app.use(passport.initialize());
app.use(passport.session());
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