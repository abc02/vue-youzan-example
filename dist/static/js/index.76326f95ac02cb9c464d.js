webpackJsonp([5],{10:function(t,e){},11:function(t,e){},12:function(t,e,n){function a(t){n(11)}var i=n(5)(n(6),n(15),a,null,null);t.exports=i.exports},13:function(t,e,n){function a(t){n(10)}var i=n(5)(n(7),n(14),a,null,null);t.exports=i.exports},14:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"swiper-container"},[n("div",{staticClass:"swiper-wrapper"},t._l(t.lists,function(t){return n("div",{staticClass:"swp-page swiper-slide"},[n("a",{staticClass:"js-no-follow",attrs:{href:t.clickUrl}},[n("img",{staticClass:"goods-main-photo fadeIn",attrs:{src:t.image}})])])})),t._v(" "),n("div",{staticClass:"swiper-pagination"})])},staticRenderFns:[]}},15:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"bottom-nav"},[n("ul",t._l(t.navConfig,function(e,a){return n("li",{class:{active:a==t.curIndex},on:{click:function(n){t.changNav(e,a)}}},[n("a",[n("i",{class:e.icon}),t._v(" "),n("div",[t._v(t._s(e.name))])])])}))])},staticRenderFns:[]}},18:function(t,e){},2:function(t,e,n){"use strict";var a={hotLists:"/index/hotLists",banner:"/index/banner",topList:"/category/topList",subList:"/category/subList",rank:"/category/rank",searchList:"/search/list",details:"/goods/details",deal:"/goods/deal",cartAdd:"/cart/add",cartRemove:" /cart/reduce",cartUpdate:"/cart/update",cartReduc:"/cart/reduce",cartList:"/cart/list",memberList:"/member/list-test"};for(var i in a)a.hasOwnProperty(i)&&(a[i]="https://bird.ioliu.cn/v1?url=http://rapapi.org/mockjsdata/24170"+a[i]);e.a=a},3:function(t,e,n){"use strict";var a=n(17),i=n.n(a),s=n(8),r=(n.n(s),n(20)),o=n.n(r),c=n(0),l=n(1),u=n.n(l),d=n(12),p=n.n(d),f=n(13),h=n.n(f);c.default.use(o.a);var g={methods:{getLists:function(t,e){var n=this;console.log(t,e),this.allLoaded||(this.loading=!0,u.a.post(t,e).then(function(t){var e=t.data.lists;if(e.length<n.pageSize&&(n.allLoaded=!0),n.lists){var a;(a=n.lists).push.apply(a,i()(e))}else n.lists=e;n.pageNum++,n.loading=!1}))}},filters:{currency:function(t){var e=""+t;if(e.indexOf(".")>-1){var n=e.split(".");return n[0]+"."+(n[1]+"0").substr(0,2)}return e+".00"}},components:{Foot:p.a,Swipe:h.a}};e.a=g},6:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(16),i=n.n(a),s=i.a.parse(location.search.substr(1)),r=s.index,o=[{name:"有赞",icon:"icon-home",href:"index.html"},{name:"分类",icon:"icon-category",href:"category.html"},{name:"购物车",icon:"icon-cart",href:"cart.html"},{name:"我",icon:"icon-user",href:"member.html"}];e.default={data:function(){return{navConfig:o,curIndex:parseInt(r)||0}},methods:{changNav:function(t,e){location.href=t.href+"?index="+e}}}},66:function(t,e){},7:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(21),i=n.n(a),s=n(9);n.n(s);e.default={name:"swipe",props:["lists","name"],created:function(){},mounted:function(){new i.a(".swiper-container",{loop:!0,autoplay:2e3,pagination:".swiper-pagination"})}}},8:function(t,e){},9:function(t,e){},91:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(17),i=n.n(a),s=n(18),r=(n.n(s),n(66)),o=(n.n(r),n(0)),c=n(1),l=n.n(c),u=n(2),d=n(3);new o.default({el:"#app",data:{bannerLists:null,lists:null,pageNum:1,pageSize:6,loading:!1,allLoaded:!1},created:function(){this.gethotLists(),this.getBanner()},methods:{gethotLists:function(){var t=this,e={pageNum:this.pageNum,pageSize:this.pageSize};this.allLoaded||(this.loading=!0,l.a.post(u.a.hotLists,e).then(function(e){var n=e.data.lists;if(n&&(console.log(n),n.forEach(function(t,e,n){t.img=t.img.replace("http:","")}),console.log(n)),n.length<t.pageSize&&(t.allLoaded=!0),t.lists){var a;(a=t.lists).push.apply(a,i()(n))}else t.lists=n;t.pageNum++,t.loading=!1}))},getBanner:function(){var t=this;l.a.get(u.a.banner).then(function(e){t.bannerLists=e.data.lists})}},mixins:[d.a]})}},[91]);
//# sourceMappingURL=index.76326f95ac02cb9c464d.js.map