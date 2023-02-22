let query = require('../utils/mysql').HTTP

/*// 注册用户 demo 照抄用的
exports.insertData = ( value ) => {
  let _sql = "insert into users set name=?,pass=?,avator=?,moment=?;"
  return query( _sql, value )
}*/

// 添加员工信息
exports.insertWorkerData = ( value, userId ) => {
  const {id, name = null, phone = null, gender = null, percentage = 0, is_delete = 0} = value
  const valueArr = [id, name, phone, gender, percentage, is_delete, userId]
  let _sql = "insert into worker set id=?,name=?,phone=?,gender=?,percentage=?,is_delete=?,userId=?;"
  return query( _sql, valueArr )
}

// 更新员工信息
exports.updateWorkerData = (id, value) => {
  const {name = null, phone = null, gender = null, percentage = 0} = value
  const valueArr = [name, phone, gender, percentage, id]
  let _sql = "update worker set name=?,phone=?,gender=?,percentage=? where id=?;"
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
exports.selectWorkerList = ( value , userId ) => {
  let { pageSize = 10, pageNo = 0 } = value
  const keys = ['name', 'phone', 'gender', 'percentage']
  let condition = `userId="${userId}" and `
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

  return Promise.all([data, count])
}

// 查询员工列表


