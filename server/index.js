const express = require('express');
const app = express();
const $mysql = require('mysql');
var sql = require('./mysql');
var $sql = $mysql.createConnection(sql.mysql);
$sql.connect();

// app上绑定方法
require('./app')(app, $sql);

// 处理跨域
app.use(require('cors')());
// 处理post请求body传参
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./login/index')(app, $sql);
require('./home/index')(app, $sql);
app.listen(4000, (res) => {
  console.log('4000端口已被监听！')
})