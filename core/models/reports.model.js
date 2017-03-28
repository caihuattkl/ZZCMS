var db = require("../../lib/db.lib.js");
var logger = require('../../lib/logger.lib');
//新增报告
exports.add=function(options,callback) {
	var sql='insert into reports(id,frist_class,child_class,report_catalog,report_shart,report_url,report_type,research_field,latest_revision,report_format,delivery_mode,pdf_price,entity_price,double_version,related_report,core_keywords,cover_img,title,description,keywords,subTitle,subKeywords,report_author,post_time,report_summary,pv) values("id", "' + options.fristClass + '", "' + options.childClass + '", "' + options.reportCatalog + '", "' + options.reportShart + '", "' + options.reportUrl + '", "' + options.reportType + '", "' + options.researchField + '", "' + options.latestRevision + '", "' + options.reportFormat + '", "' + options.deliveryMode + '", "' + options.pdfPrice + '", "' + options.entityPrice + '", "' + options.doubleVersion + '", "' + options.relatedReport + '", "' + options.coreKeywords + '", "' + options.coverImg + '", "' + options.title + '", "' + options.description + '", "' + options.keywords + '","' + options.subTitle + '","' + options.subKeywords + '","' + options.reportAuthor + '","' + options.postTime + '","' + options.reportSummary + '","' + options.pv + '")'
	db.query(sql, function(err, rows) {
		if(err) {
			logger.database().error(__filename, err||"新增报告失败,检查reports.model.js文件");
			return callback(err);
		}
		setAddReportUrl(rows.insertId,callback)
	})
}

//新增报告后,完善url
function setAddReportUrl(id,callback) {
	var sql='update reports set report_url = concat(report_url,"'+id+'") where id ="'+id+'"';
	db.query(sql, function(err, rows) {
		if(err) {
			logger.database().error(__filename, err||"新增报告时更新报告的URL失败,检查reports.model.js文件");
			return callback(err);
		}
		callback(null, rows)
	})
}


//报告更新
exports.put=function(options,callback) {
	var sql='UPDATE reports set frist_class="' + options.fristClass + '", child_class="' + options.childClass + '", report_catalog="' + options.reportCatalog + '", report_shart="' + options.reportShart + '", report_url="' + options.reportUrl + '", report_type="' + options.reportType + '",research_field="' + options.researchField + '",latest_revision="' + options.latestRevision + '", report_format="' + options.reportFormat + '", delivery_mode="' + options.deliveryMode + '", pdf_price="' + options.pdfPrice + '",entity_price="' + options.entityPrice + '",double_version="' + options.doubleVersion + '",related_report="' + options.relatedReport + '",core_keywords="' + options.coreKeywords + '",cover_img="' + options.coverImg + '",title="' + options.title + '",description="' + options.description + '",keywords="' + options.keywords + '",subTitle="' + options.subTitle + '",subKeywords="' + options.subKeywords + '",report_author="' + options.reportAuthor + '",post_time="' + options.postTime + '",report_summary="' + options.reportSummary + '",pv="' + options.pv + '" where id="'+options.id+'"'
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || "id为",options.id,"的报告修改失败!");
			if(!rows.length) return callback(null,[]);
			return callback(err);
		}
		callback(null, rows)
	})
}

//获取所有报告
exports.list=function(callback) {
	var sql='select * from reports';
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || "获取所有报告出错,请检查!");
			if(!rows.length) return callback(null,[]);
			return callback(err);
		}
		callback(null, rows)
	})
}

//获取指定分类报告
exports._class=function(options,callback) {
	var sql='select * from reports where frist_class REGEXP "'+options.firstClass+'" or  child_class REGEXP "'+options.childClass+'"';
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || (options.firstClass&&"报告分类"+options.firstClass+"没有数据(大类)")||(options.childClass&&"报告分类"+options.childClass+"没有数据(小类)"));
			if(!rows.length) return callback(null,[]);
			return callback(err);
		}
		callback(null, rows)
	})
}

//获取指定报告信息
exports.detail=function(id,callback) {
	var sql='select * from reports where id='+id;
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || "获取指定报告信息",id,"信息为空!");
			if(!rows.length) return callback(null,[]);
			return callback(err);
		}
		callback(null, rows)
	})
}

//删除报告列表
exports.del=function(id,callback) {
	var sql='delete from reports where id='+id;
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || "删除ID为",id,"的报告出错");
			if(!rows.length) return callback(null,[]);
			return callback(err);
		}
		callback(null, rows)
	})
}

//报告频道每个栏目获取5条记录
exports.classDetails=function(callback){
	var sql='select * from ( select r1.* from reports as r1 left join reports as r2 on r1.frist_class = r2.frist_class and r1.id >= r2.id group by r1.id having count(r1.id) <= 4) as c order by post_time desc';
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || "classDetails 获取失败!请检查reports.model");
			if(!rows.length) return callback(null,[]);     
			return callback(err);
		}
		callback(null, rows)     
	})
	 
}


//报告频道每个栏目最新1条记录
exports.channelNewestReport=function(callback){
	var sql='select * from (select * from reports order by post_time desc) reports  group by frist_class order by post_time';
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || "channelNewestReport 获取失败!请检查reports.model");
			if(!rows.length) return callback(null,[]);
			return callback(err);
		}
		callback(null, rows)
	})
	
}
