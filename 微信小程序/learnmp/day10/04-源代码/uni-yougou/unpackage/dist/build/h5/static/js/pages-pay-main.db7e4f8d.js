(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-pay-main"],{"1b57":function(e,t,i){"use strict";i.r(t);var o=i("ba58"),s=i.n(o);for(var a in o)"default"!==a&&function(e){i.d(t,e,function(){return o[e]})}(a);t["default"]=s.a},"21a6":function(e,t,i){t=e.exports=i("2350")(!1),t.push([e.i,".address-wrapper[data-v-a9629e76]{background-color:#fff}.address[data-v-a9629e76]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;padding:%?44?% %?30?% %?48?% %?20?%}.address .receiver[data-v-a9629e76]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;margin-bottom:%?50?%;position:relative}.address .receiver .phone-num[data-v-a9629e76]{margin-right:%?40?%}.address .receiver .icon-arrow-right[data-v-a9629e76]{position:absolute;top:%?8?%;right:0;color:#999}.choose-address[data-v-a9629e76]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding:%?44?% %?30?% %?48?% %?20?%;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.choose-address .icon-arrow-right[data-v-a9629e76]{color:#999}.flower img[data-v-a9629e76]{height:%?16?%;width:100%;display:block}.goods-item[data-v-a9629e76]{height:%?206?%;background-color:#fff;border-top:%?1?% solid #ddd;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.goods-item img[data-v-a9629e76]{width:%?160?%;height:%?160?%;margin-left:%?30?%}.goods-item .right[data-v-a9629e76]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;margin:0 %?20?% 0 %?18?%}.goods-item .right .btm[data-v-a9629e76]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin-top:%?40?%;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.goods-item .right .btm .price[data-v-a9629e76]{color:#eb4450}.goods-item .right .btm .price>span[data-v-a9629e76]{font-size:24px}.goods-item .right .btm .goods-num[data-v-a9629e76]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.goods-item .right .btm .goods-num uni-button[data-v-a9629e76]{width:%?60?%;height:%?50?%;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;border:%?4?% solid #666}.goods-item .right .btm .goods-num span[data-v-a9629e76]{margin:0 %?30?%}.goods-list[data-v-a9629e76]{position:absolute;bottom:%?98?%;top:%?243?%;width:100%;overflow:auto;padding-bottom:%?60?%;background-color:#f4f4f4}.bottom-fixed[data-v-a9629e76]{position:absolute;height:%?98?%;left:0;right:0;bottom:0;background-color:#1aad19;color:#fff;line-height:%?98?%;text-align:center}",""])},2532:function(e,t,i){var o=i("21a6");"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var s=i("4f06").default;s("6bb2d62d",o,!0,{sourceMap:!1,shadowMode:!1})},"375e":function(e,t,i){"use strict";var o=i("2532"),s=i.n(o);s.a},"3e1f":function(e,t,i){"use strict";var o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",{staticClass:"address-wrapper"},[e.addr.userName?i("div",{staticClass:"address"},[i("div",{staticClass:"receiver"},[i("p",{staticClass:"name"},[e._v("收货人："+e._s(e.addr.userName))]),i("p",{staticClass:"phone-num"},[e._v(e._s(e.addr.telNumber))]),i("span",{staticClass:"iconfont icon-arrow-right"})]),i("p",{staticClass:"address-txt"},[e._v("收货地址："+e._s(e.fullAddr))])]):i("div",{staticClass:"choose-address",on:{click:function(t){t=e.$handleEvent(t),e.getAddr(t)}}},[i("p",[e._v("请选择地址")]),i("span",{staticClass:"iconfont icon-arrow-right"})]),e._m(0)]),i("ul",{staticClass:"goods-list"},e._l(e.goodsList,function(t){return i("li",{key:t.goods_id,staticClass:"goods-item"},[i("img",{attrs:{src:t.goods_small_logo,alt:""}}),i("div",{staticClass:"right"},[i("p",{staticClass:"text-line2"},[e._v(e._s(t.goods_name))]),i("div",{staticClass:"btm"},[i("span",{staticClass:"price"},[e._v("￥"),i("span",[e._v(e._s(t.goods_price))]),e._v(".00")]),i("div",{staticClass:"goods-num"},[i("span",[e._v(e._s(t.num))])])])])])}),0),i("div",{staticClass:"bottom-fixed",on:{click:function(t){t=e.$handleEvent(t),e.pay(t)}}},[e._v("微信支付("+e._s(e.totalPrice)+".00)")])])},s=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"flower"},[i("img",{attrs:{src:"/static/images/cart_border@2x.png"}})])}];i.d(t,"a",function(){return o}),i.d(t,"b",function(){return s})},"89f6":function(e,t,i){"use strict";i.r(t);var o=i("3e1f"),s=i("1b57");for(var a in s)"default"!==a&&function(e){i.d(t,e,function(){return s[e]})}(a);i("375e");var n=i("2877"),r=Object(n["a"])(s["default"],o["a"],o["b"],!1,null,"a9629e76",null);t["default"]=r.exports},ba58:function(e,t,i){"use strict";var o=i("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=o(i("5176")),a=o(i("a4bb"));i("ac6a");var n=o(i("cebc")),r={data:function(){return{addr:wx.getStorageSync("addr")||{},goodsList:[]}},onLoad:function(e){this.goodsId=e.goodsId,this.getGoodsList()},computed:{fullAddr:function(){return this.addr.provinceName+this.addr.cityName+this.addr.countyName+this.addr.detailInfo},totalPrice:function(){return this.goodsList.reduce(function(e,t){return e+t.num*t.goods_price},0)}},methods:{pay:function(){if(this.addr.userName){var e=wx.getStorageSync("token");e?this.createOrder(e):wx.navigateTo({url:"/pages/login/main"})}else this.$showToast("请选择地址哦")},createOrder:function(e){var t=this;this.$request({url:"/api/public/v1/my/orders/create",isAuth:!0,method:"POST",data:{order_price:this.totalPrice,consignee_addr:this.fullAddr,goods:this.filterGoodsList()}}).then(function(i){t.doPay(e,i.order_number)}).finally(function(){t.goodsId,t.$store.commit("removeCart")})},doPay:function(e,t){this.$request({url:"/api/public/v1/my/orders/req_unifiedorder",isAuth:!0,method:"POST",data:{order_number:t}}).then(function(e){wx.requestPayment((0,n.default)({},e.pay,{success:function(e){wx.navigateTo({url:"/pages/order_result/main"})},fail:function(){wx.navigateTo({url:"/pages/order_result/main?orderNumber="+t})},complete:function(){}}))})},filterGoodsList:function(){var e=[];return this.goodsList.forEach(function(t){e.push({goods_id:t.goods_id,goods_number:t.num,goods_price:t.goods_price})}),e},getGoodsList:function(){var e=this,t="",i={};if(this.goodsId)t=this.goodsId;else{i=this.$store.getters.getCart;var o=this.filterCart(i);t=(0,a.default)(o).join(",")}this.$request({url:"/api/public/v1/goods/goodslist?goods_ids="+t}).then(function(t){var o=t;e.goodsId?o[0].num=1:o.forEach(function(e){var t=i[e.goods_id];e.num=t.num}),e.goodsList=o})},filterCart:function(e){var t=(0,s.default)({},e);for(var i in t)t[i].checked||delete t[i];return t},getAddr:function(){var e=this;wx.getSetting({success:function(t){console.log(t),!1===t.authSetting["scope.address"]?wx.showModal({title:"提示",content:"请允许用户访问通讯地址",showCancel:!0,cancelText:"取消",cancelColor:"#000000",confirmText:"确定",confirmColor:"#3CC51F",success:function(e){e.confirm?wx.openSetting({success:function(e){}}):e.cancel&&console.log("用户点击取消")}}):wx.authorize({scope:"scope.address",success:function(t){wx.chooseAddress({success:function(t){console.log(t),e.addr=t,wx.setStorageSync("addr",e.addr)}})}})}})}}};t.default=r},cebc:function(e,t,i){"use strict";i.r(t);var o=i("268f"),s=i.n(o),a=i("e265"),n=i.n(a),r=i("a4bb"),d=i.n(r),c=i("85f2"),l=i.n(c);function u(e,t,i){return t in e?l()(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function f(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{},o=d()(i);"function"===typeof n.a&&(o=o.concat(n()(i).filter(function(e){return s()(i,e).enumerable}))),o.forEach(function(t){u(e,t,i[t])})}return e}i.d(t,"default",function(){return f})}}]);