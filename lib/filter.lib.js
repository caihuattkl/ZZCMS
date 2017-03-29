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


//获取当天日期
Date.prototype.dayDate=function(){
	var MM=(this.getMonth()+1)<10?('0'+(this.getMonth()+1)):this.getMonth()+1,
	DD=this.getDate()<10?("0"+this.getDate()):this.getDate();
	return this.getFullYear()+''+MM+''+DD
}


//过滤出指定位置的广告位置
Object.prototype.screeningAd=function(sn){
	if(sn){
		for(var key in this){
			if(this[key].adNumber==sn){
				return this[key];
			}
		}
	}
}

//判断对象是否是空对象,是为ture,否则false
Object.prototype.isEmptyObject=function() {
    for(var i in this){
    if(this.hasOwnProperty(i)){
      return false;
    }
  }
  return true;
}