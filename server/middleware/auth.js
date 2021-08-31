// 权限中间件
const jwt = require('jsonwebtoken');
const assert = require('http-assert');

module.exports = (options) => {
  let { app } = options;
  return async (req, res, next,) => {
    let token = req.headers.authentication;
    console.log(token, '权限中间件！')
    if (!token) {
      res.status(401);
    }
    const isOk = jwt.verify(token, app.get('secret'));
    assert(isOk, 401, '请先登陆')
    console.log(isOk, '12')

    await next();
  }
}