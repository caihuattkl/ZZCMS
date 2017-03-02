//时间格式化
Date.prototype.formatTime=function(){
var date = new Date(Date.parse(this));
console.log(date)
return date.getFullYear() + "-" + ((date.getMonth() +1)<10?'0'+(date.getMonth() +1):(date.getMonth() +1))+'-'+
(date.getDate()<10?'0'+date.getDate():date.getDate())+' '+ date.getHours()+':'+date.getMinutes()+':'+
(date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds());
}

//提交新闻时,过滤内容冒号
String.prototype.filterColon=function(){
	return this.replace(/"/g,'""');
}
