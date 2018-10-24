'use strict' //严格模式

var fs =require('fs');

//所有可以读取数据的流都继承自stream.Readable，所有可以写入的流都继承自stream.Writable。


module.exports={ReadStream,WriteStream,UseStreamCopy:Copy}

function ReadStream(){
    // 打开一个流:
var rs=fs.createReadStream('test.txt','utf-8');
//data事件可能会有多次，每次传递的chunk是流的一部分数据
rs.on("data",function(chunk1){//chunk1只是形参
    console.log(chunk1);
});
//读取结束
rs.on("end",function(){
    console.log('end');
})
//出现异常
rs.on('error', function (err) {
    console.log('ERROR: ' + err);
});
}

//Stream写文件
function WriteStream(){
    //Stream写文件
    var ws1=fs.createWriteStream('WriteStream.txt','utf-8');
    ws1.write('Hello,I am write now');
    ws1.write('\n Add something')
    ws1.end();

    //Buffer写文件
    var ws2 = fs.createWriteStream('output2.txt');
    ws2.write(new Buffer('使用Stream写入二进制数据...\n', 'utf-8'));
    ws2.write(new Buffer('END.', 'utf-8'));
    ws2.end();
}

//使用pipe Copy文件
function Copy()
{
    
    //一个Readable流和一个Writable流串起来后，所有的数据自动从Readable流进入Writable流，这种操作叫pipe。
    //默认情况下，当Readable流的数据读取完毕，end事件触发后，将自动关闭Writable流。如果我们不希望自动关闭Writable流，需要传入参数 readable.pipe(writable, { end: false });
    var rs=fs.createReadStream('WriteStream.txt','utf-8');
    var ws=fs.createWriteStream('NewCopy.txt','utf-8');
    rs.on("end",function(){
        console.log('rs,end');
    })
    rs.pipe(ws);
}
