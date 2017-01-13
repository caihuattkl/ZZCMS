$(function() {
	$("#zhishu>dl:first-child>dd").show();
	$("#zhishu>dl").on('click', function() {
		$("#zhishu>dl>dd").hide();
		$(this).children('dd').show();
	});
	getStockIndex()
})

//上证综指
function szzz(res,just) {
	$("#zhishu .sh000001").html(parseFloat(res.data.match(/hq_str_s_sh000001=".*";/)[0].split(",")[1]).toFixed(2));
	$("#zhishu .sh000001Index").html(just+parseFloat(res.data.match(/hq_str_s_sh000001=".*";/)[0].split(",")[2]).toFixed(2));
	$("#zhishu .sh000001Range").html(just+res.data.match(/hq_str_s_sh000001=".*";/)[0].split(",")[3] + '%');
	$("#zhishu img.sh000001").attr("src", 'http://image.sinajs.cn/newchart/hollow/small/nsh000001.gif?' + (+new Date()))
}

//深证成指
function szcz(res,just) {
	$("#zhishu .sz399001").html(parseFloat(res.data.match(/hq_str_s_sz399001=".*";/)[0].split(",")[1]).toFixed(2))
	$("#zhishu .sz399001Index").html(just+parseFloat(res.data.match(/hq_str_s_sz399001=".*";/)[0].split(",")[2]).toFixed(2))
	$("#zhishu .sz399001Range").html(just+res.data.match(/hq_str_s_sz399001=".*";/)[0].split(",")[3] + '%')
	$("#zhishu img.sz399001").attr("src", 'http://image.sinajs.cn/newchart/hollow/small/nsz399001.gif?' + (+new Date()))
}

//沪深300
function hs300(res,just) {
	$("#zhishu .sh000300").html(parseFloat(res.data.match(/hq_str_s_sh000300=".*";/)[0].split(",")[1]).toFixed(2))
	$("#zhishu .sh000300Index").html(just+parseFloat(res.data.match(/hq_str_s_sh000300=".*";/)[0].split(",")[2]).toFixed(2))
	$("#zhishu .sh000300Range").html(just+res.data.match(/hq_str_s_sh000300=".*";/)[0].split(",")[3] + '%')
	$("#zhishu img.sh000300").attr("src", 'http://image.sinajs.cn/newchart/hollow/small/nsh000300.gif?' + (+new Date()))
}
//创业板指
function cybz(res,just) {
	$("#zhishu .sz399006").html(parseFloat(res.data.match(/hq_str_s_sz399006=".*";/)[0].split(",")[1]).toFixed(2))
	$("#zhishu .sz399006Index").html(just+parseFloat(res.data.match(/hq_str_s_sz399006=".*";/)[0].split(",")[2]).toFixed(2))
	$("#zhishu .sz399006Range").html(just+res.data.match(/hq_str_s_sz399006=".*";/)[0].split(",")[3] + '%')
	$("#zhishu img.sz399006").attr("src", 'http://image.sinajs.cn/newchart/hollow/small/nsz399006.gif?' + (+new Date()))
}

function getStockIndex() {
	$.get('/api/sina/', function(res) {
		var sh000001 = $("#zhishu span.sh000001,.sh000001Index,.sh000001Range");
		var sz399001 = $("#zhishu span.sz399001,.sz399001Index,.sz399001Range");
		var sh000300 = $("#zhishu span.sh000300,.sh000300Index,.sh000300Range");
		var sz399006 = $("#zhishu span.sz399006,.sz399006Index,.sz399006Range");
		if(res.code == 200 && res.data.length != 0) {
			if(parseFloat(res.data.match(/hq_str_s_sh000001=".*";/)[0].split(",")[2]).toFixed(2) > 0) {
				$(sh000001).removeClass("greenff").addClass("redff");
				$(sh000001).addClass("redBg").delay(2000).fadeIn(function() {
					$(this).removeClass("redBg")
				})

				szzz(res,"+");

			} else {
				$(sh000001).removeClass("redff").addClass("greenff");
				$(sh000001).addClass("greenBg").delay(2000).fadeIn(function() {
					$(this).removeClass("greenBg")
				})
				szzz(res,'');
			}

			//深证成指
			if(parseFloat(res.data.match(/hq_str_s_sz399001=".*";/)[0].split(",")[2]).toFixed(2) > 0) {
				$(sz399001).removeClass("greenff").addClass("redff");
				$(sz399001).addClass("redBg").delay(2000).fadeIn(function() {
					$(this).removeClass("redBg")
				})

				szcz(res,"+")
			} else {
				$(sz399001).removeClass("redff").addClass("greenff");
				$(sz399001).addClass("greenBg").delay(2000).fadeIn(function() {
					$(this).removeClass("greenBg")
				})
				szcz(res,'')
			}

			if(parseFloat(res.data.match(/hq_str_s_sh000300=".*";/)[0].split(",")[2]).toFixed(2) > 0) {
				
				$(sh000300).removeClass("greenff").addClass("redff");
				
				$(sh000300).addClass("redBg").delay(2000).fadeIn(function() {
					$(this).removeClass("redBg")
				})

				hs300(res,"+");

			} else {
				$(sh000300).removeClass("redff").addClass("greenff");
				$(sh000300).addClass("greenBg").delay(2000).fadeIn(function() {
					$(this).removeClass("greenBg")
				})
				hs300(res,'');
			}

			if(parseFloat(res.data.match(/hq_str_s_sz399006=".*";/)[0].split(",")[2]).toFixed(2) > 0) {
				$(sz399006).removeClass("greenff").addClass("redff");
				$(sz399006).addClass("redBg").delay(2000).fadeIn(function() {
					$(this).removeClass("redBg")
				})

				cybz(res,"+")

			} else {
				$(sz399006).removeClass("redff").addClass("greenff");
				$(sz399006).addClass("greenBg").delay(2000).fadeIn(function() {
					$(this).removeClass("greenBg")
				})
				cybz(res,'');
			}

		}
	})
}

function nowTime() {
	var date = new Date(+new Date()); //获取一个时间对象
	h = date.getHours() + ':';
	m = date.getMinutes();
	return h + m;
}

function amTime(beginTime, endTime, varTime) {
	var strb = beginTime.split(":");
	if(strb.length != 2) {
		return false;
	}
	var stre = endTime.split(":");
	if(stre.length != 2) {
		return false;
	}
	var strv = varTime.split(":");
	if(strv.length != 2) {
		return false;
	}
	var b = new Date();
	var e = new Date();
	var v = new Date();
	b.setHours(strb[0]);
	b.setMinutes(strb[1]);
	e.setHours(stre[0]);
	e.setMinutes(stre[1]);
	v.setHours(strv[0]);
	v.setMinutes(strv[1]);
	if((v.getTime() - b.getTime() >= 0 && (e.getTime() - v.getTime()) > 0)) {
		return true;
	} else {
		return false;
	}
}

function reloadTime() {
	if(amTime("9:30", "11:30", nowTime())) {
		getStockIndex();
	}
	if(amTime("13:00", "15:00", nowTime())) {
		getStockIndex();
	}
}
setInterval(reloadTime, 5000);