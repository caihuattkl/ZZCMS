var db = require("../../config/db.js"),
	formatStr = require("../../core/filter/formatString");

//报告分类增
exports.addReportClass = function(req, res) {
	var reportFristClassId = req.body.reportFristClassId,
		reportUrl = req.body.reportUrl,
		reportSubTitle = formatStr(req.body.reportSubTitle),
		reportTitle = req.body.reportTitle,
		reportKeywords = req.body.reportKeywords,
		reportDescription = req.body.reportDescription,
		time = req.body.time;
	var sql = 'insert into reportclass(id,reportFristClassId,reportUrl,reportSubTitle,reportTitle,reportKeywords,reportDescription,time) values("id", "' + reportFristClassId + '", "' + reportUrl + '", "' + reportSubTitle + '", "' + reportTitle + '", "' + reportKeywords + '", "' + reportDescription + '", "' + time + '")';
	db.query(sql, function(err, rows) {
		if(err) {
			res.json({
				code: 500,
				message: '添加分类失败,请检查!',
				data: []
			});
		} else {
			res.json({
				code: 200,
				message: '添加分类成功!',
				data: rows
			});
		}
	})
}

//报告分类删
exports.delReportClass = function(req, res) {
	var id = req.params.id;
	db.query("select * from reportclass where reportFristClassId=" + id, function(err, rows) {
		if(!err && rows.length == 0) {
			db.query("delete from reportclass where id=" + id, function(err, rows) {
				if(!err) {
					res.json({
						code: 200,
						message: '删除成功!',
						data: []
					});
					return;
				}
				res.json({
					code: 500,
					message: '删除失败,请检查!',
					data: rows
				});
			});
			return;
		}
		res.json({
			code: 500,
			message: '删除失败,该分类下存在子分类,不可删除!!',
			data: rows
		});

	});
}

//报告分类列表
exports.reportClassList = function(req, res) {
	var sql = 'select * from reportclass';
	db.query(sql, function(err, bigClass) {
		var bigClassData = bigClass;
		if(!err) {
			res.json({
				code: 200,
				message: '查询成功!',
				data: bigClassData
			})
		}
	})
}

//报告分类某条记录
exports.reportClassDetail = function(req, res) {
	var id = req.params.id;
	db.query("select * from reportclass where id=" + id, function(err, rows) {
		if(err) {
			res.json({
				code: 500,
				message: '查询失败,请检查!',
				data: []
			});
		} else {
			res.json({
				code: 200,
				message: '查询成功!',
				data: rows
			});
		}
	});

}

//获取报告所有顶级分类
exports.reportTopClassList = function(req, res){
	var id = req.params.id;
	var sql = "SELECT * FROM reportclass where id='" + id + "'UNION all SELECT * FROM reportclass where reportFristClassId = 0";
	db.query(sql, function(err, rows) {
		if(err) {
			res.json({
				code: 500,
				message: '查询失败,请检查!',
				data: []
			});
		} else {
			res.json({
				code: 200,
				message: '查询成功!',
				data: rows
			});
		}
	});
}

//报告分类改
exports.putReportClass = function(req, res){
	var id = req.body.id,
		reportSubTitle = req.body.reportSubTitle,
		reportTitle = req.body.reportTitle,
		reportKeywords = req.body.reportKeywords,
		reportDescription = req.body.reportDescription,
		time = req.body.time;
	var sql = 'UPDATE reportclass SET reportSubTitle="' + reportSubTitle + '",reportTitle="' + reportTitle + '",reportKeywords="' + reportKeywords + '",reportDescription="' + reportDescription + '",time="' + time + '" WHERE id =' + id
	db.query(sql, function(err, rows) {
		if(err) {
			console.log(err)
			res.json({
				code: 500,
				message: '修改失败,请检查!',
				data: []
			});
		} else {
			res.json({
				code: 200,
				message: '修改成功!',
				data: rows
			});
		}
	});
}

