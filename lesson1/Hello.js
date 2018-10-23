'use strict'



function Hello1(user)
{
 console.log('你好，'+user.name+'!');
}
function Hello2(user)
{
 console.log('你好，'+user.name+'!');
}
module.exports={ Hello1,Hello2} //对外只能暴露一个对象