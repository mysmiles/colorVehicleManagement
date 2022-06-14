const userModel = require('../lib/worker.js')
const { nanoid } = require('nanoid');

const ID = nanoid()
console.log(ID)

// 查询全部员工
exports.getWorker = async ctx => {
  let res,
    postCount,
    name = decodeURIComponent(ctx.request.querystring.split('=')[1]);
  if (ctx.request.querystring) {
    await userModel.findPostCountByName(name)
      .then(result => {
        postCount = result[0].count
      })
    await userModel.findPostByUserPage(name, 1)
      .then(result => {
        res = result
      })
    await ctx.render('selfPosts', {
      session: ctx.session,
      posts: res,
      postsPageLength: Math.ceil(postCount / 10),
    })
  } else {
    await userModel.findPostByPage(1)
      .then(result => {
        res = result
      })
    await userModel.findAllPostCount()
      .then(result => {
        postCount = result[0].count
      })
    await ctx.render('posts', {
      session: ctx.session,
      posts: res,
      postsLength: postCount,
      postsPageLength: Math.ceil(postCount / 10),

    })
  }
}
