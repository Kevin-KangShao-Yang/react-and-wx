import React, { Component } from 'react';

import styles from './index.module.css'

import {HashRouter as Router,Link,Route,Switch,Redirect} from 'react-router-dom'

// 导入子组件，设置路由规则
import GoodsList from './GoodsList'
import ShopCart from './ShopCart'

class Index extends Component {
    render() {
        return (
            <Router>
                <div>
                    <h2 className={styles.title}>黑马买买买-商城
                        <p className={styles.links}>
                            <Link to="/goodslist">商品列表</Link>&nbsp;&nbsp;
                            <Link to="/shopcart">购物车</Link>
                        </p>
                    </h2>
                    <div>
                        <Switch>
                            <Route path="/goodslist" component={GoodsList}/>
                            <Route path="/shopcart" component={ShopCart}/>
                            <Redirect exact from="/" to="/goodslist"/>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default Index;