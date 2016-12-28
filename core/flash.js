module.exports=function(app){
	app.use(function(req, res, next) {
	res.locals.user = req.session.user;
	res.locals.post = req.session.post;
	var error = req.flash('error');
	res.locals.error = error.length ? error : null;
	var success = req.flash('success');
	res.locals.success = success.length ? success : null;
	next();
});
}
