/**
 * 404 错误
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.notFound = function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	res.send('Not Found')
	next(err);

};

/**
 * 其他错误
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.error = function(err, req, res, next) {
	res.type('text/plain');
	res.status(500).send('500 - Server Error');
};