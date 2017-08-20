import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

import Foot from 'components/Foot.vue'
import Swipe from 'components/Swipe.vue'

new Vue({
    el: '#app',
    data: {
        lists: null,
        bannerLists: null,
        pageNum: 1,
        pageSize: 6,
        loading: false, //是否继续加载
        allLoaded: false,
    },
    created() {
        this.getLists()
        this.getBanner()
    },
    methods: {
        getLists() {
            if (this.allLoaded) return
            this.loading = true
            axios.post(url.hotLists, {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then(res => {
                let curLists = res.data.lists
                if (curLists.length < this.pageSize) { //判断所有数据是否加载完毕
                    this.allLoaded = true
                }
                if (this.lists) {
                    this.lists.push(...curLists)
                } else {
                    this.lists = curLists //初始化数据
                }
                this.loading = false
                this.pageNum++
            })
        },
        getBanner() {
            axios.get(url.banner).then(res => {
                this.bannerLists = res.data.lists
            })
        }
    },
    components: {
        Foot,
        Swipe
    }
})