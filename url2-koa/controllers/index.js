//获取login页面的方法
var fn_index = async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
};
//执行登录操作的方法
var fn_signin = async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        //ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
      
          ctx.response.type = 'application/json';  // 设置response的Content-Type:
          ctx.response.body=`{"code":200,"msg":"登录成功"}`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
};
module.exports={
    'GET /':fn_index,
    'POST /signin':fn_signin
}