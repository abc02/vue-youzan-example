import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let routes = [{
    path: '/',
    component: require('./components/member.vue')
}, {
    path: '/address',
    component: require('./components/address.vue'),
    children: [
        {
            path: '',
            component: require('./components/all.vue')
        }, {
            path: 'all',
            name: 'all', // 命名路由
            component: require('./components/all.vue')
        }, {
            path: 'form',
            name: 'form', 
            component: require('./components/form.vue')
        }]
}]
// 创建Router实例
let router = new Router({
    routes,
})

//根组件注入
new Vue({
    el: '#app',
    router
})

