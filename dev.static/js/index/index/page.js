/**
 * Created by jyq on 2017/10/12.
 */

require("../../../css/base.less");
require("../../../css/index/index.less");
require("../../../css/index/in.less");

import log from "../../_log.init"
import a from "../_index_init"
log(a);
log("123123123");
new Promise(function(resolve, reject){
    setTimeout(function(){
        console.log('执行完成');
        resolve('随便什么数据');
    }, 2000);
}).then(function(a){
    console.log(a);
}).catch(function(){
    console.log("error");
});