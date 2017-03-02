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
		get: "admin.login",
		post: "admin.loginPost"
	},
	'/checkcode*': {
		get: "pngCode.captchap"
	},
	//登出
	'/logout': {
		get: "admin.logout"
	},
	//验证权限
	'/admin*': {
		all: "admin.authenticated"
	},
	'/api/*': {
		all: "admin.apiAuthenticated"
	},
	/*
	 后台页面相关
	 * */
	'/admin/*.html': {
		get: "admin.adminHome"
	},
	'/admin/newsList?': {
		get: "admin.newsList"
	},
	'/admin/addNews?': {
		get: "admin.addNews"
	},
	'/admin/editNews?': {
		get: "admin.editNews"
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
	 api接口 report 报告
	 * */
	'/api/reports': {
		
		post: "api_reports.add"
	},
	'/api/reports/list': {
		get: "api_reports.list",
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
	 api接口 boffins 报告
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
		put: "api_news.putNews",
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
	'/[0-9A-Za-z_-]+/[0-9]+/:id': {
		get: 'news.articles'
	},
	'/[0-9A-Za-z_-]+/:id': {
		get: 'news.channel'
	},
	'/[a-zA-Z0-9_-]+/[a-zA-Z0-9]+/:id': {
		get: 'news._class'
	}
};