//新闻分类列表
exports.newsClassList = function(req, res){
	db.query("select * from newsclass", function(err, rows) {
		if(!err) {
			var classData = [],
				obj = {};
			rows.forEach(function(val, index) {
				if(val.firstId == 0) {
					obj = val;
					obj.child = [];
					rows.forEach(function(v, i) {
						if(v.firstId == obj.id) {
							obj.child.push(v);
						}
					})
					classData.push(obj)
				}
			})
			res.json({
				code: 200,
				message: '查询成功!',
				data: classData
			});
			return;
		}
		res.json({
			code: 500,
			message: '查询失败,请检查!',
			data: classData
		});
	})
}

//新闻分类增
exports.addNewsClass = function(req, res){
	var firstId = req.body.firstId;
	url = req.body.url,
		directoryName = req.body.directoryName,
		subTitle = formatStr(req.body.subTitle),
		title = req.body.title,
		keywords = req.body.keywords,
		description = req.body.description,
		time = req.body.time;
	var sql = 'insert into newsclass(id,directoryName,firstId,url,subTitle,title,keywords,description,time) values("id",  "' + directoryName + '", "' + firstId + '", "' + url + '", "' + subTitle + '", "' + title + '", "' + keywords + '", "' + description + '", "' + time + '")';
	db.query(sql, function(err, rows) {
		if(!err) {
			res.json({
				code: 200,
				message: '添加分类成功!',
				data: rows
			});
			return;
		}
		res.json({
			code: 500,
			message: '添加分类失败,请检查!',
			data: []
		});
	})
}

//新闻分类删
exports.delNewsClass = function(req, res){
	var id = req.params.id;
	db.query("select * from newsclass where firstId=" + id, function(err, rows1) {
		if(!err && rows1.length == 0) { //判断是否有子分类

			db.query("select * from news where classChildId=" + id, function(err, rows2) {
				if(!err && rows2.length == 0) { //判断是否存在新闻
					db.query("delete from newsclass where id=" + id, function(err, rows3) {
						if(!err) {
							res.json({
								code: 200,
								message: '删除成功!',
								data: []
							});
							return;
						}
						res.json({
							code: 500,
							message: '删除失败,请检查!',
							data: []
						});
					});
					return;
				}
				res.json({
					code: 500,
					message: '删除失败,该分类下存在新闻,请先清空或移动新闻后再删除!',
					data: []
				});
			});
			return;
		}

		res.json({
			code: 500,
			message: '删除失败,该分类下存在子分类!',
			data: []
		});
	});
}

//新闻分类改
exports.putNewsClass = function(req, res){
	var id = req.body.id,
		url = req.body.url,
		directoryName = req.body.directoryName
	subTitle = req.body.subTitle,
		title = req.body.title,
		keywords = req.body.keywords,
		description = req.body.description,
		time = req.body.time;
	var sql = 'UPDATE newsclass SET url="' + url + '",directoryName="' + directoryName + '",subTitle="' + subTitle + '",title="' + title + '",keywords="' + keywords + '",description="' + description + '",time="' + time + '" WHERE  id =' + id
	db.query(sql, function(err, rows) {
		if(err) {
			console.log(err)
			res.json({
				code: 500,
				message: '修改失败,请检查!',
				data: []
			});
		} else {
			res.json({
				code: 200,
				message: '修改成功!',
				data: rows
			});
		}
	});
}

//获取新闻所有顶级分类
exports.newsTopClassList=function(req,res){
	var id = req.params.id;
	var sql = "SELECT * FROM newsclass where id='" + id + "'UNION all SELECT * FROM newsclass where firstId = 0";
	db.query(sql, function(err, rows) {
		if(err) {
			res.json({
				code: 500,
				message: '查询失败,请检查!',
				data: []
			});
		} else {
			res.json({
				code: 200,
				message: '查询成功!',
				data: rows
			});
		}
	});
}


