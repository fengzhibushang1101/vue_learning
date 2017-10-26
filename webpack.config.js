/**
 * Created by jyq on 2017/10/10.
 */

const entry = require('./webpack.config/entry.config');
const output = require('./webpack.config/output.config');
const server = require("./webpack.config/server.config");
const loaders = require("./webpack.config/loader.config");
const provide_plugins = require("./webpack.config/plugins/provide.config");
const common_chunk_plugins = require("./webpack.config/plugins/common-chunk.config");
const other_plugins = require("./webpack.config/plugins/other.config");
const html_webpack_plugins = require("./webpack.config/plugins/html-webpack.config");

module.exports = {
    entry: entry,
    output: output,
    module: {
        loaders: loaders
    },
    plugins: [...provide_plugins, ...common_chunk_plugins, ...html_webpack_plugins, ...other_plugins],
    devServer: server,
    resolve: { alias: { 'vue$': 'vue/dist/vue.js' } },
    externals: {
      'jquery': 'window.jQuery',
    },
};