/**
 * Created by jyq on 2017/10/25.
 */

import Vue from 'vue'
let currencyValidator = {
    format: function (number) {
        return (Math.trunc(number * 100) / 100).toFixed(2)
    },
    parse: function (newString, oldNumber) {
        var CleanParse = function (value) {
            return { value: value }
        }
        var CurrencyWarning = function (warning, value) {
            return {
                warning: warning,
                value: value,
                attempt: newString
            }
        }
        var NotAValidDollarAmountWarning = function (value) {
            return new CurrencyWarning(newString + ' is not a valid dollar amount', value)
        }
        var AutomaticConversionWarning = function (value) {
            return new CurrencyWarning(newString + ' was automatically converted to ' + value, value)
        }

        var newNumber = Number(newString)
        var indexOfDot = newString.indexOf('.')
        var indexOfE = newString.indexOf('e')

        if (isNaN(newNumber)) {
            if (
                indexOfDot === -1 &&
                indexOfE > 0 &&
                indexOfE === newString.length - 1 &&
                Number(newString.slice(0, indexOfE)) !== 0
            ) {
                return new CleanParse(oldNumber)
            } else {
                return new NotAValidDollarAmountWarning(oldNumber)
            }
        }

        var newCurrencyString = currencyValidator.format(newNumber)
        var newCurrencyNumber = Number(newCurrencyString)

        if (newCurrencyNumber === newNumber) {
            if (indexOfE !== -1 && indexOfE === newString.length - 2) {
                return new AutomaticConversionWarning(newNumber)
            } else {
                return new CleanParse(newNumber)
            }
        } else {
            return new NotAValidDollarAmountWarning(
                newNumber > newCurrencyNumber
                    ? newCurrencyNumber
                    : oldNumber
            )
        }
    }
}

let data = {counter: 0}
Vue.component('my-component', {
    template: '<div>A custom component!</div>'
});

Vue.component('simple-counter', {
    template: '<button v-on:click="counter += 1">{{ counter }}</button>',
    data: ()=>{
        return data
    }
})

Vue.component('button-counter', {
    template: '<button v-on:click="incrementCounter">{{ counter }}</button>',
    data: function () {
        return {
            counter: 0
        }
    },
    methods: {
        incrementCounter: function () {
            this.counter += 1
            this.$emit('increment')
        }
    },
})

Vue.component('child', {
    // 声明 props
    props: ['message'],
    // 就像 data 一样，prop 也可以在模板中使用
    // 同样也可以在 vm 实例中通过 this.message 来使用
    template: '<span>{{ message }}</span>'
})

Vue.component('example', {
    props: {
        // 基础类型检测 (`null` 指允许任何类型)
        propA: Number,
        // 可能是多种类型
        propB: [String, Number],
        // 必传且是字符串
        propC: {
            type: String,
            required: true
        },
        // 数值且有默认值
        propD: {
            type: Number,
            default: 100
        },
        // 数组/对象的默认值应当由一个工厂函数返回
        propE: {
            type: Object,
            default: function () {
                return { message: 'hello' }
            }
        },
        // 自定义验证函数
        propF: {
            validator: function (value) {
                return value > 10
            }
        }
    }
})


// Vue.component('currency-input', {
//     template: '\
//     <span>\
//       $\
//       <input\
//         ref="input"\
//         v-bind:value="value"\
//         v-on:input="updateValue($event.target.value)"\
//       >\
//     </span>\
//   ',
//     props: ['value'],
//     methods: {
//         // 不是直接更新值，而是使用此方法来对输入值进行格式化和位数限制
//         updateValue: function (value) {
//             var formattedValue = value
//             // 删除两侧的空格符
//                 .trim()
//                 // 保留 2 位小数
//                 .slice(
//                     0,
//                     value.indexOf('.') === -1
//                         ? value.length
//                         : value.indexOf('.') + 3
//                 )
//             // 如果值尚不合规，则手动覆盖为合规的值
//             if (formattedValue !== value) {
//                 this.$refs.input.value = formattedValue
//             }
//             // 通过 input 事件带出数值
//             this.$emit('input', Number(formattedValue))
//         }
//     }
// })
//


Vue.component('currency-input', {
    template: '\
    <div>\
      <label v-if="label">{{ label }}</label>\
      $\
      <input\
        ref="input"\
        v-bind:value="value"\
        v-on:input="updateValue($event.target.value)"\
        v-on:focus="selectAll"\
        v-on:blur="formatValue"\
      >\
    </div>\
  ',
    props: {
        value: {
            type: Number,
            default: 0
        },
        label: {
            type: String,
            default: ''
        }
    },
    mounted: function () {
        this.formatValue()
    },
    methods: {
        updateValue: function (value) {
            var result = currencyValidator.parse(value, this.value)
            if (result.warning) {
                this.$refs.input.value = result.value
            }
            this.$emit('input', result.value)
        },
        formatValue: function () {
            this.$refs.input.value = currencyValidator.format(this.value)
        },
        selectAll: function (event) {
            // Workaround for Safari bug
            // http://stackoverflow.com/questions/1269722/selecting-text-on-focus-using-jquery-not-working-in-safari-and-chrome
            setTimeout(function () {
                event.target.select()
            }, 0)
        }
    }
})

