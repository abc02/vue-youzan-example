webpackJsonp([4],{10:function(t,n){},11:function(t,n){},12:function(t,n,i){function e(t){i(11)}var a=i(5)(i(6),i(15),e,null,null);t.exports=a.exports},13:function(t,n,i){function e(t){i(10)}var a=i(5)(i(7),i(14),e,null,null);t.exports=a.exports},14:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"swiper-container"},[i("div",{staticClass:"swiper-wrapper"},t._l(t.lists,function(t){return i("div",{staticClass:"swp-page swiper-slide"},[i("a",{staticClass:"js-no-follow",attrs:{href:t.clickUrl}},[i("img",{staticClass:"goods-main-photo fadeIn",attrs:{src:t.image}})])])})),t._v(" "),i("div",{staticClass:"swiper-pagination"})])},staticRenderFns:[]}},15:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"bottom-nav"},[i("ul",t._l(t.navConfig,function(n,e){return i("li",{class:{active:e==t.curIndex},on:{click:function(i){t.changNav(n,e)}}},[i("a",[i("i",{class:n.icon}),t._v(" "),i("div",[t._v(t._s(n.name))])])])}))])},staticRenderFns:[]}},2:function(t,n,i){"use strict";var e={hotLists:"/index/hotLists",banner:"/index/banner",topList:"/category/topList",subList:"/category/subList",rank:"/category/rank",searchList:"/search/list",details:"/goods/details",deal:"/goods/deal",cartAdd:"/cart/add",cartRemove:" /cart/reduce",cartUpdate:"/cart/update",cartReduc:"/cart/reduce",cartList:"/cart/list",memberList:"/member/list-test"};for(var a in e)e.hasOwnProperty(a)&&(e[a]="https://bird.ioliu.cn/v1?url=http://rapapi.org/mockjsdata/24170"+e[a]);n.a=e},3:function(t,n,i){"use strict";var e=i(17),a=i.n(e),s=i(8),o=(i.n(s),i(20)),r=i.n(o),c=i(0),l=i(1),u=i.n(l),d=i(12),p=i.n(d),f=i(13),v=i.n(f);c.default.use(r.a);var h={methods:{getLists:function(t,n){var i=this;console.log(t,n),this.allLoaded||(this.loading=!0,u.a.post(t,n).then(function(t){var n=t.data.lists;if(n.length<i.pageSize&&(i.allLoaded=!0),i.lists){var e;(e=i.lists).push.apply(e,a()(n))}else i.lists=n;i.pageNum++,i.loading=!1}))}},filters:{currency:function(t){var n=""+t;if(n.indexOf(".")>-1){var i=n.split(".");return i[0]+"."+(i[1]+"0").substr(0,2)}return n+".00"}},components:{Foot:p.a,Swipe:v.a}};n.a=h},6:function(t,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=i(16),a=i.n(e),s=a.a.parse(location.search.substr(1)),o=s.index,r=[{name:"有赞",icon:"icon-home",href:"index.html"},{name:"分类",icon:"icon-category",href:"category.html"},{name:"购物车",icon:"icon-cart",href:"cart.html"},{name:"我",icon:"icon-user",href:"member.html"}];n.default={data:function(){return{navConfig:r,curIndex:parseInt(o)||0}},methods:{changNav:function(t,n){location.href=t.href+"?index="+n}}}},67:function(t,n){},68:function(t,n){},7:function(t,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=i(21),a=i.n(e),s=i(9);i.n(s);n.default={name:"swipe",props:["lists","name"],created:function(){},mounted:function(){new a.a(".swiper-container",{loop:!0,autoplay:2e3,pagination:".swiper-pagination"})}}},8:function(t,n){},9:function(t,n){},92:function(t,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=i(68),a=(i.n(e),i(67)),s=(i.n(a),i(0)),o=i(1),r=i.n(o),c=i(2),l=i(3),u={topay:{icon:"link-topay",link:"javascript:;",text:"代付款"},totuan:{icon:"link-totuan",link:"javascript:;",text:"待付款"},tosend:{icon:"link-tosend",link:"javascript:;",text:"待发货"},send:{icon:"link-send",link:"javascript:;",text:"待收货"},rights:{icon:"link-rights",link:"javascript:;",text:"退款/维权"}},d={allOrder:[{icon:"ico-order",link:"javascript:;",text:"全部订单"}],favorite:[{icon:"ico-favior",link:"javascript:;",text:"收藏的商品"},{icon:"ico-shop",link:"javascript:;",text:"收藏的店铺"},{icon:"ico-bought",link:"javascript:;",text:"我买过的"},{icon:"ico-history",link:"javascript:;",text:"我的浏览记录"}],members:[{icon:"ico-card",link:"javascript:;",text:"我的会员卡"},{icon:"ico-coupon",link:"javascript:;",text:"我的优惠券"},{icon:"ico-luckymoney",link:"javascript:;",text:"我的红包"},{icon:"ico-backs",link:"javascript:;",text:"我的返现"}],other:[{icon:"ico-setting",link:"javascript:;",text:"个人设置"},{icon:"ico-help",link:"javascript:;",text:"联系有赞客服"}]};new s.default({el:".container",data:{lists:null,order:u,blockLists:d,userInfo:null},created:function(){this.getMemberList()},methods:{getMemberList:function(){var t=this;r.a.get(c.a.memberList).then(function(n){var i=n.data.data;console.log(i),t.userInfo=i.userInfo})}},mixins:[l.a]})}},[92]);
//# sourceMappingURL=member.1459f57525cc88a96879.js.map