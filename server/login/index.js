module.exports = (app, $sql) => {

  const bcrypt = require('bcrypt');
  const salt = bcrypt.genSaltSync(10);
  const jwt = require('jsonwebtoken');

  // 登陆
  app.post('/login', async (req, res) => {
    let { account, password } = req.body;
    var pwd1 = bcrypt.hashSync(password, salt);
    var select = `select id, password from student_mes where account = '${account}' `;
    var user = await app.query(select);
    if (user.length == 0) {
      res.send({
        success: false,
        errmsg: '未找到相关用户！'
      });
      return;
    }

    let userId = user[0].id,
      pas = user[0].password,
      isOk = bcrypt.compareSync(pas, pwd1);
    if (!isOk) {
      res.send({
        success: false,
        errmsg: '密码错误！'
      });
      return;
    }
    setToken();

    // 设置token
    function setToken() {
      const token = jwt.sign({ id: userId }, app.get('secret'), { expiresIn: '10h' });
      res.send({
        success: true,
        data: {
          token,
        }
      })
    }
  })

  // 注册
  app.post('/register', async (req, res) => {
    let { account, password } = req.body;
    let select = `select * from student_mes where account = '${account}' `;
    let find = await app.query(select, req.body);
    if (find.length > 0) {
      res.send({ success: false, errmsg: '账号已被注册！' });
      return;
    }

    const sql = 'INSERT INTO student_mes SET ?';
    let result = await app.query(sql, req.body);
    if (result.affectedRows == 1) {
      res.send({ success: true })
    } else {
      res.send({ success: false })
    }
  })

}