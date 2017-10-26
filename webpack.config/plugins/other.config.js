/**
 * Created by jyq on 2017/10/13.
 */

/*
 extract-text-webpack-plugin插件，
 有了它就可以将你的样式提取到单独的css文件里，
 妈妈再也不用担心样式会被打包到js文件里了。
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');


module.exports = [
    new ExtractTextPlugin('css/[name].css'), //单独使用link标签加载css并设置路径，相对于output配置中的publickPath
    new webpack.HotModuleReplacementPlugin(), //热加载
    // new webpack.optimize.UglifyJsPlugin({
    //     compress: {
    //         warnings: false,
    //     },
    // })
]