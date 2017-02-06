var session = require('express-session');

var options = {
	secret: 'rD8h1iyXevIlHrF2h6jgenHhfX9w7ts',
	cookie: {
		maxAge: 30 * 60 * 1000
	}
}

module.exports = session(options);