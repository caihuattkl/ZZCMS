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

//给jquery增加公共ajax方法 $.publicAjax()
$.extend({
	publicAjax: function(config) {
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

//判断IE浏览器版本
var isIe = function(ver) {
	var b = document.createElement('b')
    b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
    return b.getElementsByTagName('i').length === 1
}