let query = require('../utils/mysql').HTTP

// 添加店铺信息
exports.insertOrderData = ( value, userId ) => {
  const {id, name = null, address = null, longitude = null, latitude = null, manager = null, phone = null, is_delete = 0} = value
  const valueArr = [id, name, address, longitude, latitude, manager, phone, is_delete, userId]
  let _sql = "insert into order set id=?,name=?,address=?,longitude=?,latitude=?,manager=?,phone=?,is_delete=?,userId=?;"
  return query( _sql, valueArr )
}
