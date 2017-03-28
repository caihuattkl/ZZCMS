var ajaxConfig={};
    //新闻分类
	ajaxConfig.newsClassList="/api/newsClass/list"; //新闻分类列表
	ajaxConfig.newsClass="/api/newsClass"; //新闻分类增删改 带参数
	ajaxConfig.news="/api/news"; //新闻增删改 带参数
	ajaxConfig.newsList="/api/newsList"; //新闻增删改 带参数
	
	ajaxConfig.reportClassList = "/api/reportClass/list"; //报告分类列表
	ajaxConfig.reportClass = "/api/reportClass"; //报告分类增删改 带参数
	
	//用户
	ajaxConfig.users = "/api/users"; //用户
	
	//报告
	ajaxConfig.reportsList = "/api/reports/list"; //报告
	ajaxConfig.reports="/api/reports"; //报告增删改 带参数
	
//给jquery增加form序列化json方法 $("xxx").serializeObject()
$.fn.serializeObject = function() {
	var o = {};
	var a = $(this).serializeArray();
	$.each(a, function() {
		if(o[this.name]) {
			if(!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
}

//给jquery增加公共ajax方法 $._ajax()
$.extend({
	_ajax: function(config) {
		var _config = {
			contentType: "application/json",
			error: function(response) {
				alert('系统内部处理错误!');
			}
		};
		$.extend(true, _config, config);
		_config.success = function(res) {
			if(res.errorDbTip) {
				alert(res.errorDbTip)
			} else {
				if(config.success) {
					config.success(res);
				}
			}
		};
		$.ajax(_config.url, _config);
	}
})

//增加delete快捷方法
$.extend({
	delete: function(url,callback) {
		$.ajax({
			type:"delete",
			url:url,
			async:true,
			success:function(res){
				callback(null,res)
			},
			error:function(err){
				callback(err)
			}
		});
	}
})


//获取当前时间 yyyy-mm-dd hh:mm:ss
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
		" " + date.getHours() + seperator2 + date.getMinutes() +
		seperator2 + date.getSeconds();
	return currentdate;
}

//格式化带T的时间
function formatDate(tDate) {
	return new Date(+new Date(tDate)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
}

Array.prototype.uniqueArr = function() {
    var res = [];
　　var json = {};
　　for(var i = 0; i < this.length; i++){
　　　　if(!json[this[i]]){
　　　　　　res.push(this[i]);
　　　　　　json[this[i]] = 1;
　　　　}
　　}
　　return res;
};

Array.prototype._splice = function(i) {
	var tmp=this.slice();
	tmp.splice(i, 1);
	return tmp;
};

