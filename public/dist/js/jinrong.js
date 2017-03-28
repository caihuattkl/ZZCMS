$(function(){
	getQuotationData();
})

function getQuotationData(){
	$.get('/api/fe/',function(res){
		if(res.resultcode==200&&res.result.length!=0){
			var html='<dl><dt><ul class="rup"><li>货币对</li><li>最新价</li><li>涨跌</li><li>时间</li></ul></dt></dl>'
			for(var key in res.result[0]){
				var color=res.result[0][key].diffPer.split('%')[0]>0?'red':'green';
				if(key!='data2'&&key!='data5'&&key!='data11'&&key!='data12'&&key!='data13'){
					
				html+='<dl><dt><ul class="rup"><li>'+res.result[0][key].currency+'</li><li style="color:#848406">'+res.result[0][key].closePri+'</li><li style="color:'+color+';">'+res.result[0][key].diffPer.split('%')[0]+'</li><li>'+res.result[0][key].datatime.substr(0,5)+'</li></ul></dt></dl>'
				}
			}
			$("#huobiList").empty().append(html)
		}
	})
}

setInterval("getQuotationData()",1000*60*20)