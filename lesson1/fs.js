'use strict' //严格模式
var fs=require('fs');//fs 文件系统模块，负责读写文件

module.exports={Start}

function Start(){
//#region  异步读取字符串
fs.readFile('test.txt','utf-8',function(err,data){
 if(err)
 {
    console.log(err);
 }else 
 {
    console.log('异步读取文件--------------------------');
    console.log(data);
 }
});
//#endregion

//#region  同步读取字符串
try{
    console.log('同步读取文件--------------------------');
    var data= fs.readFileSync('test.txt','utf-8');
    console.log(data);
}catch(err){
    console.log(err);
}
//#endregion

//#region  异步读取文件
fs.readFile("Icon.jpg",function(err,data){
    console.log('异步读取文件--------------------------');
    if (err){
        console.log(err);
    }else{
        //写入文件
        console.log('异步写入文件--------------------------');
        fs.writeFile('IconBak.jpg',data,function(err){
        if (err)
        {
            console.log(err);
        }else{
            console.log('IconBak.jpg'+'写入成功！~');
        }
        })
    }
})
//#endregion

//#region  获取文件信息
fs.stat("IconBak.jpg",function(err,data){
    if(err){
        console.log(err);
    }else{
        console.log("获取文件信息--------------------------")
        console.log('是否文件:'+data.isFile());//是否文件
        console.log('文件大小:'+data.size);//文件大小
        console.log('文件创建时间:'+data.birthtime.toLocaleString());//文件创建时间
        console.log('文件修改时间:'+data.mtime.toLocaleString());//文件修改时间
    }
})
//#endregion

/*
在fs模块中，提供同步方法是为了方便使用。那我们到底是应该用异步方法还是同步方法呢？

由于Node环境执行的JavaScript代码是服务器端代码，所以，绝大部分需要在服务器运行期反复执行业务逻辑的代码，必须使用异步代码，否则，同步代码在执行时期，服务器将停止响应，因为JavaScript只有一个执行线程。

服务器启动时如果需要读取配置文件，或者结束时需要写入到状态文件时，可以使用同步代码，因为这些代码只在启动和结束时执行一次，不影响服务器正常运行时的异步执行。
 */
}
