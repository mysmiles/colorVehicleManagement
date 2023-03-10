const redisDemo = require('redis') // 引入 redis

const redisClient = redisDemo.createClient() // 创建客户端

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

/**
 * 创建类
 */
class DateTool {
  // 构造函数
  constructor(...args) {
    // console.log('args', args);
    this.time = '111'
  }

  /* // 实例方法
  getWeek() {
    return new Date().getDay()
    // console.log('getWeek')
  }

  getDay() {
    return new Date().getDate()
  }

  getWD() {
    return `周${this.getWeek()} ${this.getDay()}号`
  } */

  // 静态方法 属性 单例模式
  static defaultInstance() {

    if (!DateTool.instance) {
      DateTool.instance = new DateTool()
    }

    return DateTool.instance
  }
}

/* let dateTool = new DateTool(1,2,4);
console.log(dateTool.getWeek()); */

// console.log(DateTool.defaultInstance().getWD());
console.log(DateTool.defaultInstance().time);

/**
 * 继承
 * super 调用父类构造函数
 */

class TimeTool extends DateTool {
  constructor(parma = {}) {
    super(parma);
  }
}

/* new TimeTool({key: '1'})
console.log(TimeTool.defaultInstance().getWD()); */




