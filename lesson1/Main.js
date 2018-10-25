'use strict'

var hello=require('./Hello');//引用Hello.js 模块，注意路径

//#region  fs写入/读取文件
//var fs=require('./fs');
//fs.Start();//fs模块相关
//#endregion

//#region stream相关
/* var stream=require('./Stream');
stream.ReadStream();
stream.WriteStream();
stream.UseStreamCopy(); */
//#endregion

/* var http=require('./Http')
http.Start(); */

//自定义图片服务器
 var httpServer=require('./file_server')
 httpServer.Start(); 
//尝试访问： http://localhost:8080/images/1.jpg  http://localhost:8080/images/2.jpg http://localhost:8080/images/3.jpg 