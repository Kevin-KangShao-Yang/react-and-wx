(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/list/main"],{"12d1":function(t,n,e){"use strict";var i=e("4930"),o=e.n(i);o.a},"1b14":function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement;t._self._c;t._isMounted||(t.e0=function(n){t.activeIndex=t.index})},o=[];e.d(n,"a",function(){return i}),e.d(n,"b",function(){return o})},"2a16":function(t,n,e){"use strict";(function(t){e("f223"),e("921b");i(e("66fd"));var n=i(e("65c6"));function i(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("6e42")["createPage"])},4930:function(t,n,e){},"4f63":function(t,n,e){"use strict";function i(t){return a(t)||r(t)||o()}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function r(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function a(t){if(Array.isArray(t)){for(var n=0,e=new Array(t.length);n<t.length;n++)e[n]=t[n];return e}}Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=function(){return e.e("components/search").then(e.bind(null,"a703"))},u=6,c={components:{Search:s},data:function(){return{navArr:["综合","销量","价格"],activeIndex:0,keyword:"",goodsList:[],isLastPage:!1,isFixed:!1}},onLoad:function(t){this.keyword=t.keyword,this.isRequest=!1,this.reload()},onPullDownRefresh:function(){this.isFixed=!1,this.reload()},onReachBottom:function(){this.pageNum++,this.search()},onPageScroll:function(){this.isFixed=!0},methods:{toItem:function(t){wx.navigateTo({url:"/pages/item/main?goodsId="+t})},inputHandler:function(t){this.keyword=t,this.reload()},reload:function(){this.isLastPage=!1,this.goodsList=[],this.pageNum=1,this.search()},search:function(){var t=this;this.isRequest||this.isLastPage||(this.isRequest=!0,this.$request({url:"/api/public/v1/goods/search",data:{query:this.keyword,pagesize:u,pagenum:this.pageNum}}).then(function(n){t.goodsList=[].concat(i(t.goodsList),i(n.goods)),t.goodsList.length===n.total&&(t.isLastPage=!0)}).finally(function(){t.isRequest=!1}))}}};n.default=c},"65c6":function(t,n,e){"use strict";e.r(n);var i=e("1b14"),o=e("6d0d");for(var r in o)"default"!==r&&function(t){e.d(n,t,function(){return o[t]})}(r);e("12d1");var a=e("2877"),s=Object(a["a"])(o["default"],i["a"],i["b"],!1,null,null,null);n["default"]=s.exports},"6d0d":function(t,n,e){"use strict";e.r(n);var i=e("4f63"),o=e.n(i);for(var r in i)"default"!==r&&function(t){e.d(n,t,function(){return i[t]})}(r);n["default"]=o.a}},[["2a16","common/runtime","common/vendor"]]]);