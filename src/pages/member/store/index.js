import Vue from 'vue'
import Vuex from 'vuex'
// 使用插件
Vue.use(Vuex)

import Address from 'js/addressService.js'

// 创建store实例
const store = new Vuex.Store({
    state: {
        lists: null,
    },
    mutations: {
        init(state, lists) {
            state.lists = lists
        },
        add(state, data) {
            state.lists.push(data)
        },
        update(state, instance) {
            let lists = [].concat(state.lists)
            let index = lists.findIndex(item => {
                return item.id === instance.id
            })
            console.log(index)
            lists[index] = instance
            state.lists = lists
        },
        remove(state, id) {
            let lists = state.lists
            let index = lists.findIndex(item => {
                return item.id === id
            })
            console.log(index)
            state.lists.splice(index,1)
        },
        setDefault(state, id) {
            let lists = state.lists
            lists.forEach(item => {
                item.isDefault = item.id === id ? true : false
            })
        }
    },
    actions: {
        getLists({ commit }) {
            Address.list().then(res => {
                commit('init', res.data.lists)
            })
        },
        addAction({ commit }, data) {
            Address.add(data).then(res => {
                commit('add', data)
            })
        },
        updateAction({ commit }, instance) {
            Address.update(instance).then(res => {
                instance.id = parseInt(Math.random()*10000)
                console.log(instance)
                commit('update', instance)
            })
        },
        removeAction({ commit }, id) {
            Address.remove(id).then(res => {
                commit('remove', id)
            })
        },
        setDefaultAction({ commit }, id) {
            Address.setDefault(id).then(res => {
                commit('setDefault', id)
            })
        }
    },
})

export default store