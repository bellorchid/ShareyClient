var settings = require('./configuration.js')
var fs = require('fs');

exports.init = function() {
    if (fs.existsSync(settings.getUserHome()+'/data.json')) {
        console.log('存在配置文件,初始化成功');
    } else {
        fs.mkdirSync(settings.getUserHome()+'/.ShareyClient');
    }

};

