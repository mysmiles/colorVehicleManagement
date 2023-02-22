const express = require('express');
const router = express.Router();
const shopModel = require('../lib/shop.js')

const { nanoid } = require('nanoid');
const { getUserId } = require("../config/authorization");

// 添加店铺
router.post("/addShop",(req,res,next) => {
  const id = nanoid()
  let userId = getUserId(req)
  let paramBody = { ...req.body, id: id }; // body传参
  shopModel.insertShopData(paramBody, userId).then(resp => {
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

// 修改店铺
router.put('/updateShop/:shopId', (req, res) => {
  let shopId = req.params.shopId
  let form = req.body

  shopModel.updateShopData(shopId, form).then(resp => {
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

// 查询店铺
router.get('/shop/:shopId', (req, res) => {
  let shopId = req.params.shopId
  shopModel.selectShopData(shopId).then(resp => {
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
router.get('/shopList', (req, res) => {
  let query = req.query
  let userId = getUserId(req)
  shopModel.selectShopList(query, userId).then(resp => {
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
router.delete('/deleteShop/:shopId', (req, res) => {
  let shopId = req.params.shopId
  shopModel.deleteShopData(shopId).then(resp => {
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
