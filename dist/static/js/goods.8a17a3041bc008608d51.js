webpackJsonp([1],{10:function(t,n){},11:function(t,n){},12:function(t,n,e){function a(t){e(11)}var s=e(5)(e(6),e(15),a,null,null);t.exports=s.exports},13:function(t,n,e){function a(t){e(10)}var s=e(5)(e(7),e(14),a,null,null);t.exports=s.exports},14:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"swiper-container"},[e("div",{staticClass:"swiper-wrapper"},t._l(t.lists,function(t){return e("div",{staticClass:"swp-page swiper-slide"},[e("a",{staticClass:"js-no-follow",attrs:{href:t.clickUrl}},[e("img",{staticClass:"goods-main-photo fadeIn",attrs:{src:t.image}})])])})),t._v(" "),e("div",{staticClass:"swiper-pagination"})])},staticRenderFns:[]}},15:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"bottom-nav"},[e("ul",t._l(t.navConfig,function(n,a){return e("li",{class:{active:a==t.curIndex},on:{click:function(e){t.changNav(n,a)}}},[e("a",[e("i",{class:n.icon}),t._v(" "),e("div",[t._v(t._s(n.name))])])])}))])},staticRenderFns:[]}},2:function(t,n,e){"use strict";var a={hotLists:"/index/hotLists",banner:"/index/banner",topList:"/category/topList",subList:"/category/subList",rank:"/category/rank",searchList:"/search/list",details:"/goods/details",deal:"/goods/deal",cartAdd:"/cart/add",cartRemove:" /cart/reduce",cartUpdate:"/cart/update",cartReduc:"/cart/reduce",cartList:"/cart/list",memberList:"/member/list-test"};for(var s in a)a.hasOwnProperty(s)&&(a[s]="https://bird.ioliu.cn/v1?url=http://rapapi.org/mockjsdata/24170"+a[s]);n.a=a},3:function(t,n,e){"use strict";var a=e(17),s=e.n(a),i=e(8),o=(e.n(i),e(20)),r=e.n(o),c=e(0),u=e(1),l=e.n(u),d=e(12),f=e.n(d),h=e(13),p=e.n(h);c.default.use(r.a);var m={methods:{getLists:function(t,n){var e=this;console.log(t,n),this.allLoaded||(this.loading=!0,l.a.post(t,n).then(function(t){var n=t.data.lists;if(n.length<e.pageSize&&(e.allLoaded=!0),e.lists){var a;(a=e.lists).push.apply(a,s()(n))}else e.lists=n;e.pageNum++,e.loading=!1}))}},filters:{currency:function(t){var n=""+t;if(n.indexOf(".")>-1){var e=n.split(".");return e[0]+"."+(e[1]+"0").substr(0,2)}return n+".00"}},components:{Foot:f.a,Swipe:p.a}};n.a=m},59:function(t,n){},6:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e(16),s=e.n(a),i=s.a.parse(location.search.substr(1)),o=i.index,r=[{name:"有赞",icon:"icon-home",href:"index.html"},{name:"分类",icon:"icon-category",href:"category.html"},{name:"购物车",icon:"icon-cart",href:"cart.html"},{name:"我",icon:"icon-user",href:"member.html"}];n.default={data:function(){return{navConfig:r,curIndex:parseInt(o)||0}},methods:{changNav:function(t,n){location.href=t.href+"?index="+n}}}},60:function(t,n){},61:function(t,n){},62:function(t,n){},63:function(t,n){},64:function(t,n){},65:function(t,n){},7:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e(21),s=e.n(a),i=e(9);e.n(i);n.default={name:"swipe",props:["lists","name"],created:function(){},mounted:function(){new s.a(".swiper-container",{loop:!0,autoplay:2e3,pagination:".swiper-pagination"})}}},8:function(t,n){},9:function(t,n){},90:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e(60),s=(e.n(a),e(61)),i=(e.n(s),e(59)),o=(e.n(i),e(64)),r=(e.n(o),e(62)),c=(e.n(r),e(63)),u=(e.n(c),e(65)),l=(e.n(u),e(0)),d=e(1),f=e.n(d),h=e(2),p=e(3),m=e(16),v=e.n(m),g=v.a.parse(location.search.substr(1)),b=g.id,w=["商品详情","本店成交"];new l.default({el:"#app",data:{id:b,details:null,detailTab:w,tabIndex:0,dealLists:null,bannerLists:null,skuType:1,isShowSku:!1,skuNum:1,isAddCart:!1,showAddMessage:!1},created:function(){this.getDetails()},methods:{getDetails:function(){var t=this;f.a.post(h.a.details,{id:b}).then(function(n){t.details=n.data.data,t.bannerLists=[],t.details.imgs.forEach(function(n){t.bannerLists.push({clickUrl:"javascript:;",image:n})})})},changeTab:function(t){this.tabIndex=t,t&&this.getDeal()},getDeal:function(){var t=this;f.a.post(h.a.deal,{id:b}).then(function(n){t.dealLists=n.data.data.lists})},chooseSku:function(t){console.log(t),this.skuType=t,this.isShowSku=!0},changeSkuNum:function(t){t<0&&1===this.skuNum||(this.skuNum+=t)},addCart:function(){var t=this;f.a.post(h.a.cartAdd,{id:b,number:this.skuNum}).then(function(n){200===n.data.status&&(t.isShowSku=!1,t.isAddCart=!0,t.showAddMessage=!0,setTimeout(function(){t.showAddMessage=!1},1e3))})}},watch:{isShowSku:function(t,n){document.body.style.overflow=t?"hidden":"auto",document.querySelector("html").style.overflow=t?"hidden":"auto",document.body.style.height=t?"100%":"auto",document.querySelector("html").style.height=t?"100":"auto"}},mixins:[p.a]})}},[90]);
//# sourceMappingURL=goods.8a17a3041bc008608d51.js.map