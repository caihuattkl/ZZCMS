passport = require('passport');

module.exports = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if(err) {
			return next(err);
		}
		if(!user) {
			req.flash('error', info.message);
			return res.redirect('/login');
		}
		req.logIn(user, function(err) {
			if(err) return next(err);
			res.redirect(303, '/admin/index.html');
		})
	})(req, res, next);
}