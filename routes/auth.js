var db = require("../config/db.js"),
	md5 = require("md5");
module.exports = function(passport, LocalStrategy) {
	passport.use('local', new LocalStrategy({passReqToCallback : true},function(req,username, password, done) {
		db.query('select id,name,password from users', function(err, usersData) {
			if(!err) {
				var users = usersData; // 拿到数据库中所有用户数据!
				var result;
				for(var i = 0; i < users.length; i++) {
					//首先检查是否有匹配用户名
					if(username == users[i].name) {
						if(md5(password) == users[i].password) {
							return done(null, users[i]);
						}
						 return done(null, false,{message: '密码输入错误!' });
						break;
					}
					result = true;
				}
				if(result) {
					return done(null, false,{message: '用户名输入错误!' });
				}
			}
		})

	}));
//session对象序列化与反序列化
	passport.serializeUser(function(user, done) { //保存user对象
		done(null, user); //可以通过数据库方式操作
	});

	passport.deserializeUser(function(user, done) { //删除user对象
		done(null, user); //可以通过数据库方式操作
	});

};