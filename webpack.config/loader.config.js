/**
 * Created by jyq on 2017/10/13.
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const dirVars = require('./base/dir-vars.config');


module.exports = [ //加载器，关于各个加载器的参数配置，可自行搜索之。
    // {
    //     // jinja/nunjucks templates
    //     test: /\.html/,
    //     loader: 'jinja-loader',
    //     query: {
    //         root: "./templates",
    //         // config: function(env) {
    //         //     markdown.register(env);
    //         // }
    //     }
    // },

    {
        test: /\.html$/,
        include: dirVars.srcRootDir,
        loader: 'html-loader',
    },
    {
        test: /\.css$/,
        use: ExtractTextPlugin.extract([
            {
                loader: 'css-loader',
                options: {
                    minimize: true,
                    '-autoprefixer': true,
                },
            }
        ]),
    },{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
            presets: [['es2015', { loose: true }]],
            plugins: ["transform-runtime"]
        }
    },{
        test: /\.less$/,
        use: ExtractTextPlugin.extract([
            {
                loader: 'css-loader',
                options: {
                    minimize: true,
                    '-autoprefixer': true,
                },
            }, {
                loader: 'postcss-loader',
                options: {
                  plugins: function () {
                    return [
                      require('autoprefixer')
                    ];
                  }
                }
            }, {
                loader: 'less-loader',
            },
        ]),
    }, {
        //文件加载器，处理文件静态资源
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=./fonts/[name].[ext]'
    }, {
        //图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
        //如下配置，将小于8192byte的图片转成base64码
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'
    }
]