import Vue from 'vue'
import axios from 'axios'

import Foot from 'components/Foot.vue'
import Swipe from 'components/Swipe.vue'

let mixin = {
    methods: {
        getLists(url, obj) {
            console.log(url, obj)

            if (this.allLoaded) return
            this.loading = true
            axios.post(url, obj).then(res => {
                let curLists = res.data.lists
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
        replaceHttp(arr) {
            if (arr) {
                arr.forEach((val, index, array) => {
                    if (val['img']) {
                        val['img'] = val['img'].replace('http:', '')
                    } else if (val['image']) {
                        val['image'] = val['image'].replace('http:', '')
                    }
                })
            }
            return arr 
        }
    },
    filters: {
        currency(price) {
            let priceStr = '' + price
            if (priceStr.indexOf('.') > -1) {
                let arr = priceStr.split('.')
                return arr[0] + '.' + (arr[1] + '0').substr(0, 2)
            } else {
                return priceStr + '.00'
            }
        }
    },
    components: {
        Foot,
        Swipe
    }
}

export default mixin