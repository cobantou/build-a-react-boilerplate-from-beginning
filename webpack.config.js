/**
 * Created by Administrator on 2017/9/13.
 */
//webpack.config.js
var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: "/res/dist/",
        path: path.resolve(__dirname, './dist/'),
        filename: '[name].[chunkhash:8].js'
    },
    devServer: {
        inline: true,
        port: 8000
    },
    module: {
        loaders: [
            {
                exclude: [
                    /\.(html|ejs)$/,
                    /\.(js|jsx)$/,
                    /\.(css|less|scss)$/,
                    /\.json$/,
                    /\.svg$/,
                    /\.tsx?$/,
                ],
                loader: 'url',//处理图片，小于limit（B）的图会被转成dataUrl，否则会生成名称为name的文件
                options: {
                    limit: 10000,
                    name: 'static/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, "src"),
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};