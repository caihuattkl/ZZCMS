/**
 * 路由表
 */
module.exports = {
	/*
	 api接口 可以直接访问
	 * */
	'/api/sina/': {
		get: "api_foreign.stockIndex"
	},
	'/api/fe/': {
		get: "api_foreign.foreignExchange"
	},
	'/api/huangli/': {
		get: "api_foreign.almanac"
	},
	//登录,提交数据
	'/login': {
		get: "logins.login",
		post: "logins.loginPost"
	},
	'/checkcode*': {
		get: "logins.captchap"
	},
	//登出
	'/logout': {
		get: "logins.logout"
	},
	//验证权限
	'/admin*': {
		all: "logins.authenticated"
	},
	'/api/*': {
		all: "logins.apiAuthenticated"
	},
	/*
	 后台页面相关
	 * */
	'/admin/*.html': {
		get: "logins.adminAll"
	},
	'/admin/newsList?': {
		get: "news.newsList"
	},
	'/admin/addNews?': {
		get: "news.add"
	},
	'/admin/editNews?': {
		get: "news.edit"
	},
	/*
	报告页面相关
	 * */
	'/admin/editReports?': {
		get: "reports.edit"
	},
	/*
	 api接口 users 用户
	 * */
	'/api/users': {
		put: "api_users.putUser",
		get: "api_users.users",
		post: "api_users.addUser"
	},
	'/api/users/:id': {
		get: "api_users.getUser",
		delete: "api_users.delUser"
	},
	/*
	 api接口 newsClass 新闻分类
	 * */
	'/api/newsClass': {
		put: "api_newsClass.putNewsClass",
		post: "api_newsClass.addNewsClass",
	},
	'/api/newsClass/list': {
		get: "api_newsClass.newsClassList",
	},
	'/api/newsClass/:id': {
		delete: "api_newsClass.delNewsClass",
		get:"api_newsClass.newsClassDetail"
	},
	'/api/newsClass/:id/classList': {
		get: "api_newsClass.newsTopClassList",
	},
	/*
	 api接口 reportClass 报告分类
	 * */
	'/api/reportClass': {
		put: "api_reportClass.putReportClass",
		post: "api_reportClass.addReportClass",
		
	},
	'/api/reportClass/list': {
		get: "api_reportClass.reportClassList",
	},
	'/api/reportClass/:id': {
		delete: "api_reportClass.delReportClass",
		     get:"api_reportClass.reportClassDetail"
	},
	'/api/reportClass/:id/classList': {
		get: "api_reportClass.reportTopClassList",
	},
	/*
	 api接口 report 广告,头条
	 * */
	'/api/headlines': {
		put: "api_headlines.put",
		get:"api_headlines.detail"
	},
	'/api/ads': {
		post: "api_ads.add"
	},
	'/api/ads/list': {
		get: "api_ads.list",
	},
	'/api/ads/:id': {
		put: "api_ads.put",
		delete: "api_ads.del",
		get:"api_ads.detail"
	},
//	'/api/reports/:firstClass/:childClass/list': {
//		get: "api_ads._class",
//	},
	/*
	 api接口 report 报告
	 * */
	'/api/reports': {
		post: "api_reports.add"
	},
	'/api/reports/list': {
		get: "api_reports.list",
	},
	'/api/reports/covers': {
		get: "api_reports.reportsCovers",
	},
	'/api/reports/:id': {
		put: "api_reports.put",
		delete: "api_reports.del",
		get:"api_reports.detail"
	},
	'/api/reports/:firstClass/:childClass/list': {
		get: "api_reports._class",
	},
	/*
	 api接口 boffins 研究员
	 * */
	'/api/boffins': {
		post: "api_boffins.add"
	},
	'/api/boffins/list': {
		get: "api_boffins.list",
	},
	'/api/boffins/:id': {
//		delete: "api_boffins.del",
		put: "api_boffins.put",
		get:"api_boffins.detail"
	},
	/*
	 * 
	 api接口 news 新闻api
	 * */
	'/api/news': {
		put: "api_news.put",
		post: "api_news.add"
	},
	'/api/newsList': {
		get: "api_news.newsList",
	},
	'/api/news/:id': {
		delete: "api_news.delNews",
		     get:"api_news.newsDetail"
	},
	'/': {
		get: 'home.home'
	},
	//报告频道一级
	'/reports/': {
		get: 'reports.channel'
	},
	//报告栏目二级
	'/reports/[a-zA-Z0-9]+/': {
		get: 'reports._class'
	},
	'/reports/:id.html': {
		get: 'reports.report'
	},
	'/[0-9A-Za-z_-]+/[0-9]+/:id': {
		get: 'news.articles'
	},
	'/[0-9A-Za-z_-]+/': {
		get: 'news.channel'
	},
	//class分页
	'/[a-zA-Z0-9]+/[a-zA-Z0-9]+/': {
		get: 'news._class'
	},
	'/[a-zA-Z0-9]+/[a-zA-Z0-9]+/:id': {
		get: 'news._class'
	}
};