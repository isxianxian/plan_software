module.exports = (app, $sql) => {
  // 登陆
  const md5 = require('md5');
  const bcrypt = require('bcrypt');
  const salt = bcrypt.genSaltSync(10);
  const jwt = require('jsonwebtoken');

  app.post('/login', async (req, res) => {
    let { account, password } = req.body;
    var pwd1 = bcrypt.hashSync(password, salt);
    var select = `select id, password from student_mes where account = '${account}' `;
    var user = await app.query(select);
    if (user.length == 0) {
      res.send({
        success: false,
        errmsg: '未找到相关用户！'
      })
    }
    console.log(user, '19')
    let userId = user[0].id,
      pas = md5(user[0].password),
      isOk = bcrypt.compareSync(pas, pwd1);
    if (!isOk) {
      res.send({
        success: false,
        errmsg: '密码错误！'
      })
    }
    setToken();


    // 设置token
    function setToken() {
      const token = jwt.sign({ id: userId }, app.get('secret'));
      res.send({
        success: true,
        data: {
          token,
        }
      })
    }
  })



}