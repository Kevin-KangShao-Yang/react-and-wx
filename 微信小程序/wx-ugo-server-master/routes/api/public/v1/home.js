var express = require("express");
var router = express.Router();
var path = require("path");
var goodsServ = require(path.join(process.cwd(), "/services/GoodService"));
router.get("/swiperdata", function (req, res, next) {
    var data = [
        {
            image_src: "https://www.zhengzhicheng.cn/pyg/banner1.png",
            open_type: "navigate",
			goods_id:129,
            navigator_url: "/pages/goods_detail/main?goods_id=129"
        },
        {
            image_src: "https://www.zhengzhicheng.cn/pyg/banner2.png",
            open_type: "navigate",
			goods_id:395,
            navigator_url: "/pages/goods_detail/main?goods_id=395"
        },
        {
            image_src: "https://www.zhengzhicheng.cn/pyg/banner3.png",
            open_type: "navigate",
			goods_id:38,
            navigator_url: "/pages/goods_detail/main?goods_id=38"
        }
    ];
    return res.sendResult(data, 200, "获取成功");
});

router.get("/catitems", function (req, res, next) {
    var data = [
        {
            name: "分类",
            image_src: "https://www.zhengzhicheng.cn/pyg/icon_index_nav_4@2x.png",
            open_type: "switchTab",
            navigator_url: "/pages/category/main"
        },
        {
            name: "秒杀拍",
            image_src: "https://www.zhengzhicheng.cn/pyg/icon_index_nav_3@2x.png"
        },
        {
            name: "超市购",
            image_src: "https://www.zhengzhicheng.cn/pyg/icon_index_nav_2@2x.png"
        },
        {
            name: "母婴品",
            image_src: "https://www.zhengzhicheng.cn/pyg/icon_index_nav_1@2x.png"
        }
    ];
    return res.sendResult(data, 200, "获取成功");
});

router.get("/floordata", function (req, res, next) {
    var data = [
        {
            "floor_title": {
                "name": "时尚女装",
                "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor01_title.png"
            },
            "product_list": [
                {
                    "name": "优质服饰",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor01_1@2x.png",
                    "image_width": "232",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=服饰"
                },
                {
                    "name": "春季热门",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor01_2@2x.png",
                    "image_width": "233",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=热"
                },
                {
                    "name": "爆款清仓",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor01_3@2x.png",
                    "image_width": "233",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=爆款"
                },
                {
                    "name": "倒春寒",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor01_4@2x.png",
                    "image_width": "233",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=春季"
                },
                {
                    "name": "怦然心动",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor01_5@2x.png",
                    "image_width": "233",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=心动"
                }
            ]
        },
        {
            "floor_title": {
                "name": "户外活动",
                "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor02_title.png"
            },
            "product_list": [
                {
                    "name": "勇往直前",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor02_1@2x.png",
                    "image_width": "232",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=户外"
                },
                {
                    "name": "户外登山包",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor02_2@2x.png",
                    "image_width": "273",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=登山包"
                },
                {
                    "name": "超强手套",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor02_3@2x.png",
                    "image_width": "193",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=手套"
                },
                {
                    "name": "户外运动鞋",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor02_4@2x.png",
                    "image_width": "193",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=运动鞋"
                },
                {
                    "name": "冲锋衣系列",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor02_5@2x.png",
                    "image_width": "273",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=冲锋衣"
                }
            ]
        },
        {
            "floor_title": {
                "name": "箱包配饰",
                "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor03_title.png"
            },
            "product_list": [
                {
                    "name": "清新气质",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor03_1@2x.png",
                    "image_width": "232",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=饰品"
                },
                {
                    "name": "复古胸针",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor03_2@2x.png",
                    "image_width": "263",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=胸针"
                },
                {
                    "name": "韩版手链",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor03_3@2x.png",
                    "image_width": "203",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=手链"
                },
                {
                    "name": "水晶项链",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor03_4@2x.png",
                    "image_width": "193",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=水晶项链"
                },
                {
                    "name": "情侣表",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor03_5@2x.png",
                    "image_width": "273",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=情侣表"
                }
            ]
        }
    ];
    return res.sendResult(data, 200, "获取成功");
});

// router.get("/swiperdata",
//     function(req,res,next) {
//         var data = [
//             {
//                 "image_url":"https://image3.suning.cn/uimg/cms/img/151738383270780554.jpg?from=mobile"
//             },{
//                 "image_url":"https://image4.suning.cn/uimg/cms/img/151937554134486711.jpg?from=mobile"
//             },{
//                 "image_url":"https://image2.suning.cn/uimg/aps/material/151939080657956233.jpg|/uimg/aps/material/151936970303149620.jpg"
//             },
//         ]
//         return res.sendResult(data,200,"获取成功");
//     }
// );

// router.get("/catitems",
//     function (req, res, next) {
//         var data = [
//             {
//                 "name": "生活家电",
//                 "img": "http://image4.suning.cn/uimg/cms/img/152066239989275283.png?from=mobile",
//                 "href": "/good_list/good_list.html?query=家电",
//                 """open_type""": "navigate",
//                 "link":"/pages/goods_list?query=家电"
//             },
//             {
//                 "name": "时尚服饰",
//                 "img": "https://image5.suning.cn/uimg/cms/img/151848454201144206.png?from=mobile",
//                 "href": "/good_list/good_list.html?query=服装",
//                 """open_type""": "navigate",
//                 "link":"/pages/goods_list?query=服装"
//             },
//             {
//                 "name": "爆款手机",
//                 "img": "https://image5.suning.cn/uimg/cms/img/151848471513191634.png?from=mobile",
//                 "href": "/good_list/good_list.html?query=手机",
//                 """open_type""": "navigate",
//                 "link":"/pages/goods_list?query=手机"
//             },
//             {
//                 "name": "会员",
//                 "img": "https://image4.suning.cn/uimg/cms/img/151848501127168581.png?from=mobile",
//                 "href": "/me/me.html",
//                 """open_type""": "switchTab",
//                 "link":"/pages/me"
//             }
//         ]
//         return res.sendResult(data, 200, "获取成功");
//     }
// );

router.get("/goodslist", function (req, res, next) {
    goodsServ.randGoodsList(16, function (err, result) {
        if (err) return res.sendResult(null, 400, err);

        var data = [
            {
                group_img:
                    "http://image4.suning.cn/uimg/cms/img/149559219946350066.png",
                goods: []
            },
            {
                group_img:
                    "http://image1.suning.cn/uimg/cms/img/149559224478616126.png",
                goods: []
            },
            {
                group_img:
                    "http://image4.suning.cn/uimg/cms/img/149561081033317441.png",
                goods: []
            },
            {
                group_img:
                    "http://image4.suning.cn/uimg/cms/img/149559633905095702.png",
                goods: []
            }
        ];

        for (var i = 0; i < result.length; i++) {
            var good = result[i];
            data[i % 4]["goods"].push(good);
        }

        return res.sendResult(data, 200, "获取成功");
    });
});

module.exports = router;
