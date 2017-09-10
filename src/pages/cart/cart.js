import './cart_base.css'
import './cart_trade.css'
import './cart.css'


import Vue from 'vue'
import mixin from 'js/mixin.js'
import Cart from 'js/cartService.js'
import VueTouch from 'vue-touch-easyhi'
VueTouch.config.swipe = {
    threshold: 50
}
Vue.use(VueTouch)
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
        removeData: null,
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
        reduce(good) {
            if (good.number === 1) return
            Cart.reduce(good.id).then(res => {
                good.number--
            })
        },
        add(good) {
            Cart.add(good.id).then(res => {
                good.number++
            })
        },
        remove(shop, shopIndex, good, goodIndex) {
            // 显示弹窗
            this.removePopup = true
            // 传入删除的数据
            this.removeData = { shop, shopIndex, good, goodIndex }
            this.removeMsg = '确定要删除该商品吗？'
        },
        removeList() {
            // 显示弹窗
            console.log('removeList')
            this.removePopup = true
            this.removeMsg = `确定将所选 ${this.removeLists.length} 个商品删除？`
        },
        removeConfirm() {
            // 解构赋值
            if (this.removeMsg === '确定要删除该商品吗？') {
                let { shop, shopIndex, good, goodIndex } = this.removeData
                Cart.cartRemove(good.id).then(res => {
                    shop.goodsList.splice(goodIndex, 1)
                    if (!shop.goodsList.length) {
                        this.lists.splice(shopIndex, 1)
                        this.removeShop()
                    }
                    this.removePopup = false
                })
            } else {
                let ids = []
                this.removeLists.forEach(good => {
                    ids.push(good.id)
                })
                Cart.cartMremove({ ids }).then(res => {
                    let arr = []
                    this.editingShop.goodsList.forEach(good => {
                        // 对比 => 删除列表和编辑列表的商品的id 
                        let index = this.removeLists.findIndex(item => {
                            return item.id == good.id
                        })
                        //  未删除则push到arr
                        if (index === -1) {
                            arr.push(good)
                        }
                    })
                    // arr未删除商铺 则赋值给编辑商铺内商品列表
                    if (arr.length) {
                        this.editingShop.goodsList = arr
                    } else {
                        // 商铺列表长度为0 ，删除编辑的商铺，还原其他商铺
                        this.lists.splice(this.editingShopIndex, 1)
                        this.removeShop()
                    }
                    this.removePopup = false
                })
            }
        },
        removeShop() {
            // 还原编辑商铺初始值
            this.editingShop = null
            this.editingShopIndex = -1
            // 所有商铺退出编辑模式
            this.lists.forEach(shop => {
                shop.editing = false
                shop.editingMsg = '编辑'
            })
        },
        onSwipeLeft(shopIndex,goodIndex) {
            // console.log('onSwipeLeft',shopIndex,goodIndex)
            // event is a Hammer Event Object 
            console.log(this.$refs[`goods-${shopIndex}-${goodIndex}`])
            
          }
    },
    mixins: [mixin]
})
