let url = {
    hotLists: '/index/hotLists',
    banner: '/index/banner',
    topList: '/category/topList',
    subList: '/category/subList',
    rank: '/category/rank'
}


// 开发环境和金额真实环境切换
// let host = ''
let host = 'http://rapapi.org/mockjsdata/24170'

for (let key in url) {
    if (url.hasOwnProperty(key)) {
        url[key] = host + url[key]
    }
}

export default url