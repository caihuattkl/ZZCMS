var db = require("../../lib/db.lib.js");

//新增报告
exports.add=function(options,callback) {
	var opt='insert into reports(id,frist_class,child_class,report_catalog,report_shart,report_url,report_type,research_field,latest_revision,report_format,delivery_mode,pdf_price,entity_price,double_version,related_report,core_keywords,cover_img,title,description,keywords,subTitle,subKeywords,report_author,post_time,report_summary,pv) values("id", "' + options.fristClass + '", "' + options.childClass + '", "' + options.reportCatalog + '", "' + options.reportShart + '", "' + options.reportUrl + '", "' + options.reportType + '", "' + options.researchField + '", "' + options.latestRevision + '", "' + options.reportFormat + '", "' + options.deliveryMode + '", "' + options.pdfPrice + '", "' + options.entityPrice + '", "' + options.doubleVersion + '", "' + options.relatedReport + '", "' + options.coreKeywords + '", "' + options.coverImg + '", "' + options.title + '", "' + options.description + '", "' + options.keywords + '","' + options.subTitle + '","' + options.subKeywords + '","' + options.reportAuthor + '","' + options.postTime + '","' + options.reportSummary + '","' + options.pv + '")'
	db.query(opt, function(err, rows) {
		callback(err, rows)
	});
}

//报告更新
exports.put=function(options,callback) {
	var opt='UPDATE reports set frist_class="' + options.fristClass + '", child_class="' + options.childClass + '", report_catalog="' + options.reportCatalog + '", report_shart="' + options.reportShart + '", report_url="' + options.reportUrl + '", report_type="' + options.reportType + '",research_field="' + options.researchField + '",latest_revision="' + options.latestRevision + '", report_format="' + options.reportFormat + '", delivery_mode="' + options.deliveryMode + '", pdf_price="' + options.pdfPrice + '",entity_price="' + options.entityPrice + '",double_version="' + options.doubleVersion + '",related_report="' + options.relatedReport + '",core_keywords="' + options.coreKeywords + '",cover_img="' + options.coverImg + '",title="' + options.title + '",description="' + options.description + '",keywords="' + options.keywords + '",subTitle="' + options.subTitle + '",subKeywords="' + options.subKeywords + '",report_author="' + options.reportAuthor + '",post_time="' + options.postTime + '",report_summary="' + options.reportSummary + '",pv="' + options.pv + '" where id="'+options.id+'"'
	db.query(opt, function(err, rows) {
		callback(err, rows)
	});
}

//新增报告后,完善url
exports.putReportUrl=function(id,callback) {
	var opt='update reports set report_url = concat(report_url,"'+id+'") where id ="'+id+'"';
	db.query(opt, function(err, rows) {
		callback(err, rows)
	});
}

//获取所有报告
exports.list=function(callback) {
	var opt='select * from reports';
	db.query(opt, function(err, rows) {
		callback(err, rows)
	});
}

//获取指定分类报告
exports._class=function(options,callback) {
	var opt='select * from reports where frist_class REGEXP "'+options.firstClass+'" and  child_class REGEXP "'+options.childClass+'"';
	db.query(opt, function(err, rows) {
		callback(err, rows)
	});
}

//获取指定报告信息
exports.detail=function(id,callback) {
	var opt='select * from reports where id='+id;
	db.query(opt, function(err, rows) {
		callback(err, rows)
	});
}

//删除报告列表
exports.del=function(id,callback) {
	var opt='delete from reports where id='+id;
	db.query(opt, function(err, rows) {
		callback(err, rows)
	});
}

