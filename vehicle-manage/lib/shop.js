let query = require('../utils/mysql').HTTP

// 添加员工信息
exports.insertShopData = ( value ) => {
  const {id, name = null, address = null, longitude = null, latitude = null, manager = null, phone = null, is_delete = 0} = value
  const valueArr = [id, name, address, longitude, latitude, manager, phone, is_delete]
  let _sql = "insert into shop set id=?,name=?,address=?,longitude=?,latitude=?,manager=?,phone=?,is_delete=?;"
  return query( _sql, valueArr )
}

// 更新员工信息
exports.updateWorkerData = (id, value) => {
  const {name = null, phone = null, gender = null} = value
  const valueArr = [name, phone, gender, id]
  let _sql = "update worker set name=?,phone=?,gender=? where id=?;"
  return query( _sql, valueArr )
}

// 软删除员工信息
exports.deleteWorkerData = ( id ) => {
  let _sql = `update worker set is_delete=1 where id="${id}";`
  return query(_sql)
}

/* // 删除员工信息
exports.deleteWorkerData = ( id ) => {
  let _sql = `DELETE FROM worker WHERE id="${id}";`
  return query( _sql )
} */

// 查询员工信息
exports.selectWorkerData = ( id ) => {
  let _sql = `select * from worker where id="${id}"`
  return query(_sql)
}

// 查询员工列表
exports.selectWorkerList = ( value ) => {
  let { pageSize = 10, pageNo = 0 } = value
  const keys = ['name', 'phone', 'gender']
  let condition = ''
  for (let key in value) {
    if (value[key] && keys.includes(key)) {
      condition += `${key}="${value[key]}" and `
    }
  }
  let limitMin = pageSize * pageNo
  let limitMax = pageSize * (pageNo + 1)

  let _dataSql = `select * from worker where ${condition} is_delete=0 limit ${limitMin}, ${limitMax}`
  const data = query(_dataSql)

  let _countSql = `select count(*) as total from worker where ${condition} is_delete=0`
  const count = query(_countSql)
  console.log(data, count)

  return Promise.all([data, count])
}
