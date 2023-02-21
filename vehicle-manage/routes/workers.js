const express = require('express');
const router = express.Router();
const workerModel = require('../lib/worker.js')

const { nanoid } = require('nanoid');
const auth = require("../config/authorization");

// demo
/*router.post('/', function(req, res, next) {
  api.HTTP(sql).then(resp => {
    res.status(item.code).send(resp)
  })
})*/

/*router.get("/queryList",(req,res,next) => {
  let params = req.params; // 路径传参
  let paramBody = req.query; // body传参
  res.json({
    code: 0,
    msg: "成功",
    params
  })
})*/

const getUserId = (req) => {
  let authorization = req.get('authorization').split(" ")[1];
  let userId = auth.decoded(authorization, false).userId
  return userId
}

// 添加员工
router.post("/addWorker",(req,res,next) => {
  const id = nanoid()
  let paramBody = { ...req.body, id: id }; // body传参
  let userId = getUserId(req)
  workerModel.insertWorkerData(paramBody, userId).then(resp => {
    res.status(resp.code).send({
      code: resp.code,
      msg: '保存成功'
    })
  }).catch(error => {
    res.status(error.code).send({
      code: error.code,
      msg: error.errorMsg.message
    })
  })
})

// 修改员工
router.put('/updateWorker/:workerId', (req, res) => {
  let workId = req.params.workerId
  let form = req.body

  workerModel.updateWorkerData(workId, form).then(resp => {
    res.status(resp.code).send({
      code: resp.code,
      msg: '保存成功'
    })
  }).catch(error => {
    res.status(error.code).send({
      code: error.code,
      msg: error.errorMsg.message
    })
  })
})

// 查询员工
router.get('/worker/:workerId', (req, res) => {
  let workId = req.params.workerId
  workerModel.selectWorkerData(workId).then(resp => {
    let result = resp.data[0]
    res.status(resp.code).send({
      code: resp.code,
      data: result
    })
  }).catch(error => {
    res.status(error.code).send({
      code: error.code,
      msg: error.errorMsg.message
    })
  })
})

// 按照条件查询列表
router.get('/workerList', (req, res) => {
  let query = req.query
  workerModel.selectWorkerList(query).then(resp => {
    const data = resp[0].data
    const totalCount = resp[1].data[0].total
    res.status(200).send({
      code: 200,
      data: data,
      totalCount: totalCount
    })
  }).catch(error => {
    res.status(error.code).send({
      code: error.code,
      msg: error.errorMsg.message
    })
  })
})

// 删除员工
router.delete('/deleteWorker/:workerId', (req, res) => {
  let workId = req.params.workerId
  workerModel.deleteWorkerData(workId).then(resp => {
    res.status(resp.code).send({
      code: resp.code,
      msg: '操作成功'
    })
  }).catch(error => {
    res.status(error.code).send({
      code: error.code,
      msg: error.errorMsg.message
    })
  })
})

module.exports = router;
