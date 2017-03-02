var log4js = require('log4js');
var config = {
	appenders: [{
			type: 'console'
		},
		{
			type: 'dateFile',
			category: 'access',
			filename: 'logs/access/access',
			pattern: '-MM-dd.log',
			maxLogSize: 1024,
			alwaysIncludePattern: true
		},
		{
			type: 'dateFile',
			category: 'system',
			filename: 'logs/system/system',
			pattern: '-MM-dd.log',
			maxLogSize: 1024,
			alwaysIncludePattern: true
		},{
			type: 'dateFile',
			category: 'database',
			filename: 'logs/database/database',
			pattern: '-MM-dd.log',
			maxLogSize: 1024,
			alwaysIncludePattern: true
		},
		{
			type: 'logLevelFilter',
			level: 'ERROR',
			appender: {
				type: 'dateFile',
				filename: 'logs/errors/error',
				pattern: '-MM-dd.log',
				alwaysIncludePattern: true
			}
		}
	],
	replaceConsole: true
}

/**
 * 载入配置
 */
log4js.configure(config);

/**
 * 导出日志接口
 */
module.exports = {

	access: function() {
		return log4js.connectLogger(log4js.getLogger('access'), { level: 'auto', format: ':method :url' });
	},
	system: function() {
		return log4js.getLogger('system');
	},
	database: function() {
		return log4js.getLogger('database');
	}
};