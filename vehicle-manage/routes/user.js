const express = require("express");
const router = express.Router();
const UserModel = require('../lib/user.js')
const { generateToken } = require("../config/authorization");

router.post("/login", (req, res) => {
  UserModel.selectUser(req.body).then(resp => {
    const id = resp.data[0].id
    const token = generateToken({ userId: id });
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

module.exports = router;
