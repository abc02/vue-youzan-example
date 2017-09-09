import './cart_base.css'
import './cart_trade.css'
import './cart.css'


import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import Cart from 'js/cartService.js'

new Vue({
    el: '.container',
    data: {
        lists: null,
        // allSelected: true,
        editingShop: null,
        editingShopIndex: -1,
        total: 0,
        count: 0,
        removePopup: false,
        removeData : null,
    },
    computed: {
        allSelected: {
            get() {
                if (this.lists && this.lists.length) {
                    return this.lists.every(shop => {
                        return shop.checked
                    })
                }
                return false

            },
            set(newVal) {
                this.lists.forEach(shop => {
                    shop.checked = newVal
                    shop.goodsList.forEach(good => {
                        good.checked = newVal
                    })
                })
            }
        },
        allRemoveSelected: {
            get() {
                if (this.editingShop) {
                    return this.editingShop.removeChecked
                }
                return false
            },
            set(newVal) {
                if (this.editingShop) {
                    this.editingShop.removeChecked = newVal
                    this.editingShop.goodsList.forEach(good => {
                        good.removeChecked = newVal
                    })
                }
            }
        },
        selectLists() {
            if (this.lists && this.lists.length) {
                let arr = []
                let total = 0
                let count = 0
                this.lists.forEach(shop => {
                    shop.goodsList.forEach(good => {
                        if (good.checked) {
                            arr.push(good)
                            total += good.price * good.number
                            count += good.number
                        }
                    })
                })
                this.count = count
                this.total = total
                return arr
            }
            return []
        },
        removeLists() {
            if (this.editingShop) {
                let arr = []
                this.editingShop.goodsList.forEach(good => {
                    if (good.removeChecked) {
                        arr.push(good)
                    }
                })
                return arr
            }
            return []
        }

    },
    created() {
        this.getCarttList()
    },
    methods: {
        getCarttList() {
            axios.get(url.cartList).then(res => {
                let lists = res.data.cartList
                lists.forEach(shop => {
                    shop.checked = true
                    shop.removeChecked = false
                    shop.editing = false
                    shop.editingMsg = '编辑'
                    shop.goodsList.forEach(good => {
                        good.image = good.image.replace('http:', '')
                        good.checked = true
                        good.removeChecked = false
                    })
                });
                this.lists = lists
            }, error => {
                console.log('error: ' + error)
            })
        },
        selectGood(shop, good) {
            let attr = this.editingShop ? 'removeChecked' : 'checked'
            good[attr] = !good[attr]
            shop[attr] = shop.goodsList.every(good => {
                return good[attr]
            })
            // this.isSelectAll()
        },
        selectShop(shop) {
            let attr = this.editingShop ? 'removeChecked' : 'checked'
            shop[attr] = !shop[attr]
            shop.goodsList.forEach(good => {
                good[attr] = shop[attr]
            })
            // this.isSelectAll()
        },
        selectAll() {
            let attr = this.editingShop ? 'allRemoveSelected' : 'allSelected'
            this[attr] = !this[attr]

            // 进入编辑模式下,只操作当前shop列表checked
            // if (this.editingShop) {
            //     this.editingShop.checked = this.allSelected
            //     this.editingShop.goodsList.forEach(good => {
            //         good.checked = this.allSelected
            //     })
            //     return
            // }

            // this.lists.forEach(shop => {
            //     shop.checked = this.allSelected
            //     shop.goodsList.forEach(good => {
            //         good.checked = this.allSelected
            //     })
            // })
        },
        // isSelectAll() {
        //     if (this.editingShop) {
        //         this.allSelected = this.editingShop.checked
        //         return
        //     }
        //     this.allSelected = this.lists.every(shop => {
        //         return shop.checked
        //     })
        // },
        edit(shop, shopIndex) {
            shop.editing = !shop.editing
            shop.editingMsg = shop.editing ? '完成' : '编辑'
            this.lists.forEach((item, i) => {
                if (shopIndex !== i) {
                    item.editing = false
                    item.editingMsg = shop.editing ? '' : '编辑'
                }
            })

            // // 当前需要编辑商品传给editingShop
            this.editingShop = shop.editing ? shop : null
            this.editingShopIndex = shop.editing ? shopIndex : -1
            // // 进入编辑模式check打钩去掉
            // shop.checked = !shop.editing
            // shop.goodsList.forEach(good => {
            //     good.checked = shop.checked

            // })
            // 处理是否全选了商品列表
            // this.isSelectAll()
        },
        reduce(good){
            if (good.number === 1) return
            axios.post(url.cartReduce, {
                id: good.id,
                number: 1
            }).then(res => {
                good.number--
            })
        },
        add(good) {
            // axios.post(url.cartAdd, {
            //     id:good.id,
            //     number:1
            // }).then(res=>{
            //     good.number++
            // })
            Cart.add(good.id).then(res=>{
                good.number++
            })
        },
        remove(shop,shopIndex,good,goodIndex){
            this.removePopup = true
            this.removeData = {shop,shopIndex,good,goodIndex}
        },
        removeConfirm(){
            let {shop,shopIndex,good,goodIndex} =  this.removeData
            axios.post(url.cartRemove,{
                id: good.id
            }).then(res => {
                shop.goodsList.splice(goodIndex, 1)
                if(!shop.goodsList.length){
                    this.lists.splice(shopIndex,1)
                    this.removeShop()
                }
                this.removePopup = false
            })
        },
        removeShop() {
            this.editingShop = null
            this.editingShopIndex = -1
            this.lists.forEach(shop => {
                shop.editing = false
                shop.editingMsg = '编辑'
            })
        }
    },
    mixins: [mixin]
})
