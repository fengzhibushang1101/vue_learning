/**
 * Created by jyq on 2017/10/26.
 */
import Vue from 'vue';

Vue.component('child', {
    // 声明 props
    props: {
        myMessage: {
            type: String,
            default: 'Hello12312312'
        }
    },
    // 就像 data 一样，prop 也可以在模板中使用
    // 同样也可以在 vm 实例中通过 this.message 来使用
    template: '<span>{{ myMessage }}</span>',

})

Vue.component('button-counter', {
    template: '<button v-on:click="incrementCounter">{{ counter }}</button>',
    data: ()=>{return {"counter": 0}},
    methods: {
        incrementCounter: function () {
            this.counter += 1
            this.$emit('increment')
        }
    }
})

Vue.component('button-num', {
    template: '<p>{{ total }}</p>',
    props: {
        total: {
            type: Number,
            default: 0
        }
    }
})

Vue.component('b-com', {
    template: '<div><button-num :total="total"></button-num> ' +
    '<button-counter @increment="incrementTotal" v-for="i in counterNum"></button-counter> </div>',
    props: {
        counterNum: {
            type: Number,
            default: 10
        }
    },
    data: ()=>{
        return {
            total: 0
        }
    },
    methods: {
        incrementTotal: function () {
            this.total += 1
        }
    }
})