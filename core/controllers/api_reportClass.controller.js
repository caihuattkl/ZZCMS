var	db = require("../../lib/db.lib.js"),
		filter = require("../../lib/filter.lib"),
		toEn=require("../../lib/toEn.lib");
//报告分类增
exports.addReportClass = function(req, res) {
	var fristClass = req.body.fristClass,
		reportsDirectory = toEn(req.body.subTitle),
		subTitle = filter.formatStr(req.body.subTitle),
		title = filter.formatStr(req.body.title),
		keywords = req.body.keywords,
		description = req.body.description,
		postTime = req.body.postTime;
		
	var sql = 'insert into report_class(id,frist_Class,reports_directory,sub_title,title,keywords,description,post_time) values("id", "' + fristClass + '", "' + reportsDirectory + '", "' + subTitle + '", "' + title + '", "' + keywords + '", "' + description + '", "' + postTime + '")';
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
	db.query("select * from report_class where frist_class=" + id, function(err, rows) {
		if(!err && rows.length == 0) {
			db.query("delete from report_class where id=" + id, function(err, rows) {
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
	var sql = 'select * from report_class';
	db.query(sql, function(err, rows) {
		var reportClassArr=[],obj={};
		if(!err) {
			rows.forEach(function(val,ind){
				if(val.frist_class==0){
					obj=val;
					obj.child = [];
					rows.forEach(function(v, i) {
						if(v.frist_class == obj.id) {
							obj.child.push(v);
						}
					})
				reportClassArr.push(obj)
				}
			})
			res.status(200).json(reportClassArr);
		}
	})
}

//报告分类某条记录
exports.reportClassDetail = function(req, res) {
	var id = req.params.id;
	db.query("select * from report_class where id=" + id, function(err, rows) {
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
	var sql = "SELECT * FROM report_class where id='" + id + "'UNION all SELECT * FROM report_class where frist_Class = 0";
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
		subTitle = req.body.reportSubTitle,
		title = req.body.reportTitle,
		keywords = req.body.reportKeywords,
		description = req.body.reportDescription,
		postTime = req.body.time;
	var sql = 'UPDATE report_class SET sub_title="' + subTitle + '",title="' + title + '",keywords="' + keywords + '",description="' + description + '",post_time="' + postTime + '" WHERE id =' + id
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