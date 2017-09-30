# 踩坑之路
创建package.json
* `npm init`

安装依赖
* `npm i webpack  webpack-dev-server  --save-dev`
* `npm i dva antd react axios moment lodash jsonp path-to-regexp classnames -S`  

编写webpack配置
*  webpack.config.babel.js //加上babel支持在里面写es6+的语法
* 根据package.json的theme字段来引入自定义样式，来覆盖antd的样式
* babel-loader支持es567……,babel-core？？ 
* babel-plugin-react-require babel-plugin-syntax-dynamic-import babel-plugin-add-module-exports 是干嘛的？？
* 引入babel-plugin-import 来引入antd 的组件
* 引入babel-preset-env支持最新es语法
* extract-text-webpack-plugin将样式从js中抽离成单独的文件
* postcss-loader处理less，模块化？ //注意路径
* html-webpack-plugin 生成html