const fs = require('fs');
function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);//路由注册get方法
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);//路由注册post方法
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

//扫描controllers文件下的.js文件,且将内部暴露的方法映射到路由上
function addControllers(router) {
    //注:__dirname 默认获取根目录
    var files = fs.readdirSync(__dirname + '/controllers');//获取controller目录下的js文件
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/controllers/' + f);//引用js文件
        addMapping(router, mapping);
    }
}

module.exports = function (dir) {
    let controllers_dir = dir || 'controllers', // 如果不传参数，扫描目录默认为'controllers'
    router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};