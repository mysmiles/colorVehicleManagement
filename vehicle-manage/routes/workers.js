var express = require('express');
var router = express.Router();
var api = require('../utils/mysql');

router.post('/', function(req, res, next) {
  api.HTTP(sql).then(resp => {
    res.status(item.code).send(resp)
  })
})
