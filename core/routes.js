var path = require('path');
var lodash = require('lodash');
var router = require('express').Router();
var requireAll = require('require-all');
var routerTable = require('../lib/router-table.lib');

/**
 * 读取控制器
 */
var controllers = requireAll({
	dirname: path.join(__dirname, '../core/controllers/'),
	filter: /(.+)\.controller\.js$/
});

/**
 * 递归绑定控制器
 * @param  {Object} Router JSON
 */
(function loop(map, route) {
	route = route || '';
	//遍历路由表
	lodash.forEach(map, function(value, key) {

		if(lodash.isObject(value) && !lodash.isArray(value)) {
			loop(value, route + key);
		} else {
			var controller;
			var action;
			if(lodash.isString(value)) {
				// get: 'controller.action'
				// 获取控制器和动作
				controller = value.split('.')[0];
				action = value.split('.')[1];
			} else if(lodash.isArray(value)) {
				// get: [10000, function(){ ... }]
				// 权限数组
				var authorities = lodash.filter(value, function(item) {
					return lodash.isNumber(item);
				});

				// 控制器数组
				var controllerRouters = lodash.filter(value, function(item) {
					return lodash.isString(item);
				});

				// 获取权限
				if(!lodash.isEmpty(authorities)) router[key](route, controllers.validation(authorities));

				// 获取控制器和动作
				if(!lodash.isEmpty(controllerRouters)) {
					controller = controllerRouters[0].split('.')[0];
					action = controllerRouters[0].split('.')[1];
				}
			}

			if(action) {
				router[key](route, controllers[controller][action]);
			} else if(controller) {
				router[key](route, controllers[controller]);
			}
		}
	});
})(routerTable);

module.exports = router;