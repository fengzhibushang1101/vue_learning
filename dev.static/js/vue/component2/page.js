/**
 * Created by jyq on 2017/10/25.
 */


import '../_big_component'
import Vue from 'vue'
new Vue({
    el: '#example',
    data: {
        parentMsg: "Hello!",
    },
    methods: {
    }
})

new Vue({
    el: '#event-example',
})