var logger = require('./logger.lib');

module.exports=function(req, res,directorys,callback){
	var reqUrl=req.url.substr(1).split('/'),errInfo='Cannot find corresponding directory';
	for(var i=0;i<directorys.length;i++){
		
		if(reqUrl.length==2&&directorys[i].directoryName==reqUrl[0]){
			return  callback(null,directorys[i].directoryName)
		}
		
		if(reqUrl.length==3&&directorys[i].directoryName==reqUrl[0]){
			for(var n=0;n<directorys[i].child.length;n++){
				if(directorys[i].child[n].directoryName==reqUrl[1]){
				return  callback(null,directorys[i].child[n].directoryName)
				}
			}
		}
		
		//针对新闻单独处理
		if(reqUrl.length==3&&new RegExp(/[0-9]+/).test(reqUrl[1])){
			return  callback(null,'win')
		}
	}
	
	logger.system().error(__filename,errInfo);
	return callback(errInfo);
}