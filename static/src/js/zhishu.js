$(function(){
	//获取上证指数!
	var urlConfig={};
	urlConfig.zhishu="http://web.juhe.cn:8080/finance/stock/hs?gid=sz300104&key=2217471da7d2e8d1b99047eb22ae0158&type=1";
	window.open(urlConfig.zhishu);
	
	return;
	$.publicAjax({
		type:"get",
		url:"urlConfig.zhishu",
		async:true,
		success:function(res){
			console.log(res)
		}
	});
	
	
	
})
