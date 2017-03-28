var ajaxConfig = {};
//新闻分类
ajaxConfig.newsClassList = "/api/newsClass/list"; //新闻分类列表
ajaxConfig.newsClass = "/api/newsClass"; //新闻分类增删改 带参数
ajaxConfig.news = "/api/news"; //新闻增删改 带参数
ajaxConfig.newsList = "/api/newsList"; //新闻增删改 带参数

ajaxConfig.reportClassList = "/api/reportClass/list"; //报告分类列表
ajaxConfig.reportClass = "/api/reportClass"; //报告分类增删改 带参数

//用户
ajaxConfig.users = "/api/users"; //用户
//研究员
ajaxConfig.boffins = "/api/boffins"; //增删改 带参数
ajaxConfig.boffinsList = "/api/boffins/list"; 
//报告
ajaxConfig.reportsList = "/api/reports/list"; //报告
ajaxConfig.reports = "/api/reports"; //报告增删改 带参数

//广告

ajaxConfig.adsList = "/api/ads/list"; //报告
ajaxConfig.Ads="/api/ads"
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
	delete: function(url, callback) {
		$.ajax({
			type: "delete",
			url: url,
			async: true,
			success: function(res) {
				callback(null, res)
			},
			error: function(err) {
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
	return new Date(+new Date(tDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
}

Array.prototype.uniqueArr = function() {
	var res = [];　　
	var json = {};　　
	for(var i = 0; i < this.length; i++) {　　　　 if(!json[this[i]]) {　　　　　　 res.push(this[i]);　　　　　　
			json[this[i]] = 1;　　　　 }　　 }　　
	return res;
};

Array.prototype._splice = function(i) {
	var tmp = this.slice();
	tmp.splice(i, 1);
	return tmp;
};

//提交表单
$.fn.validataForm = function(opt, callback) {
	$("[data-toggle='tooltip']").tooltip();
	$(this).validate({
		rules: opt.rules,
		messages: opt.messages,
		errorPlacement: function(error, element) {
			$(element).tooltip('destroy'); /*隐藏并销毁元素的提示工具*/
			$(element).attr({'title': $(error).text(),'data-content': $(error).text()}).tooltip('show');
		},
		highlight: function(element, errorClass, validClass) {
			$(element).attr({'data-placement':'auto bottom','style': 'border:1px solid red'}).tooltip('show');
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element).tooltip('destroy').removeClass(errorClass).removeAttr('style');
		},
		submitHandler: function(form, e) {
			callback(e, form)
		}
	});
	//增加自定义验证
	$.validator.addMethod("dates",function(value,element,params){
                var dates= /^[\d]{4}-[\d]{2}-[\d]{2}\s[\d]{2}:[\d]{2}:[\d]{2}$/;  
                return this.optional(element)||(dates.test(value));  
            },"日期格式不正确!必须为YY-MM-DD hh:mm:ss");
            
    // 只能输入英文
	$.validator.addMethod("english", function(value, element) {
    var chrnum = /^([a-z]+)$/;
    return this.optional(element) || (chrnum.test(value));
}, "必须输入英文字母");
	
}