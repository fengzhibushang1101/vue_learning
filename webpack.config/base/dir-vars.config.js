/**
 * Created by jyq on 2017/10/11.
 */
const path = require('path');
const moduleExports = {};

// 源文件目录
moduleExports.rootDir = path.resolve(__dirname, '../../'); // 项目根目录
moduleExports.srcRootDir = path.resolve(moduleExports.rootDir, './dev.static'); // 项目业务代码根目录
moduleExports.jsDir = path.resolve(moduleExports.srcRootDir, './js');
// 生成文件目录

module.exports = moduleExports;