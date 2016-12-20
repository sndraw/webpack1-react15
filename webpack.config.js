var webpack = require('webpack');
var path = require('path');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin'); //清理文件夹
var nodeModulesPath = path.join(__dirname, 'node_modules');

module.exports = {
    //插件项
    //页面入口文件配置
    entry: {
        vendor: [
            'react',
            'react-dom',
            'jquery'
        ],
        index: path.resolve(__dirname, './app/js/index.js'),
        page: path.resolve(__dirname, './app/js/page.js'),
    },
    //入口文件输出配置
    output: {
        path: path.resolve(__dirname, './dist'), // 设置输出目录
        publicPath: "/",
        filename: 'js/[name].[hash].js', // 输出文件名
        chunkFilename:'js/[name].[hash].js', // 输出文件名
    },
    resolve: {
        root: [],
        alias: {
            'jquery': 'jquery',
            'zui-css': path.join(nodeModulesPath, '/zui/dist/css/zui.min.css'),
            'zui-js': path.join(nodeModulesPath, '/zui/dist/js/zui.min.js'),
        },
        //设置require或import的时候可以不需要带后缀
        extensions: ['', '.js', '.less', '.css']
    },
    module: {
        //加载器配置
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015']
                }
            },
//            {
//                test: /\.jsx?$/,
//                loader: 'babel',
//                exclude: /node_modules/,  
//                query: {
//                    presets: ['react', 'es2015']
//                }
//            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css')
            }, {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract('style', 'css!sass')
            }, {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                query: {
                    limit: 10240, //10kb 图片转base64。设置图片大小，小于此数则转换。
                    name: 'images/[hash:8].[name].[ext]' //输出目录以及名称
                }
            }, {
                test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                loader: 'file',
                query: {
                    name: 'fonts/[hash:8].[name].[ext]' //输出目录以及名称
                }
            }, {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader?exclude=/upload/'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new CleanWebpackPlugin(['css', 'js'], {
            root: path.resolve(__dirname, './dist'),
            verbose: true,
            dry: false,
            exclude: []
        }),
        // 分离css
        new ExtractTextPlugin('css/[name].[hash].css', {
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "js/vendor.[hash].js",
            async: false
        }),
        //压缩打包的文件
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['$super', '$', 'exports', 'require']
                        //以上变量‘$super’, ‘$’, ‘exports’ or ‘require’，不会被混淆
            },
            compress: {
                //supresses warnings, usually from module minification
                warnings: false
            }
        }),
        //允许错误不打断程序
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: __dirname + '/dist/index.html', //目标文件
            template: __dirname + '/app/index.html', //模板文件
            favicon: __dirname + '/app/images/favicon.ico',
            inject: 'body',
            hash: false, //默认为true,代表js、css文件后面会跟一个随机字符串,解决缓存问题
            chunks: ['vendor', 'index'],
            chunksSortMode: 'auto'
        }),
        new HtmlWebpackPlugin({
            filename: __dirname + '/dist/page.html', //目标文件
            template: __dirname + '/app/page.html', //模板文件
            favicon: __dirname + '/app/images/favicon.ico',
            inject: 'body',
            hash: false, //默认为true,代表js、css文件后面会跟一个随机字符串,解决缓存问题
            chunks: ['vendor', 'page'],
            chunksSortMode: 'auto'
        }),
//        //把指定文件夹下的文件复制到指定的目录
//        new TransferWebpackPlugin([
//            {from: 'build'}
//        ], path.resolve(__dirname, "src"))
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        port: 9090 //端口你可以自定义
    },
    watch: true

};