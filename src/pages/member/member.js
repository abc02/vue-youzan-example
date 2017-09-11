import Vue from 'vue'
import router from './router/index.js'
import store from './store/index.js'
//根组件注入
new Vue({
    el: '#app',
    router,
    store
})

