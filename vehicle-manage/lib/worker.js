let query = require('../utils/mysql').HTTP

/*// 注册用户 demo 照抄用的
exports.insertData = ( value ) => {
  let _sql = "insert into users set name=?,pass=?,avator=?,moment=?;"
  return query( _sql, value )
}*/

// 添加员工信息
exports.insertWorkerData = ( value ) => {
  let _sql = "insert into worker set id=?,name=?,phone=?,sex=?;"
  const valueArr = Object.values(value)
  return query( _sql, valueArr )
}

// 更新员工信息
exports.updateWorkerData = ( value ) => {
  let _sql = "update worker set name=?,phone=?,sex=? where id=?;"
  return query( _sql, value )
}

// 软删除员工信息
exports.updateWorkerData = ( value ) => {
  let _sql = "update worker set is_delete=1 where id=?;"
  return query( _sql, value )
}

// 删除员工信息
exports.deleteWorkerData = ( id ) => {
  let _sql = `DELETE FROM worker WHERE id="${id}";`
  return query( _sql )
}

// 查询员工信息
exports.selectWorkerData = ( id ) => {
  let _sql = `select * from worker where id="${id}"`
  return query( _sql )
}

// 查询员工列表


