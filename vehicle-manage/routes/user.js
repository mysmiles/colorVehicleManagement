const express = require("express");
const router = express.Router();
const UserModel = require('../lib/user.js')
const { generateToken } = require("../config/authorization");
const redisClass = require("../utils/redis");
const { getUserId } = require("../config/authorization");

router.post("/login", (req, res) => {
  UserModel.selectUser(req.body).then(async resp => {
    const id = resp.data[0].id
    const token = generateToken({ userId: id });
    if (await redisClass.defaultInstance().getValue(String(id))) {
      await redisClass.defaultInstance().delValue(String(id))
    }

    await redisClass.defaultInstance().setValue(String(id), token);
    res.status(resp.code).send({
      code: resp.code,
      msg: '登录成功',
      data: { token }
    })
  }).catch(error => {
    res.status(error.code).send({
      code: error.code,
      msg: error.errorMsg.message
    })
  })
});

router.get("/logout", async (req, res) => {
  let userId = getUserId(req)
  try {
    if (await redisClass.defaultInstance().getValue(String(userId))) {
      await redisClass.defaultInstance().delValue(String(userId))
    }
    res.status(200).send({
      code: 200,
      msg: '登出成功'
    })
  } catch (err) {
    res.status(500).send({
      code: 500,
      msg: '操作失败'
    })
  }
});

module.exports = router;
