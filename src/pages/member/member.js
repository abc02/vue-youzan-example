import './member_base.css'
import './member.css'


import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'



let orderConfig = {
    topay: {
        icon: 'link-topay',
        link: 'javascript:;',
        text: '代付款'
    },
    totuan: {
        icon: 'link-totuan',
        link: 'javascript:;',
        text: '待付款'
    },
    tosend: {
        icon: 'link-tosend',
        link: 'javascript:;',
        text: '待发货'
    },
    send: {
        icon: 'link-send',
        link: 'javascript:;',
        text: '待收货'
    },
    rights: {
        icon: 'link-rights',
        link: 'javascript:;',
        text: '退款/维权'
    }
}
let blockListsConfig = {
    allOrder: [
        {
            icon: 'ico-order',
            link: 'javascript:;',
            text: '全部订单'
        }
    ],
    favorite: [
        {
            icon: 'ico-favior',
            link: 'javascript:;',
            text: '收藏的商品'
        },
        {
            icon: 'ico-shop',
            link: 'javascript:;',
            text: '收藏的店铺'
        },
        {
            icon: 'ico-bought',
            link: 'javascript:;',
            text: '我买过的'
        },
        {
            icon: 'ico-history',
            link: 'javascript:;',
            text: '我的浏览记录'
        }
    ],
    members: [
        {
            icon: 'ico-card',
            link: 'javascript:;',
            text: '我的会员卡'
        },
        {
            icon: 'ico-coupon',
            link: 'javascript:;',
            text: '我的优惠券'
        },
        {
            icon: 'ico-luckymoney',
            link: 'javascript:;',
            text: '我的红包'
        },
        {
            icon: 'ico-backs',
            link: 'javascript:;',
            text: '我的返现'
        }
    ],
    other: [
        {
            icon: 'ico-setting',
            link: 'javascript:;',
            text: '个人设置'
        },
        {
            icon: 'ico-help',
            link: 'javascript:;',
            text: '联系有赞客服'
        }
    ]
}
new Vue({
    el: '.container',
    data: {
        lists: null,
        order: orderConfig,
        blockLists: blockListsConfig,
        userInfo: null,
    },
    created() {
        this.getMemberList()
    },
    methods: {
        getMemberList() {
            axios.get(url.memberList).then(res => {
                let lists = res.data.data
                console.log(lists)
                this.userInfo = lists.userInfo
            })
        }
    },
    mixins: [mixin]
})