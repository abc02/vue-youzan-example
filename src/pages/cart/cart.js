import './cart_base.css'
import './cart_trade.css'
import './cart.css'


import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'

new Vue({
    el: '#app',
    data: {
        lists: null,
    },
    created() {
        this.geCarttList()
    },
    methods: {
        geCarttList() {
            axios.get(url.cartList).then(res => {
                this.lists = res.data.cartList
            })
        }
    },
    mixins: [mixin]
})