//新闻分类某条记录
exports.newsClassDetail=function(req,res){
	var id = req.params.id;
	db.query("select * from newsClass where id=" + id, function(err, rows) {
		if(err) {
			res.json({
				code: 500,
				message: '查询失败,请检查!',
				data: []
			});
		} else {
			res.json({
				code: 200,
				message: '查询成功!',
				data: rows
			});
		}
	});

}

//添加新闻
exports.addNews=function(req,res){
	var uuid= (req.body.newsUrl).match(/[\d]{13}/),
		classFirstId = req.body.classFirstId,
		classChildId = req.body.classChildId,
		newsUrl = req.body.newsUrl,
		subTitle = req.body.subTitle,
		title = req.body.title,
		subKeywords = req.body.subKeywords,
		keywords = req.body.keywords,
		source = req.body.source,
		description = req.body.description,
		author = req.body.author,
		time = req.body.time,
		nContent = formatStr(req.body.nContent);
	var sql = 'insert into news(id,uuid,classFirstId,classChildId,newsUrl,subTitle,title,subKeywords,keywords,source,description,author,time,nContent)values("id","' + uuid + '","'+ classFirstId + '","' + classChildId + '","' + newsUrl + '","' + subTitle + '","' + title + '","' + subKeywords + '","' + keywords + '","' + source + '","' + description + '","' + author + '","' + time + '","' + nContent + '")'
	db.query(sql, function(err, rows) {
		if(err) {
			res.json({
				code: 500,
				message: '查询失败,请检查!',
				data: err
			});
		} else {
			res.json({
				code: 200,
				message: '添加成功!',
				data: rows
			});
		}
	});
}


//删除指定新闻
exports.delNews=function(req,res){
	var id = req.params.id;
	db.query("delete from news where id=" + id, function(err, rows) {
		if(!err) {
			res.json({
				code: 200,
				message: '删除成功!',
				data: []
			});
			return;
		}
		res.json({
			code: 500,
			message: '删除失败,请检查!',
			data: rows
		});
	});
}

//编辑指定新闻
exports.putNews=function(req,res){
	var id = req.body.newsId,
		classFirstId = req.body.classFirstId,
		classChildId = req.body.classChildId,
		newsUrl = req.body.newsUrl,
		subTitle = req.body.subTitle,
		title = req.body.title,
		subKeywords = req.body.subKeywords,
		keywords = req.body.keywords,
		source = req.body.source,
		description = req.body.description,
		author = req.body.author,
		time = req.body.time,
		nContent = formatStr(req.body.nContent);
	var sql = 'UPDATE news SET classFirstId="' + classFirstId + '",classChildId="' + classChildId + '",newsUrl="' + newsUrl + '",subTitle="' + subTitle + '",title="' + title + '",subKeywords="' + subKeywords + '",keywords="' + keywords + '",source="' + source + '",description="' + description + '",author="' + author + '",time="' + time + '",nContent="' + nContent + '" WHERE id =' + id
	db.query(sql, function(err, rows) {
		if(!err) {
			res.json({
				code: 200,
				message: '更新成功!',
				data: rows
			});
			return;
		}
		res.json({
			code: 500,
			message: '更新失败,请检查!',
			data: err
		});
	});
}

//新闻列表
exports.newsList=function(req,res){
	var newsClassId = req.query.newsClassId;
	var sql = 'SELECT * FROM news where classChildId=' + newsClassId
	db.query(sql, function(err, rows) {
		if(err) {
			res.json({
				code: 500,
				message: '获取新闻失败,请检查!',
				data: err
			});
		} else {
			res.json({
				code: 200,
				message: '获取新闻!',
				data: rows
			});
		}
	});

}


//获取指定新闻
exports.newsDetail=function(req,res){
	var id = req.params.newsId;
	var sql = 'SELECT * FROM news where id=' + id
	db.query(sql, function(err, rows) {
		if(!err) {
			res.json({
				code: 200,
				message: '获取新闻成功!',
				data: rows
			});
			return;
		}
		res.json({
			code: 500,
			message: '获取新闻失败,请检查!',
			data: err
		});
	});
}


