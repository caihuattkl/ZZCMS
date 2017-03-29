var async = require('async');
var CacheClassServices = require("../services/cacheClass.service");
var newsMod = require("../models/news.model");
var urlValid = require("../../lib/urlValid.lib"); //检查用户访问路由是否合法
var filter = require("../../lib/filter.lib");

//栏目
exports._class = function(req, res, next) {
	//	console.log("进入栏目啦!")
	async.auto({
		//检查url,返回对应的栏目id
		cheackUrl: function(callback) {
			CacheClassServices.cacheNewsClass(function(err, data) {
				urlValid._class(req, res, data, callback)
			});
		},
		classNewsList: ['cheackUrl', function(classId, callback) {
			//新闻列表翻页 pagings对象
			var pagings = {};
			pagings.classId = classId.cheackUrl //当前栏目ID
			pagings.perPageSize = 10; //每页记录数
			pagings.curPage = req.params.id || 1; //当前页
			pagings.star = pagings.curPage * pagings.perPageSize - pagings.perPageSize; //开始
			pagings.end = pagings.curPage * pagings.perPageSize; //结束

			newsMod.classNews(pagings, function(err, rows) {
				if(err) { return res.status(500).end('500 - Server Error') }
				pagings.data = rows;
				pagings.pageNum = [];
				pagings.total = rows.length ? rows[0].total : 1;
				for(var i = 0; i < Math.ceil(pagings.total / 10); i++) {
					pagings.pageNum.push(i + 1)
				}
				callback(null, pagings)
			})
		}],
		menus: ['cheackUrl', function(classId, callback) {
			CacheClassServices.cacheNewsClass(function(err, data) {
				if(err) { return res.status(500).end('500 - Server Error') }
				for(var i = 0; i < data.length; i++) {
					for(var n = 0; n < data[i].child.length; n++) {
						if(classId.cheackUrl == data[i].child[n].id) {
							callback(null, data[i])
						}
					}
				}
			})
		}],
		currentClassInfo: ['cheackUrl', function(classId, callback) {
			CacheClassServices.cacheNewsClass(function(err, data) {
				if(err) { return res.status(500).end('500 - Server Error') }
				for(var i = 0; i < data.length; i++) {
					for(var n = 0; n < data[i].child.length; n++) {
						if(classId.cheackUrl == data[i].child[n].id) {
							callback(null, data[i].child[n])
						}
					}
				}

			})
		}],
		crumbs: ['cheackUrl', function(classId, callback) {
			CacheClassServices.cacheNewsClass(function(err, data) {
				if(err) { return res.status(500).end('500 - Server Error') }
				for(var i = 0; i < data.length; i++) {
					for(var n = 0; n < data[i].child.length; n++) {
						if(classId.cheackUrl == data[i].child[n].id) {
							callback(null, data[i].child[n])
						}
					}
				}
			})
		}],
		navbarMenu: function(callback) {
			CacheClassServices.cacheNewsClass(callback)
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
	var obj = {};
	async.parallel({
		//判断请求地址是否正确
		CacheClassServices: function(callback) {
			CacheClassServices.cacheNewsClass(function(err, directorys) {
				urlValid.channel(req, res, directorys, callback)
			});
		},
		channelInfo: function(callback) {
			CacheClassServices.cacheNewsClass(function(err, data) {
				if(err) { return res.status(500).end('500 - Server Error') }
				for(var i = 0; i < data.length; i++) {
					if(req.url.substr(1).split('/')[0] == data[i].directoryName) {
						callback(null, data[i])
					}
				}
			})
		},
		channelNews: function(callback) {
			CacheClassServices.cacheNewsClass(function(err, data) {
				if(err) { return res.status(500).end('500 - Server Error') }
				for(var i = 0; i < data.length; i++) {
					if(req.url.substr(1).split('/')[0] == data[i].directoryName) {
						obj.channelId = data[i].id;
						newsMod.channelNewestNews(obj, callback)
					}
				}
			})
		},
		classBlockNews: function(callback) {
			CacheClassServices.cacheNewsClass(function(err, data) {
				if(err) { return res.status(500).end('500 - Server Error') }
				newsMod.classBlockNews(obj, callback)
			})
		},
		topline: function(callback) {
			newsMod.topline(obj, callback)
		},
		navbarMenu: function(callback) {
			CacheClassServices.cacheNewsClass(callback)
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
//	console.log("news.articles")
	async.auto({
		//判断新闻请求地址是否正确
		cheackUrl: function(callback) {
			CacheClassServices.cacheNewsClass(function(err, directorys) {
				urlValid.articles(req, res, directorys, callback)
			});
		},
		cacheClass: function(callback) {
			CacheClassServices.cacheNewsClass(callback);
		},
		articles: ['cacheClass', function(cacheClass, callback) {
			//加入面包屑,根据新闻中的分类id值去栏目缓存文件中取
			newsMod.articles(req, res, function(err, rows) {
				if(err) { return res.status(500).end('500 - Server Error')}
				var _articles = {};_articles.curPage = 1;
				//获取最新当前页
				(req.params.id && req.params.id.split('-').length !== 1)&&(_articles.curPage = req.params.id.split('-')[1].split('.html')[0])
				_articles.data = rows;
				for(var i = 0; i < cacheClass.cacheClass.length; i++) {
					if(rows.classFirstId == cacheClass.cacheClass[i].id) {
						_articles.data.classFirstid = cacheClass.cacheClass[i].id
						_articles.data.classFirstText = cacheClass.cacheClass[i].subTitle
						_articles.data.classFirstPath = cacheClass.cacheClass[i].directoryName
						for(var n = 0; n < cacheClass.cacheClass[i].child.length; n++) {
							if(rows.classChildId == cacheClass.cacheClass[i].child[n].id) {
								_articles.data.classChildId = cacheClass.cacheClass[i].child[n].id
								_articles.data.classChildText = cacheClass.cacheClass[i].child[n].subTitle
								_articles.data.classChildPath = cacheClass.cacheClass[i].child[n].directoryName
								callback(null, _articles)
							}
						}
					}
				}
			})
		}]
	}, function(_error, rows) {
		if(_error) return res.status(500).end('500 - Server Error');
		res.render('template/article_article', {
			currentPage: rows.articles.curPage,
			countPage: rows.articles.data.nContent.split('{{paging}}').length,
			articles: rows.articles.data,
			nContent: rows.articles.data.nContent.split('{{paging}}').length !== 1 ? rows.articles.data.nContent.split('{{paging}}')[rows.articles.curPage - 1] : rows.articles.data.nContent,
			paging: _paging(rows.articles.data.nContent, rows.articles.data.newsUrl),
			time: rows.articles.data.time.formatTime(),
			navbarMenu: rows.cacheClass
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



//后台新闻增删改查
exports.add = function(req, res, next) {
	 newsMod.add(req, res, function(err,rows) {
	 	if(err) return res.status(500).end('500 - Server Error');
		res.render('admin/addNews', {
			classChildId: req.query.classChildId,
			classFirstId: req.query.classFirstId,
			directoryName:rows[0].directoryName,
			dayDate:new Date().dayDate()
		});
	})
};

exports.edit = function(req, res, next) {
	res.render('admin/editNews', {
		newsId: req.query.newsId,
		classFirstId: req.query.classFirstId,
		classChildId: req.query.classChildId
	});
};

exports.infoRepertoryEdit = function(req, res, next) {
	res.render('admin/infoRepertoryEdit', {
		newsId: req.query.newsId,
		classFirstId: req.query.classFirstId,
		classChildId: req.query.classChildId
	});
};
exports.newsList = function(req, res, next) {
	res.render('admin/newsList', {
		newsClassId: req.query.newsClassId
	});
};