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
		get: "admin.authenticated"
	},
	'/api/*': {
		get: "admin.apiAuthenticated"
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
	 api接口 news 新闻api
	 * */
	'/api/news': {
		put: "api_news.putNews",
		post: "api_news.addNews",
		
	},
	'/api/newsList': {
		get: "api_news.newsList",
	},
	'/api/news/:id': {
		delete: "api_news.delNews",
		     get:"api_news.newsDetail"
	},
	'/': {
		get: 'home.home',
	},
	'/[0-9A-Za-z_-]+/[0-9]+/:id': {
		get: 'articles.articles'
	},
	'/[0-9A-Za-z_-]+/:id': {
		get: 'channel.channel'
	},
	'/[a-zA-Z0-9_-]+/[a-zA-Z0-9]+/:id': {
		get: 'class.class'
	}
};