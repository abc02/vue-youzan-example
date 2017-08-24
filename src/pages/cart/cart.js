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
        allSelected: true,
        editingShop: null
    },
    computed: {
        selectLists() {
            let arr = []
            this.lists.forEach(shop => {
                shop.goodsList.forEach(good => {
                    if (good.checked) {
                        arr.push(good)
                    }
                })
                return arr
            })
        },
        removeLists() {
            if (!this.editingShop) {
                return []
            } else {
                let arr = []
                this.editingShop.goodsList.forEach(good => {
                    if (good.checked) {
                        arr.push(good)
                    }
                })
                return arr
            }
        }
    },
    created() {
        this.getCarttList()
    },
    methods: {
        getCarttList() {
            axios.get(url.cartList).then(res => {
                let lists = res.data.cartList
                console.log(lists)
                lists.forEach(shop => {
                    shop.checked = true
                    shop.editing = false
                    shop.editingMsg = '编辑'
                    shop.goodsList.forEach(good => {
                        good.checked = true
                    })
                });
                this.lists = lists
            }, error => {
                console.log('error: ' + error)
            })
        },
        selectGood(shop, good) {
            console.log(shop, good)
            good.checked = !good.checked
            shop.checked = shop.goodsList.every(good => {
                return good.checked
            })
            this.isSelectAll()
        },
        selectShop(shop) {
            shop.checked = !shop.checked
            shop.goodsList.forEach(good => {
                good.checked = shop.checked
            })
            this.isSelectAll()
        },
        selectAll() {
            this.allSelected = !this.allSelected

            // 进入编辑模式下,只操作当前shop列表checked
            if (this.editingShop) {
                this.editingShop.checked = this.allSelected
                this.editingShop.goodsList.forEach(good => {
                    good.checked = this.allSelected
                })
                return
            }

            this.lists.forEach(shop => {
                shop.checked = this.allSelected
                shop.goodsList.forEach(good => {
                    good.checked = this.allSelected
                })
            })
        },
        isSelectAll() {
            if (this.editingShop) {
                this.allSelected = this.editingShop.checked
                return
            }
            this.allSelected = this.lists.every(shop => {
                return shop.checked
            })
        },
        edit(shop, index) {
            shop.editing = !shop.editing
            if (shop.editing) {
                shop.editingMsg = '完成'
                //处理其他店铺不能编辑状态
                this.lists.forEach((item, i) => {
                    console.log(index, i)
                    if (index !== i) {
                        item.editing = false
                        item.editingMsg = ''
                    }
                })
            } else {
                this.lists.forEach((item, i) => {
                    item.editingMsg = '编辑'
                })
            }
            // 当前需要编辑商品传给editingShop
            this.editingShop = shop.editing ? shop : null
            // 进入编辑模式check打钩去掉
            shop.checked = !shop.editing
            shop.goodsList.forEach(good => {
                good.checked = shop.checked

            })
            // 处理是否全选了商品列表
            this.isSelectAll()
        },
        changeSkuNum(good, num) {
            if (num < 0 && good.number === 1) return
            good.number += num
        },
        removeGood(shop, index) {
            console.log(shop)
            this.editingShop.goodsList.splice(index, 1)
            if (!this.editingShop.goodsList.length) {
                this.editingShop.editing = false
                this.editingShop = null
                this.lists.forEach((item, i) => {
                    item.editingMsg = '编辑'
                })
            }
        }
    },
    mixins: [mixin]
})
