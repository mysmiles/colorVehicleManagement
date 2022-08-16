const express = require('express');
const router = express.Router();
const userModel = require('../lib/worker.js')

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

router.post("/addWorker",(req,res,next) => {
  let paramBody = req.query; // body传参
  userModel.insertWorkerData(paramBody).then(resp => {
    res.status(resp.code).send(resp)
  })
})

module.exports = router;
