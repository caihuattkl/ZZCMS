var session = require('express-session');
//var RedisStore = require('connect-redis')(session);

var options = {
	resave: false,
	saveUninitialized: false,
	secret: 'rD8h1iyXevIlHrF2h6jgenHhfX9w7ts',
	cookie: {maxAge: 30 * 60 * 1000}
//	store: new RedisStore(opts),
}

//var opts = {
//   "host": "127.0.0.1",
//   "port": "3005",
//   "ttl": 60 * 60 * 24 * 30,   //Session的有效期为30天
//};

module.exports = session(options);