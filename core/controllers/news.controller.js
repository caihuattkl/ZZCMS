var async = require('async');
var directoryCache = require("../services/directorys.service");
var newsMod = require("../models/news.model");
var urlValid = require("../../lib/urlValid.lib"); //检查用户访问路由是否合法
var filter = require("../../lib/filter.lib");

//频道下属栏目	
exports._class = function(req, res, next) {
	async.parallel({
		directoryCache: function(callback) {
			directoryCache(function(err, directorysdata) {
				urlValid(req, res, directorysdata, callback)
			});
		},
		classNewsList: function(callback) {
			newsMod.classNews(req, res, callback)
		},
		menus: function(callback) {
			directoryCache(function(err, data) {
				if(!err) {
					for(var i = 0; i < data.length; i++) {
						for(var n = 0; n < data[i].child.length; n++) {
							if(req.params.id == data[i].child[n].id) {
								callback(null, data[i])
							}
						}
					}
				}
			})
		},
		currentClassInfo: function(callback) {
			directoryCache(function(err, data) {
				if(!err) {
					for(var i = 0; i < data.length; i++) {
						for(var n = 0; n < data[i].child.length; n++) {
							if(req.params.id == data[i].child[n].id) {
								callback(null, data[i].child[n])
							}
						}
					}
				}
			})
		},
		crumbs: function(callback) {
			directoryCache(function(err, data) {
				if(!err) {
					for(var i = 0; i < data.length; i++) {
						for(var n = 0; n < data[i].child.length; n++) {
							if(req.params.id == data[i].child[n].id) {
								callback(null, data[i].child[n])
							}
						}
					}
				}
			})
		},
		navbarMenu: function(callback) {
			directoryCache(callback)
		}
	}, function(_error, data) {
		if(_error) return res.status(500).end('500 - Server Error');
		res.render('template/article_class', {
			crumbs: data.crumbs,
			subTitle: data.currentClassInfo.subTitle,
			keywords: data.currentClassInfo.keywords,
			description: data.currentClassInfo.description,
			classNewsList: data.classNewsList,
			menus: data.menus,
			navbarMenu: data.navbarMenu,
		})
	});
};

//频道
exports.channel = function(req, res, next) {
	async.parallel({
		//判断请求地址是否正确
		directoryCache: function(callback) {
			directoryCache(function(err, directorys) {
				urlValid(req, res, directorys, callback)
			});
		},
		channelInfo: function(callback) {
			directoryCache(function(err, data) {
				if(!err) {
					for(var i = 0; i < data.length; i++) {
						if(req.params.id == data[i].id) {
							callback(null, data[i])
						}
					}
				}
			})
		},
		channelNews: function(callback) {
			newsMod.channelNewestNews(req, res, callback)
		},
		classBlockNews: function(callback) {
			newsMod.classBlockNews(req, res, callback)
		},
		topline: function(callback) {
			newsMod.topline(req, res, callback)
		},
		navbarMenu: function(callback) {
			directoryCache(callback)
		}
	}, function(_error, result) {
		if(_error) return res.status(500).end('500 - Server Error');
		res.render('template/article_channel', {
			title: result.channelInfo.title,
			keywords: result.channelInfo.keywords,
			description: result.channelInfo.description,
			directoryName: result.channelInfo.directoryName,
			subTitle: result.channelInfo.subTitle,
			id: result.channelInfo.id,
			menus: result.channelInfo,
			constantlyNews: result.channelNews,
			classBlock: result.channelInfo,
			classBlockNews: result.classBlockNews,
			navbarMenu: result.navbarMenu,
			toplines: result.topline
		})
	});
}

//文章
exports.articles = function(req, res, next) {
	var currentPage = 1;
	if(req.params.id && req.params.id.split('-').length !== 1) {
		currentPage = req.params.id.split('-')[1].split('.html')[0];
	}
	async.parallel({
		//判断请求地址是否正确
		directoryCache: function(callback) {
			directoryCache(function(err, directorys) {
				urlValid(req, res, directorys, callback)
			});
		},
		articles: function(callback) {
			//加入面包屑,根据新闻中的分类id值去栏目缓存文件中取
			var _articles = {};
			newsMod.articles(req, res, function(err, articlesRows) {
				if(!err) {
					_articles=articlesRows;
					directoryCache(function(err1, dirs) {
						if(!err1) {
							for(var i = 0; i < dirs.length; i++) {
								if(articlesRows.classFirstId==dirs[i].id){
									_articles.classFirstid=dirs[i].id
									_articles.classFirstText=dirs[i].subTitle
									_articles.classFirstPath=dirs[i].directoryName
									for(var n = 0; n < dirs[i].child.length; n++) {
									if(articlesRows.classChildId == dirs[i].child[n].id) {
										_articles.classChildId=dirs[i].child[n].id
										_articles.classChildText=dirs[i].child[n].subTitle
										_articles.classChildPath=dirs[i].child[n].directoryName
										callback(null, _articles)
									}
								}
								}
							}
						}
					});
				}
			})
		},
		navbarMenu: function(callback) {
			directoryCache(callback)
		}
	}, function(_error, rows) {
		if(_error) return res.status(500).end('500 - Server Error');

		res.render('template/article_article', {
			currentPage: currentPage,
			countPage: rows.articles.nContent.split('{{paging}}').length,
			articles: rows.articles,
			nContent: rows.articles.nContent.split('{{paging}}').length !== 1 ? rows.articles.nContent.split('{{paging}}')[currentPage - 1] : rows.articles.nContent,
			paging: _paging(rows.articles.nContent, rows.articles.newsUrl),
			time: rows.articles.time.formatTime(),
			navbarMenu: rows.navbarMenu
		});

		function _paging(content, url) {
			var _url = url.split('.html')[0];
			for(var i = 0, arr = []; i < content.split('{{paging}}').length; i++) {
				var obj = {}
				obj.newsUrl = _url + '-' + (i + 1) + '.html';
				obj.num = i + 1;
				arr.push(obj);
			}
			return arr;
		}
	});

}