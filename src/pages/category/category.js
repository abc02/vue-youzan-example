import 'css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'



new Vue({
    el: '#app',
    data: {
        topLists: null,
        topIndex: 0,
        subData: null,
        rankData: null
    },
    created() {
        this.getTopList()
        this.getSubList(0)
    },
    methods: {
        getTopList() {
            axios.post(url.topList).then(res => {
                console.log(res)
                this.topLists =  this.replaceHttp(res.data.lists)
            }).catch(res => {
                new Error(res)
            })
        },
        getSubList(index, id) {
            this.topIndex = index
            if (index === 0) {
                this.getRank()
            } else {
                axios.post(url.subList, { id }).then(res => {
                    this.subData = this.replaceHttp(res.data.data)
                }).catch(res => {
                    new Error(res)
                })
            }
        },
        getRank() {
            axios.post(url.rank).then(res => {
                console.log(res)
                this.rankData =  this.replaceHttp(res.data.data)
            }).catch(res => {
                new Error(res)
            })
        },
        toSearch(list) {
            location.href = `search.html?keyword=${list.name}&id=${list.id}`
        }
    },
    mixins: [mixin]

})