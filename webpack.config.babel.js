/**
 * Created by Administrator on 2017/9/13.
 */
//webpack.config.babel.js
import webpack from 'webpack';
import path from 'path';
import rucksack from 'rucksack-css';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

var pkg = require('./package.json')

let theme = {};

/**
 * antd的自定义样式
 * string  js文件
 * object 样式变量
 */
if (pkg.theme && typeof(pkg.theme) === 'string') {
    let cfgPath = pkg.theme;
    // relative path
    if (cfgPath.charAt(0) === '.') {
        cfgPath = resolve(args.cwd, cfgPath);
    }
    const getThemeConfig = require(cfgPath);
    theme = getThemeConfig();
} else if (pkg.theme && typeof(pkg.theme) === 'object') {
    theme = pkg.theme;
}


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
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: [
                        //支持es2015-stage0，支持react
                        require.resolve('babel-preset-es2015'),
                        require.resolve('babel-preset-react'),
                        require.resolve('babel-preset-stage-0'),
                    ],
                    plugins: [
                        //？
                        require.resolve('babel-plugin-add-module-exports'),
                        require.resolve('babel-plugin-react-require'),
                        require.resolve('babel-plugin-syntax-dynamic-import'),
                        ["import", {"libraryName": "antd", "libraryDirectory": "lib", "style": true}]
                    ],
                    cacheDirectory: true,
                }
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, "src"),
                use: ExtractTextPlugin.extract({
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                sourceMap: true,
                                modules: true,
                                localIdentName: '[local]___[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('precss'),
                                        autoprefixer({
                                            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
                                        })
                                    ];
                                }
                            }
                        },
                    ]
                })
            },
            {
                test: /\.less$/,
                include: path.resolve(__dirname, "src"),
                use: ExtractTextPlugin.extract({
                    use: [
                        'style-loader',//支持页面的style
                        {
                            loader: 'css-loader',   //处理css文件中的url、模块化css
                            options: {
                                importLoaders: 1,
                                sourceMap: true,
                                modules: true,
                                localIdentName: '[local]___[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('precss'),
                                        autoprefixer({
                                            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
                                        })
                                    ];
                                }
                            }
                        },
                        {
                            loader: 'less-loader',//less->css
                            options: {
                                sourceMap: true,
                                modifyVars: theme,//antd的主题配置
                            }
                        },

                    ],
                })
            },
            {
                test: /\.html$/,
                loader: 'file',
                options: {
                    name: '[name].[ext]',
                }
                ,
            }
            ,
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name]-[chunkhash].css',
            disable: false,
            allChunks: true,
        }),
        // new webpack.LoaderOptionsPlugin({
        //     options: {
        //         postcss: function(){
        //             return [
        //                 autoprefixer({
        //                     browsers: [
        //                         '>1%',
        //                         'last 4 versions',
        //                         'Firefox ESR',
        //                         'not ie < 9', // React doesn't support IE8 anyway
        //                     ]
        //                 })
        //             ]
        //         }
        //     }
        // })
    ]
}
;