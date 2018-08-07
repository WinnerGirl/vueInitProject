module.exports = function (app) {
  const imgUrl = 'https://dlhr.oss-cn-hangzhou.aliyuncs.com/img/170714/d95dcc7a4c35281f4ab053897280ba60.JPG?x-oss-process=image/resize,m_fill,h_100,w_100,limit_1';
  // 获取企业详情
  app.get('/getArticlesOnColumn', function (req, res, next) {
    return res.send({
      code: 1,
      msg: '操作成功',
      total: 3,
      data: [{
        id: 914,
        title: '测试文章内详情图',
        introduction: '测试',
        imageurl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=415293130,2419074865&fm=27&gp=0.jpg'
      }, {
        id: 912,
        title: '测试文章内详情图2',
        introduction: '测试',
        imageurl: imgUrl
      }]
    })
  })
}
