var spidersSync = require("../../lib/spiders.lib");
var dbSync = require("../../lib/dbSync.lib");
var spidersImg=require("../../lib/spidersImg.lib");

//新浪科技
var spiderSina = async() => {
	// 使用同步
	var userListCode = await spidersSync.spider("http://finance.sina.com.cn/", "utf-8");
	var newsList = userListCode.match(/<div class="BigPic" id="BigPic_1">[\s\S].+?<\/div>/)[0].match(/http[^"]+shtml/g);//新闻地址
	var newsImgList = userListCode.match(/<div class="BigPic" id="BigPic_1">[\s\S].+?<\/div>/)[0].match(/http[^"]+(jpg|gif|png)/g);//新闻封面图
	
	var newsCode,newsTitle,newsContent,newsURI,existsNews,insertNews,delToplines,insertToplines,newsImg;//新闻源码
	if(newsList.length != 0) {
		//清空以前设置的科技头条
		delToplines=await dbSync.query('delete from topline WHERE id in (select id from (SELECT id from topline WHERE newsNumber =55) as t)')
		for(var i=0;i<newsList.length;i++){
			newsImg=await spidersImg.spider(newsImgList[i]);
			newsCode = await spidersSync.spider(newsList[i], "utf-8");
			newsTitle = /<title>(.+?)(?:_|\|).+?<\/title>/gi.exec(newsCode)[1]
			newsContent = /<div class="article article_16" id="artibody">([\s\S]+)(?:<!--[\s]+原始正文end)/gi.exec(newsCode)[1].replace(/<.[^>]*>/g, '').replace(/^(.+)([。|”|\.|\S])\s/g, '<p>$1$2</p>').replace(/([。|”])+([　]{2,})/g, '$1</p><p>　　').replace(/(^[　]{2,})|([^>])([　]{2,})/g, '$2</p><p>　　').replace(/^(<\/p>)([\s\S]+)$/g, '$2</p>')
			newsURI = "keji/" + nowGetDate() + "/" + (Math.floor(Math.random() * 900) + 100) + String(+new Date()).substr(8, 5) + ".html";
			//判断数据库中是否添加过该条新闻
			existsNews=await dbSync.query('SELECT id from news WHERE newsUrl="' + newsURI + '"');
			if(existsNews.length==0){
			//插入新闻
			insertNews=await dbSync.query('INSERT INTO news(id, classFirstId, classChildId, coverImg,title, description, keywords, subTitle, subKeywords, newsUrl, source, author, time, nContent, pv) VALUES (id, "55", "57","' + newsImg + '", "' + newsTitle + '", "' + newsTitle + '", "' + newsTitle + '", "' + newsTitle + '","' + newsTitle + '","' + newsURI + '", "source", "author", "2017-01-18 17:27:42", "' + newsContent + '", "100")');
			insertToplines=await dbSync.query('INSERT INTO topline(id, newsId,newsNumber) values(id,"' + insertNews.insertId + '","' + 55 + '")')
			console.log("更新科技头条成功!" + insertToplines.insertId)
			}
		}
	}


								
								
	
								
}

//获取年月日
function nowGetDate() {
	var date = new Date(); //获取一个时间对象
	yy = date.getFullYear();
	mm = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
	dd = date.getDate();
	return yy + mm + dd;
}

//间隔一段时间执行

module.exports = spiderSina

//function() {
//	setInterval(function() {
//		spiderSina()
//	}, 1000 * 60)
//}