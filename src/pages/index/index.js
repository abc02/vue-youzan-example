import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'


new Vue({
    el: '#app',
    data: {
        bannerLists: null,
        lists: null,
        pageNum: 1,
        pageSize: 6,
        loading: false, //是否继续加载
        allLoaded: false,
    },
    created() {
        this.gethotLists()
        this.getBanner()
    },
    methods: {
        gethotLists() {
            let obj = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
            }
            // console.log(url, obj)

            if (this.allLoaded) return
            this.loading = true
            axios.post(url.hotLists, obj).then(res => {
                let curLists = res.data.lists
                if(curLists){
                    console.log(curLists)
                    curLists.forEach((val,index,array) => {
                        val['img'] = val['img'].replace('http:','')
                    })
                    console.log(curLists)
                }
                if (curLists.length < this.pageSize) { //判断所有数据是否加载完毕
                    this.allLoaded = true
                }
                if (this.lists) {
                    this.lists.push(...curLists)
                } else {
                    this.lists = curLists //初始化数据
                }
                this.pageNum++
                this.loading = false
            })
        },
        getBanner() {
            axios.get(url.banner).then(res => {
                this.bannerLists = res.data.lists
            })
        }
    },
    mixins: [mixin]
})