const formatDate = require("../core/filter/formatDate"),
	home = require("../routes/service/home"),
	admin = require("../routes/service/admin"),
	api = require("../routes/service/api"),
	userService = require("../routes/service/api.users"),
	authAdmin = require("../routes/service/auth.admin");
Authenticated = require("../routes/service/auth.Authenticated")
module.exports = function(app) {

	//前台路由
	app.get("/", home.index);
	app.get("/zhengquan/*.html", home.zhengquan);
	app.get("/qiche/*.html", home.qiche);

	//登录
	app.get("/login", function(req, res) {
		res.render('admin/login')
	})
	app.post('/login', authAdmin);
	//登出
	app.get("/logout", function(req, res) {
		req.logout();
		res.redirect('/login');
	});

	//后台路由过滤
	app.all("/admin*", Authenticated);
	app.all("/api*", Authenticated);

	app.get("/admin/*.html", admin.home)
	app.get("/admin/newsList?", admin.newsList)
	app.get("/admin/addNews?", admin.addNews)
	app.get("/admin/editNews?", admin.editNews)

	//api路由 用户管理
	app.put("/api/users", userService.putUser)
	app.get("/api/users/:id", userService.getUser); //指定用户
	app.get("/api/users", userService.users); //用户列表
	app.post("/api/users", userService.addUser); //新增用户
	app.delete("/api/users/:uid", userService.delUser)

	//api路由 报告分类
	app.post("/api/reportClass", api.addReportClass); //新增报告分类
	app.delete("/api/reportClass/:id", api.delReportClass); // 删除报告分类
	app.put("/api/reportClass", api.putReportClass); //修改报告分类
	app.get("/api/reportClass/list", api.reportClassList); //报告分类列表
	app.get("/api/reportClass/:id", api.reportClassDetail); //某条信息
	app.get("/api/reportClass/:id/classList", api.reportTopClassList); //获取报告所有顶级分类

	//api路由 新闻分类
	app.post("/api/newsClass", api.addNewsClass); //新增新闻分类
	app.delete("/api/newsClass/:id", api.delNewsClass); // 删除新闻分类
	app.put("/api/newsClass", api.putNewsClass); //修改新闻分类
	app.get("/api/newsClass/list", api.newsClassList); //新闻分类列表
	app.get("/api/newsClass/:id/classList", api.newsTopClassList); //获取新闻所有顶级分类
	app.get("/api/newsClass/:id", api.newsClassDetail); //新闻分类某条记录
	app.get("/api/newsClass/list", api.newsClassList); //新闻分类列表

	//api路由 新闻
	app.post("/api/news", api.addNews); //新增新闻
	app.delete("/api/news/:id", api.delNews); // 删除新闻
	app.put("/api/news", api.putNews); //修改新闻
	app.get("/api/news/:newsId", api.newsDetail); //指定新闻
	app.get("/api/newsList", api.newsList); //新闻列表

}