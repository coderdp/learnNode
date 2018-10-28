const Koa = require('koa');

// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();


//无论是Node.js提供的原始request对象，还是koa提供的request对象，都不提供解析request的body的功能！所以只能通过导入koa-bodyparser包来获取Body对象
const bodyParser = require('koa-bodyparser');
const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
    console.log(`the end`);
});

//相同路由越靠前越先匹配到
router.get('/su/:name',async (ctx,next)=>{
    var name=ctx.params.name;
    ctx.response.body=`hello,/su/${name}`;
});

// add url-route:
router.get('/su/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

//获取登录页面
router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

//处理post请求，注意需要导入koa-bodyparser包
router.post('/signin', async (ctx, next) => {
    var
        name = ctx.request.body.name || '',//name不存时 拿到的就是空字符串
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
});
//add body Parser 
app.use(bodyParser());

// add router middleware:
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');