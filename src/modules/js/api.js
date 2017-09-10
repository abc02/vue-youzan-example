let url = {
    hotLists: '/index/hotLists',
    banner: '/index/banner',
    topList: '/category/topList',
    subList: '/category/subList',
    rank: '/category/rank',
    searchList: '/search/list',
    details: '/goods/details',
    deal: '/goods/deal',
    cartAdd: '/cart/add',
    cartRemove: '/cart/remove',
    cartMremove: '/cart/mremove',
    cartUpdate: '/cart/update',
    cartReduce: '/cart/reduce',
    cartList: '/cart/list',
    memberList: '/member/list-test',
    addressLists: '/address/list',
    addressAdd : '/address/add',
    addressRemove: '/address/remove',
    addressUpdate: '/address/update',
    addressSetDfault: '/address/setDefault'
}


// 开发环境和金额真实环境切换
// let host = ''
let host = 'https://bird.ioliu.cn/v1?url=http://rapapi.org/mockjsdata/24170'

for (let key in url) {
    if (url.hasOwnProperty(key)) {
        url[key] = host + url[key]
    }
}

export default url