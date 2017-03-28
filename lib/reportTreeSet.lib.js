module.exports = function(tempReportClass, reportTreeChildClassDetailsArr) {
	var reportClassArr = [],obj={};
	var _tmpArr = [],tmpArr = [];

	/*在分类中插入报告数据*/
	for(var i=0;i<tempReportClass.length;i++){
		obj=tempReportClass[i];
		tempReportClass[i].child.forEach(function(val, ind) {
			val.data=[];
			reportTreeChildClassDetailsArr.forEach((_v, _i) => {
				if(val.id == _v.child_class) {
					obj.child[ind].data.push(_v)
				}
			})
		})
		reportClassArr.push(obj)
	}
	
	//根据二位数组来排列首页的报告树
	for(var n = 0; n < exports.reportTreeCore.length; n++) {
		_tmpArr = []; //清空数组
		for(var k = 0; k < exports.reportTreeCore[n].length; k++) {
			reportClassArr.forEach(function(v, i) {
				if(exports.reportTreeCore[n][k] == v.sub_title) {
					_tmpArr[_tmpArr.length] = v;
				}
				reportClassArr[i].child.forEach(function(val, ind) {
					if(exports.reportTreeCore[n][k] == val.sub_title) {
						_tmpArr[_tmpArr.length] = val;
					}
				})
			})
		}
		tmpArr[n] = _tmpArr;
	}

	return tmpArr;
}

exports.reportTreeCore = [
	["环保", "能源","固废处理","大气控制","新能源","天然气","石油"],
	["金融", "文化","现代金融","保险","银行","互联网","教育传媒出版"],
	["旅游酒店餐饮", "食品产业","旅游业","酒店业","餐饮业","烟酒类","乳制品"],
	["机械", "电气仪器与器材","通用机械","专用机械","电力设备","运输设备"],
	["医疗医药保健","医疗保健","医药产业","医疗器械"],
	["车辆", "交通物流","汽车零部件","汽车服务","车辆周边","水运港口","航空机场","铁路公路"],
	["房地产", "建筑装修","地产开发","地产中介","物业管理","木材家具"],
	["轻工业","文体用品","木材家具","印刷包装"],
	["化工日化","塑料橡胶","原材料","化学制品","其他化工"],
	["建材冶金","建筑材料","装饰材料","冶金工业"],
	["家电", "电脑数码","白色家电","黑色家电","小家电","消费电子"],
	["农林牧渔","现代农业","农业种植","林业","畜牧业","渔业","养殖业","深加工"]
]