// 权限中间件
const jwt = require('jsonwebtoken');
const assert = require('http-assert');

module.exports = (options) => {
  let { app } = options;
  return async (req, res, next,) => {
    let token = req.headers.authentication;
    if (!token) {
      res.sendStatus(401);
    }
    jwt.verify(token, app.get('secret'), (err, decoded) => {
      if (err) {
        if (err.name == 'JsonWebTokenError') { // 无效的token
          res.sendStatus(401);
        } else if (err.name == 'TokenExpiredError') {
          res.sendStatus(403);
        }
      } else {
        console.log(decoded)
      }
    });
    // assert(isOk, 401, '请先登陆')
    // console.log(isOk, '12')

    await next();
  }
}