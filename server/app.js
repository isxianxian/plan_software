// 给app上绑定各种变量，方法

let setQuery = function ($sql) {
  return function (sql, values) {
    return new Promise((resolve, reject) => {
      $sql.query(sql, values, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows);
        }
      })
      // $sql.release();
    })
  }
}

module.exports = function (app, $sql) {
  app.query = setQuery($sql);
  app.set('secret', 'h8hdghsglk');
}