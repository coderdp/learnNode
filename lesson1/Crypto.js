'use strict' //使用严格模式

module.exports={Strat}
function Strat()
{
    const crypto=require('crypto');
    const hash=crypto.createHash('md5');
    hash.update('Hello');
    console.log(hash.digest('hex'));
}
