const redis = require('redis');
const port = 6379;
const host = "127.0.0.1";
// 你设置的redis密码
// const password = 'xxxx';

/**
 * 设置值,并设置过期时间
 * @param {String} key 键
 * @param {String} value 值(Object请使用JSON.stringify()包裹)
 * @param {Number} expire 过期时间(单位: 秒)
 */
/* const redisSet = (key, value, expire) => new Promise((resolve, reject) => {
  const redisClient = redis.createClient(port, host);
  // redisClient.auth(password);
  redisClient.on('connect', () => {
    redisClient.set(key, value, (err, reply) => {
      if (err) throw err;
      else resolve(reply);
      client.quit();
    })
    client.expire(key, expire); // expire 过期时间(秒)
  })
}) */

const redis = require('redis') // 引入 redis

const redisClient = redis.createClient() // 创建客户端
/* createClient({
  url: 'redis://:123456@127.0.0.1:6379'
    /*
    * redis://[[username][:password]@][host][:port][/db-number]
    * 写密码redis://:123456@127.0.0.1:6379/0
    * 写用户redis://uername@127.0.0.1:6379/0
    * 或者不写密码 redis://127.0.0.1:6379/0
    * 或者不写db_number redis://:127.0.0.1:6379
    * *
}); */

redisClient.on('ready', () => {
  console.log('redis client ready: ')
});

redisClient.on('err', err => {
  console.log('redis client error: ', err)
});

redisClient.connect().then(r => {

});

class Redis {
  constructor() {
  }
  setValue = async (key, value, expire) => {
    await redisClient.set(key, value, { EX: expire })
  }

  getValue = async (key) => {
    return await redisClient.get(key).then(data => data) || null
  }

  delValue = async (key) => {
    return await redisClient.del(key)
  }
}


