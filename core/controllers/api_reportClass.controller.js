var	db = require("../../lib/db.lib.js"),
		filter = require("../../lib/filter.lib");

//报告分类增
exports.addReportClass = function(req, res) {
	var reportFristClassId = req.body.reportFristClassId,
		reportUrl = req.body.reportUrl,
		reportSubTitle = filter.formatStr(req.body.reportSubTitle),
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