
let mysql = {
  host: "localhost",           //这是数据库的地址
  user: "root",                //需要用户的名字
  password: "123456",          //用户密码 ，如果你没有密码，直接双引号就是
  database: "t_students"         //规划软件数据库
};

let connction = {
  mysql,
};



module.exports = connction;  //用module.exports暴露出这个接口，