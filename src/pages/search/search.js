import 'css/common.css'
import './search.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import Velocity from 'velocity-animate'
import qs from 'qs'

let { keyword, id } = qs.parse(location.search.substr(1))

new Vue({
    el: '.container',
    data: {
        keyword,
        isShow: false,
        lists: null,
        pageSize: 6,
        loading: false, //是否继续加载
    },
    created() {
        this.getSeachList()
    },
    methods: {
        getSeachList() {
            // this.loading = true
            // axios.post(url.searchList, { keyword, id }).then(res => {
            //     let curLists = res.data.lists
            //     if (this.lists) {
            //         this.lists.push(...curLists)
            //     } else {
            //         this.lists = curLists //初始化数据
            //     }
            //     this.loading = false
            // })
            axios.post(url.searchList, { keyword, id }).then(res => {
                this.lists = res.data.lists
            })
        },
        move() {
            if (document.body.scrollTop > 100) {
                this.isShow = true
            } else {
                this.isShow = false
            }
        },
        toTop() {
            Velocity(document.body, 'scroll', { duration: 1000 })
        }
    },
    mixins: [mixin],
})