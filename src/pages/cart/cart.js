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
        removeMsg: ''
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
            Cart.gettList().then(res => {
                //console.log(res)
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
        },
        selectShop(shop) {
            let attr = this.editingShop ? 'removeChecked' : 'checked'
            shop[attr] = !shop[attr]
            shop.goodsList.forEach(good => {
                good[attr] = shop[attr]
            })
        },
        selectAll() {
            let attr = this.editingShop ? 'allRemoveSelected' : 'allSelected'
            this[attr] = !this[attr]
        },
        edit(shop, shopIndex) {
            // 当前店铺进入或退出编辑状态
            shop.editing = !shop.editing
            // 改变编辑状态Msg
            shop.editingMsg = shop.editing ? '完成' : '编辑'
            // 不等于当前店铺索引位置，其他店铺锁定正常模式，Msg清空
            this.lists.forEach((item, i) => {
                if (shopIndex !== i) {
                    item.editing = false
                    item.editingMsg = shop.editing ? '' : '编辑'
                }
            })
            //当前的商铺是否编辑模式，是传入当前店铺，否则清空商铺和索引位置
            this.editingShop = shop.editing ? shop : null
            this.editingShopIndex = shop.editing ? shopIndex : -1
       
        },
        reduce(good){
            if (good.number === 1) return
            Cart.reduce(good.id).then(res => {
                good.number--
            })
        },
        add(good) {
            Cart.add(good.id).then(res=>{
                good.number++
            })
        },
        remove(shop,shopIndex,good,goodIndex){
            // 显示弹窗
            this.removePopup = true
            // 传入删除的数据
            this.removeData = {shop,shopIndex,good,goodIndex}
            this.removeMsg = '确定要删除该商品吗？'
        },
        removeConfirm(){
            // 解构赋值
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
            // 清空编辑商铺
            this.editingShop = null
            // 清空编辑商铺索引
            this.editingShopIndex = -1
            // 所有商铺退出编辑模式
            this.lists.forEach(shop => {
                shop.editing = false
                shop.editingMsg = '编辑'
            })
        }
    },
    mixins: [mixin]
})
