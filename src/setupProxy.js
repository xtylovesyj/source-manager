const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    'api/',
    proxy({
      target: 'http://storage.googleapis.com',
      changeOrigin: true,
      secure: false, //配置关闭证书签名验证
      pathRewrite: {
        '^/api': '/'
      }
    })
  );
};
