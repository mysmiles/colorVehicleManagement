const express = require('express');
const router = express.Router();
const orderModel = require('../lib/order.js')

const { nanoid } = require('nanoid');
const { getUserId } = require("../config/authorization");

// 添加订单
router.post("/addOrder",(req,res,next) => {
  const id = nanoid()
  let userId = getUserId(req)
  let paramBody = { ...req.body, id: id }; // body传参
  orderModel.insertOrderData(paramBody, userId).then(resp => {
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
