const path = require("path");
module.exports = {
  entry: "./src/components/index.js",//入口文件，src目录下的index.js文件，
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './dist'),//输出路径，就是新建的dist目录，
    publicPath: '/dist/',
    filename: 'helloName.min.js',
    libraryTarget: 'umd',
    globalObject: 'this', // 添加这个选项
    umdNamedDefine: true
  },

}