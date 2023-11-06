let query = require('../utils/mysql').HTTP

// 添加店铺信息
exports.insertOrderData = ( value, userId ) => {
  const {id, vehicle = null, type = null, amount = null, work_date = null, source_shop = null, is_delete = 0} = value
  const valueArr = [id, vehicle, type, amount, work_date, source_shop, is_delete, userId]
  let _sql = "insert into order set id=?,name=?,address=?,longitude=?,latitude=?,manager=?,phone=?,is_delete=?,userId=?;"
  return query( _sql, valueArr )
}
