var http = require("http");
exports.stockIndex = function(req, res1) {
	http.get('http://hq.sinajs.cn/rn=1483414066789&list=s_sh000001,s_sz399001,s_sh000300,s_sz399415,s_sz399006', function(sres) {
		var html = '';
		sres.on('data', function(data) {
			html += data
		})
		sres.on('end', function() {
			res1.json({
				code: 200,
				message: '查询成功!',
				data: html
			});
		})
	}).on('error', function() {
		res1.json({
				code: 500,
				message: '数据获取失败,请检查!',
				data: []
			});
	})
}