let query = require('../utils/mysql').HTTP

// 添加店铺信息
exports.insertShopData = ( value ) => {
  const {id, name = null, address = null, longitude = null, latitude = null, manager = null, phone = null, is_delete = 0} = value
  const valueArr = [id, name, address, longitude, latitude, manager, phone, is_delete]
  let _sql = "insert into shop set id=?,name=?,address=?,longitude=?,latitude=?,manager=?,phone=?,is_delete=?;"
  return query( _sql, valueArr )
}

// 更新店铺信息
exports.updateShopData = (id, value) => {
  const {name = null, address = null, longitude = null, latitude = null, manager = null, phone = null,} = value
  const valueArr = [name, address, longitude, latitude, manager, phone, id]
  let _sql = "update shop set name=?,address=?,longitude=?,latitude=?,manager=?,phone=? where id=?;"
  return query( _sql, valueArr )
}

// 软删除店铺信息
exports.deleteShopData = ( id ) => {
  let _sql = `update shop set is_delete=1 where id="${id}";`
  return query(_sql)
}

/* // 删除员工信息
exports.deleteWorkerData = ( id ) => {
  let _sql = `DELETE FROM worker WHERE id="${id}";`
  return query( _sql )
} */

// 查询店铺信息
exports.selectShopData = ( id ) => {
  let _sql = `select * from shop where id="${id}"`
  return query(_sql)
}

// 查询店铺列表
exports.selectShopList = ( value ) => {
  let { pageSize = 10, pageNo = 0 } = value
  const keys = ['name', 'address', 'longitude', 'latitude', 'manager', 'phone']
  let condition = ''
  for (let key in value) {
    if (value[key] && keys.includes(key)) {
      condition += `${key}="${value[key]}" and `
    }
  }
  let limitMin = pageSize * pageNo
  let limitMax = pageSize * (pageNo + 1)

  let _dataSql = `select * from shop where ${condition} is_delete=0 limit ${limitMin}, ${limitMax}`
  const data = query(_dataSql)

  let _countSql = `select count(*) as total from shop where ${condition} is_delete=0`
  const count = query(_countSql)

  return Promise.all([data, count])
}
