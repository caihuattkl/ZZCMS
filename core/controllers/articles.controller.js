const db = require("../../lib/db.lib.js"),
	async = require('async'),
	logger = require('morgan'),
	directorySev = require("../services/directorys.service"),
	articlesMod = require("../models/articles.model"),
	filter = require("../../lib/filter.lib"),
	navsCache = require("../services/navs.service"); //公共菜单数据;
	
exports.articles = function(req, res, next) {
	var currentPage=1;
	if(req.params.id && req.params.id.split('-').length!==1){
		currentPage=req.params.id.split('-')[1].split('.html')[0];
	}
	directorySev(req, res, function(err, dir) {
		if(!err && dir) {
			navsCache(function(err2, data2) {
				return articlesMod.articles(req, res, function(sqlErr, rows) {
					if(sqlErr && rows.length != 0) { throw sqlErr;}
					res.render('template/article_article', {
							currentPage:currentPage,
							countPage:rows[0].nContent.split('{{paging}}').length,
							classFirstId: rows[1].keywords,
							classChildId: rows[2].keywords,
							classFirstText: rows[1].subTitle,
							classFirstDirectoryName: rows[1].subKeywords,
							classChildText: rows[2].subTitle,
							classChildDirectoryName: rows[2].subKeywords,
							subTitle: rows[0].subTitle,
							newsUrl:rows[0].newsUrl,
							nContent: rows[0].nContent.split('{{paging}}').length!==1?rows[0].nContent.split('{{paging}}')[currentPage-1]:rows[0].nContent,
							paging: _paging(rows[0].nContent,rows[0].newsUrl),
							title:rows[0].title,
							keywords:rows[0].keywords,
							description:rows[0].description,
							time: filter.formatDate(rows[0].time, 'yyyy-MM-dd HH:mm:ss'),
							conNav:data2
						});
						
						function _paging(content,url){
							var _url=url.split('.html')[0];
							for(var i=0,arr=[];i<content.split('{{paging}}').length;i++){
								var obj={}
								obj.newsUrl=_url+'-'+(i+1)+'.html';
								obj.num=i+1;
								arr.push(obj);
							}
							return arr;
						}
						
						
				})
			})
		}else{
			return res.status(404).send('Not Found');
		}
	})
};