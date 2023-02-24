const redis = require('redis') // 引入 redis

const redisClient = redis.createClient() // 创建客户端

// 监听错误信息
redisClient.on('err', err => {
  console.log('redis client error: ', err)
});

(async () => {
  await redisClient.connect();

  await redisClient.set('key', 'value').then(val => {
    console.log(val)
  });
  const value = await redisClient.get('key');
  console.log(value);
  await redisClient.disconnect();
})()



// 连接
/* redisClient.connect(6379, '127.0.0.1').then(() => {
  // 新增
  redisClient.set('name', 'zhangsan')
      .then(val => {
        console.log(val)
      })

  // 查询
  redisClient.get('name')
      .then(val => {
        console.log(val)
      })

  // 删除
  redisClient.del('name')
      .then(val => {
        console.log(val)
      })
})

redisClient.quit() */

