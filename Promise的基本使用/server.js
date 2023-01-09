//引入express
const express = require('express')

//创建应用对象
const app = express()

//创建路由规则
app.get('/ajax-get', (request, response) => {
  response.setHeader('Access-Control-Allow-Origin','*')
  response.send("haihai")
})

//监听端口响应服务
app.listen(8000, () => {
  console.log('服务已启动 8000');
})