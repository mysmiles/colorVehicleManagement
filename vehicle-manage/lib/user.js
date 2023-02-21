let query = require('../utils/mysql').HTTP

// 添加店铺信息
exports.selectUser = ( value ) => {
  const {name = null, password = null} = value
  let _sql = `select * from users where name="${name}" and password="${password}"`
  return query(_sql)
}
