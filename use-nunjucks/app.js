//nunjucks 一个模板引擎 官网地址：http://mozilla.github.io/nunjucks/
const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    var
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path, {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

var env = createEnv('views', {
    watch: true,
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
});
//带有js会自动转义
var s = env.render('hello.html', { name: '<script>alert("小明")</script>',age:18,data:[{id:1,name:"张三"},{id:2,name:"李四"}] });
console.log(s);

//可以选择性的继承模板页面
console.log(env.render('extend.html', {
    header: 'Hello',
    body: 'bla bla bla...'
}));