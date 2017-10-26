/**
 * Created by jyq on 2017/10/25.
 */


import Vue from 'vue'
import '../_my-component'

// 创建根实例
new Vue({
    el: '#example',
    data: {
        hello:"123123123"
    }
})


new Vue({
    el: '#counter-event-example',
    data: {
        total: 0,
        price: 123,
    },
    methods: {
        incrementTotal: function () {
            this.total += 1
        }
    }
})

new Vue({
    el: '#app10',
    data: {
        price: 0,
        shipping: 0,
        handling: 0,
        discount: 0
    },
    computed: {
        total: function () {
            return ((
                this.price * 100 +
                this.shipping * 100 +
                this.handling * 100 -
                this.discount * 100
            ) / 100).toFixed(2)
        }
    }
})