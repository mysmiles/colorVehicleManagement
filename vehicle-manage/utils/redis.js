const redis = require('redis');
const port = 6379;
const host = "127.0.0.1";
const redisClient = redis.createClient()
// 你设置的redis密码
// const password = 'xxxx';

class Redis {
  constructor() {
    this.flag = false
  }
  setValue = async (key, value, expire = 60 * 60 * 24 ) => {
    if (this.flag) {
      try {
        await redisClient.set(key, value, { EX: expire })
      } catch (e) {
        throw new Error('操作失败')
      }
    } else {
      throw new Error('redis未链接成功')
    }
  }

  getValue = async (key) => {
    return await redisClient.get(key).then(data => data) || null
  }

  delValue = async (key) => {
    return await redisClient.del(key)
  }

  connectRedis = async () => {
    await redisClient.connect();
    this.flag = true
  }

  static defaultInstance() {

    if (!Redis.instance) {
      Redis.instance = new Redis()
    }

    return Redis.instance
  }
}

module.exports = Redis

