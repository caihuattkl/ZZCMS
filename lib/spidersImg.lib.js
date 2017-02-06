var http = require("http");
var fs = require("fs");

function spider(url) {
	return new Promise((resolve, reject) => {
		http.get(url, function(res) {
			var imgData = "";
			var urlSuffix = url.slice(-4);
			res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
			res.on("data", function(chunk) {
				imgData += chunk;
			});

			res.on("end", function() {
				var imgName= (+new Date()) + urlSuffix
				fs.writeFile('./public/upload/images/'+imgName, imgData, "binary", function(err) {
					if(err) {
						reject(err)
					}
					resolve(imgName)
				});
			});
		});
	})

}

exports.spider = spider;