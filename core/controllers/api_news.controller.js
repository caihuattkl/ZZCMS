var	db = require("../../lib/db.lib.js"),
		filter = require("../../lib/filter.lib");
		
		
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
		nContent = filter.formatStr(req.body.nContent);
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
		nContent = filter.formatStr(req.body.nContent);
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
	var id = req.params.id;
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
