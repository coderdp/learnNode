const Koa = require('koa');
const controller=require('./controller');
const path=require('path');

//无论是Node.js提供的原始request对象，还是koa提供的request对象，都不提供解析request的body的功能！所以只能通过导入koa-bodyparser包来获取Body对象
const bodyParser = require('koa-bodyparser');
const app = new Koa();

//处理静态资源
const serve=require('koa-static');
const static = serve(path.join(__dirname));

//add body Parser  这里必须放在Router之前，不然会获取不到body参数
app.use(bodyParser());

// add router middleware:
app.use(controller());
app.use(static);//处理静态资源

app.listen(3000);
console.log('app started at port 3000...');