'use strict'

var hello=require('./Hello');//引用Hello.js 模块，注意路径

//#region  fs写入/读取文件
//var fs=require('./fs');
//fs.Start();//fs模块相关
//#endregion

//#region stream相关
var stream=require('./stream');
stream.ReadStream();
stream.WriteStream();
stream.UseStreamCopy();
//#endregion
