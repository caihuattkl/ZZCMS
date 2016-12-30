var db = require("../../lib/db.lib.js"),
	md5 = require("md5");

exports.users = function(req, res) {
	db.query('select id,name,time from users', function(err, data) {
		if(!err) {
			return res.json({
				code: 200,
				datas: data,
				message: "查询成功!"
			})
		}
		res.json({
			code: 500,
			message: "获取用户列表失败!",
			datas: []
		})

	})
};

exports.addUser = function(req, res) {
	var _name = req.body.name,
		_password = md5(req.body.password),
		_role = req.body.role,
		_resources = req.body.resources,
		_time = req.body.time;
	db.query('insert into users(id,name,password,role,resources,time)VALUES (id,"' + _name + '","' + _password + '","' + _role + '","' + _resources + '","' + _time + '")', function(err, data) {
		if(!err) {
			return res.json({
				code: 200,
				datas: [],
				message: "添加成功!"
			})
		}

		res.json({
			code: 500,
			datas: [],
			message: "添加失败!"
		})

	})
};

exports.getUser = function(req, res) {
	db.query('select name,time from users where id="' + req.params.id + '"', function(err, data) {
		if(!err) {
			return res.json({
				code: 200,
				datas: data,
				message: "查询成功!"
			})
		}

		res.json({
			code: 500,
			datas: [],
			message: "查询失败!"
		})

	})
};

exports.putUser = function(req, res) {
	var id = req.body.uid,
		name = req.body.name,
		password = req.body.password,
		pwd = '';

	if(password != null && password != '' && password != 'undefined') {
		pwd = " , password='" + md5(password) + "'";
	}
	var sql = 'update users set name="' + name +'"'+ pwd + 'where id="' + id + '"';
	db.query(sql, function(err, data) {
		if(!err) {
			return res.json({
				code: 200,
				datas: data,
				message: "修改成功!"
			})
		}

		res.json({
			code: 500,
			datas: [],
			message: "修改失败!"
		})

	})
};

exports.delUser = function(req, res) {
	var id = req.params.id;
	var sql = 'delete from users where id="'+id+'"';
	db.query(sql, function(err, data) {
		if(!err) {
			return res.json({
				code: 200,
				datas: data,
				message: "删除成功!"
			})
		}
		res.json({
			code: 500,
			datas: [],
			message: "删除失败!"
		})

	})
};