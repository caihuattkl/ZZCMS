var db = require("../../lib/db.lib.js"),
	filter = require("../../lib/filter.lib");

//新闻分类列表
exports.newsClassList = function(req, res) {
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
			data: []
		});
	})
}

//新闻分类增
exports.addNewsClass = function(req, res) {
		var firstId = req.body.firstId;
		url = req.body.url,
			directoryName = req.body.directoryName,
			subTitle = filter.formatStr(req.body.subTitle),
			title = req.body.title,
			keywords = req.body.keywords,
			description = req.body.description,
			time = req.body.time;
		var sql = 'insert into newsclass(id,directoryName,firstId,url,subTitle,title,keywords,description,time) values("id",  "' + directoryName + '", "' + firstId + '", "' + url + '", "' + subTitle + '", "' + title + '", "' + keywords + '", "' + description + '", "' + time + '")';
		db.query(sql, function(err, rows) {
			if(!err) {
				//如果为顶级分类就添加设置频道头条
				if(firstId == 0) {
					insertTopline(rows.insertId)
				}
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
	//插入频道头条
function insertTopline(firstId) {
	var topLineSql = 'INSERT INTO topline(id,newsNumber)values(id,"' + firstId+ '")'
	db.query(topLineSql, function(err, rows) {
		if(err) throw err;
		console.log("插入了频道ID为:"+firstId+"头条编号!")
	})
}

//新闻分类删
exports.delNewsClass = function(req, res) {
	var id = req.params.id;
	db.query("select * from newsclass where firstId=" + id, function(err, rows1) {
		if(!err && rows1.length == 0) { //判断是否有子分类

			db.query("select * from news where classChildId=" + id, function(err, rows2) {
				if(!err && rows2.length == 0) { //判断是否存在新闻
					db.query("delete from newsclass where id=" + id, function(err, rows3) {
						if(!err) {
							//删除对应头条
							 	delTopline(id)
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

	//删除频道头条
function delTopline(firstId) {
	var topLineSql = 'delete from topline where newsNumber='+ firstId
	db.query(topLineSql, function(err, rows) {
		if(err) throw err;
		console.log("删除了频道ID为:"+firstId+"头条编号!")
	})
}


//新闻分类改
exports.putNewsClass = function(req, res) {
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
exports.newsTopClassList = function(req, res) {
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
exports.newsClassDetail = function(req, res) {
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