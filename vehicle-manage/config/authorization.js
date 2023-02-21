const jwt = require("jsonwebtoken");

const secretKey = "secretKey";

// 生成token
module.exports.generateToken = (payload) => {
  return "Bearer " +
      jwt.sign(payload, secretKey, {
        expiresIn: 60 * 60 * 24,
      });
};

// 验证token
module.exports.verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({
      code: '401',
      msg: 'token无效'
    })
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        code: '401',
        msg: 'token无效'
      })
    }
    next();
  });
};


// 解码token
module.exports.decoded = (token, complete = true) => {
  return jwt.decode(token, {
    complete,
  });
};
