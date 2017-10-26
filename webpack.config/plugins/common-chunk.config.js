/**
 * Created by jyq on 2017/10/13.
 */
const webpack = require('webpack');
const modules = require("../base/module.config");
const path = require('path');
const dirVars = require("../base/dir-vars.config");
const glob = require('glob');

let commons = [
  new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
      // chunks: ['index','list','about'], //提取哪些模块共有的部分
      minChunks: 2// 提取至少3个模块共有的部分
  }),
  // new webpack.optimize.CommonsChunkPlugin({
  //     name: 'common', // 将公共模块提取，生成名为`vendors`的chunk
  //     chunks: ['index','list'], //提取哪些模块共有的部分
  //     minChunks: 2 // 提取至少3个模块共有的部分
  // }),
];
modules.forEach(function(module){
    let options = {
        cwd: path.resolve(dirVars.jsDir, module),
        sync: true, // 这里不能异步，只能同步
    };
    let globInstance = new glob.Glob("!(_)*", options);
    commons.push(
        new webpack.optimize.CommonsChunkPlugin({
            name: module+'/common', // 将公共模块提取，生成名为`common`的chunk
            chunks: globInstance.found.map(page=>module+"/"+page), //提取哪些模块共有的部分
            minChunks: 2 // 提取至少3个模块共有的部分
        })
    );
});
module.exports = commons;