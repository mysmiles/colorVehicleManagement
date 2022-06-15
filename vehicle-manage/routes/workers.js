const express = require('express');
const router = express.Router();
const api = require('../utils/mysql');

// demo
/*router.post('/', function(req, res, next) {
  api.HTTP(sql).then(resp => {
    res.status(item.code).send(resp)
  })
})*/

// 查询员工信息
router.get("/query",(req,res,next)=>{
  let params = req.query;
  res.json({
    code: 0,
    msg: "成功",
    params
  })
})
