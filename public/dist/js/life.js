$(function(){
	getAlmanacData();
})

function getAlmanacData(){
	$.get('/api/huangli/',function(res){
		if(res.error_code==0&&res.result.length!=0){
			console.log(res.result)
			$("#shenghuo h3").empty().append('公历　'+res.result.yangli.replace(/(\d+)-(\d+)-(\d+)/,'$1年 $2月 $3日')+'　'+getDay()+'　(阳历)')
			$("#shenghuo p").empty().append('农历　'+res.result.yinli+'　(阴历)')
			$("#shenghuo #currentDate .yue").empty().append(res.result.yangli.split('-')[1]);
			$("#shenghuo #currentDate .ri").empty().append(res.result.yangli.split('-')[2]);
			$("#shenghuo ul li.wuxing").empty().append("五　　行："+res.result.wuxing);
			$("#shenghuo ul li.chongsha").empty().append("冲　　煞："+res.result.chongsha);
			$("#shenghuo ul li.baiji").empty().append("彭祖百忌："+res.result.baiji);
			$("#shenghuo ul li.jishen").empty().append("吉神宜趋："+res.result.jishen);
			$("#shenghuo ul li.yi").empty().append("　　　宜："+res.result.yi);
			$("#shenghuo ul li.xiongshen").empty().append("凶神宜忌："+res.result.xiongshen);
			$("#shenghuo ul li.ji").empty().append("　　　忌："+res.result.ji);
		}
	})
}

function getDay(){
	return new Date().getDay()==1?'星期一':
	new Date().getDay()==2?'星期二':
	new Date().getDay()==3?'星期三':
	new Date().getDay()==4?'星期四':
	new Date().getDay()==5?'星期五':
	new Date().getDay()==6?'星期六':'星期天';
}
//setInterval("getQuotationData()",5000)