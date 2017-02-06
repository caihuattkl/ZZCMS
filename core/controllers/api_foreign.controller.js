var http = require("http");

//新浪股票指数
exports.stockIndex = function(req, res) {
	http.get('http://hq.sinajs.cn/rn=1483414066789&list=s_sh000001,s_sz399001,s_sh000300,s_sz399415,s_sz399006', function(response) {
		var data = '';
		response.on('data', function(chunk) {
			data += chunk
		})
		response.on('end', function() {
			res.json({
				code: 200,
				message: '查询成功!',
				datas: data
			});
		})
	}).on('error', function() {
		res.json({
			code: 500,
			message: '数据获取失败,请检查!',
			datas: []
		});
	})

}

//获取客户端ip地址
//	getClientIp(req)
function getClientIp(req) {
	//		console.log(req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress);
	return req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;
};

//外汇直盘信息
exports.foreignExchange = function(req, res) {

	http.get('http://web.juhe.cn:8080/finance/exchange/frate?key=111580d17c4b9af661609e4dbf05990a', function(response) {
		var data = '';
		response.on('data', function(chunk) {
			data += chunk
		})
		response.on('end', function() {
			res.json(JSON.parse(data));
		})
	}).on('error', function() {
		res.json(JSON.parse(data));
	})

}

//老黄历
function getCurrentDate() {
	var date = new Date();
	return date.getFullYear() + "-" + ((date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1)) + "-" + date.getDate()
}
exports.almanac = function(req, res) {
	http.get('http://v.juhe.cn/laohuangli/d?date='+getCurrentDate()+'&key=7a69cec9165f6a3c42cc368bf71c820f', function(response) {
		var data = '';
		response.on('data', function(chunk) {
			data += chunk
		})
		response.on('end', function() {
			res.json(JSON.parse(data));
		})
	}).on('error', function() {
		res.json(JSON.parse(data));
	})

}