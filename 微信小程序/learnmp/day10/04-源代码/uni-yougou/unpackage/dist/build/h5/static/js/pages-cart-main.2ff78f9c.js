(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-cart-main"],{"0627":function(t,e,i){var o=i("872a");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var n=i("4f06").default;n("4038e718",o,!0,{sourceMap:!1,shadowMode:!1})},"1c62":function(t,e,i){"use strict";var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"content"},[t._m(0),i("ul",{staticClass:"goods-list"},t._l(t.goodsList,function(e){return i("li",{key:e.goods_id,staticClass:"goods-item"},[i("span",{staticClass:"iconfont",class:e.checked?"icon-check":"icon-uncheck",on:{click:function(i){i=t.$handleEvent(i),e.checked=!e.checked}}}),i("img",{attrs:{src:e.goods_small_logo,alt:""}}),i("div",{staticClass:"right"},[i("p",{staticClass:"text-line2"},[t._v(t._s(e.goods_name))]),i("div",{staticClass:"btm"},[i("span",{staticClass:"price"},[t._v("￥"),i("span",[t._v(t._s(e.goods_price))]),t._v(".00")]),i("div",{staticClass:"goods-num"},[i("v-uni-button",{attrs:{disabled:e.num<2},on:{click:function(i){i=t.$handleEvent(i),e.num--}}},[t._v("-")]),i("span",[t._v(t._s(e.num))]),i("v-uni-button",{on:{click:function(i){i=t.$handleEvent(i),e.num++}}},[t._v("+")])],1)])])])}),0),i("div",{staticClass:"account"},[i("div",{staticClass:"select-all"},[i("span",{staticClass:"iconfont",class:t.isAll?"icon-check":"icon-uncheck",on:{click:function(e){e=t.$handleEvent(e),t.isAll=!t.isAll}}}),i("span",[t._v("全选")])]),i("div",{staticClass:"price"},[i("p",[t._v("合计:"),i("span",{staticClass:"num"},[t._v("￥"+t._s(t.totalPrice)+".00")])]),i("p",{staticClass:"info"},[t._v("包含运费")])]),i("div",{staticClass:"account-btn",on:{click:function(e){e=t.$handleEvent(e),t.doAccount(e)}}},[t._v("结算("+t._s(t.totalNum)+")")])])])},n=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"title"},[i("span",{staticClass:"iconfont icon-shop"}),i("span",[t._v("优购生活馆")])])}];i.d(e,"a",function(){return o}),i.d(e,"b",function(){return n})},"22f0":function(t,e,i){"use strict";i.r(e);var o=i("bf4b"),n=i.n(o);for(var a in o)"default"!==a&&function(t){i.d(e,t,function(){return o[t]})}(a);e["default"]=n.a},"872a":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".iconfont[data-v-c553d1a6]{font-size:%?50?%}.title[data-v-c553d1a6]{height:%?88?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.title .iconfont[data-v-c553d1a6]{color:#999;margin:%?6?% %?12?% 0 %?32?%}.goods-item[data-v-c553d1a6]{height:%?206?%;background-color:#fff;border-top:%?1?% solid #ddd;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.goods-item .iconfont[data-v-c553d1a6]{color:#eb4450;margin:0 %?30?%}.goods-item img[data-v-c553d1a6]{width:%?160?%;height:%?160?%}.goods-item .right[data-v-c553d1a6]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;margin:0 %?20?% 0 %?18?%}.goods-item .right .btm[data-v-c553d1a6]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin-top:%?40?%;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.goods-item .right .btm .price[data-v-c553d1a6]{color:#eb4450}.goods-item .right .btm .price>span[data-v-c553d1a6]{font-size:24px}.goods-item .right .btm .goods-num[data-v-c553d1a6]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.goods-item .right .btm .goods-num uni-button[data-v-c553d1a6]{width:%?60?%;height:%?50?%;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;border:%?4?% solid #666}.goods-item .right .btm .goods-num span[data-v-c553d1a6]{margin:0 %?30?%}.goods-list[data-v-c553d1a6]{position:absolute;bottom:%?98?%;top:%?88?%;width:100%;overflow:auto;padding-bottom:%?60?%;background-color:#f4f4f4}.account[data-v-c553d1a6]{height:%?98?%;border-bottom:%?1?% solid #ddd;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:absolute;left:0;right:0;bottom:0;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.account .iconfont[data-v-c553d1a6]{color:#eb4450;margin:0 %?30?%}.account .account-btn[data-v-c553d1a6]{width:%?230?%;height:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;color:#fff;background-color:#eb4450}.account .select-all[data-v-c553d1a6]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.account .price[data-v-c553d1a6]{margin-right:%?20?%}.account .price .num[data-v-c553d1a6]{color:#eb4450}.account .price .info[data-v-c553d1a6]{color:#999}",""])},a415:function(t,e,i){"use strict";var o=i("0627"),n=i.n(o);n.a},bf4b:function(t,e,i){"use strict";var o=i("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=o(i("a4bb"));i("ac6a"),i("6b54"),i("87b3");var a={data:function(){return{goodsList:[]}},onShow:function(){var t=this.$store.getters.getCart;this.getGoodsList(t),wx.setTabBarBadge({index:2,text:this.badgeNum.toString()})},onHide:function(){this.$store.commit("updateCart",this.goodsList)},computed:{isAll:{get:function(){return this.goodsList.every(function(t){return t.checked})},set:function(t){this.goodsList.forEach(function(e){e.checked=t})}},badgeNum:function(){return this.goodsList.reduce(function(t,e){return t+(e.checked?1:0)},0)},totalNum:function(){return this.goodsList.reduce(function(t,e){return t+(e.checked?e.num:0)},0)},totalPrice:function(){return this.goodsList.reduce(function(t,e){return t+(e.checked?e.num*e.goods_price:0)},0)}},methods:{doAccount:function(){if(this.totalNum){var t=wx.getStorageSync("token");t?wx.navigateTo({url:"/pages/pay/main"}):wx.navigateTo({url:"/pages/login/main"})}else this.$showToast("请添加商品")},getGoodsList:function(t){var e=this,i=(0,n.default)(t).join(",");if(!i.trim())return this.goodsList=[],void this.$showToast("购物车空的！");this.$request({url:"/api/public/v1/goods/goodslist?goods_ids="+i}).then(function(i){var o=i;o.forEach(function(e){var i=t[e.goods_id];e.num=i.num,e.checked=i.checked}),e.goodsList=o})}}};e.default=a},dfa5:function(t,e,i){"use strict";i.r(e);var o=i("1c62"),n=i("22f0");for(var a in n)"default"!==a&&function(t){i.d(e,t,function(){return n[t]})}(a);i("a415");var s=i("2877"),c=Object(s["a"])(n["default"],o["a"],o["b"],!1,null,"c553d1a6",null);e["default"]=c.exports}}]);