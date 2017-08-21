import Vue from 'vue'
import axios from 'axios'

import Foot from 'components/Foot.vue'
import Swipe from 'components/Swipe.vue'

import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

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