import React, { Component } from 'react';

import styles from './index.module.css'

import {HashRouter as Router,Link,Route,Switch,Redirect} from 'react-router-dom'

// 导入子组件，设置路由规则
import GoodsList from './GoodsList'
import ShopCart from './ShopCart'

import store from './store/'

class Index extends Component {
    constructor() {
        super()

        this.state = {
            count: 0
        }
    }

    // 计算仓库中的总数量
    calcTotalCount = () => {
        let totalCount = 0
        store.getState().forEach(item => {
            totalCount += item.num
        })

        this.setState({
            count: totalCount
        })
    }

    componentDidMount() {
        this.calcTotalCount()

        // 监听仓库的变化
        store.subscribe(() => {
            this.calcTotalCount()
        })

        // 监听窗口的关闭和刷新事件
        window.onbeforeunload = () => {
            // window.localStorage.setItem('test','222')

            // 把购物车刷新、关闭之前的最新数据保存到本地
            window.localStorage.setItem('mycart',JSON.stringify(store.getState()))
        }
    }

    render() {
        return (
            <Router>
                <div>
                    <h2 className={styles.title}>黑马买买买-商城
                        <p className={styles.links}>
                            <Link to="/goodslist">商品列表</Link>&nbsp;&nbsp;
                            <Link to="/shopcart">购物车 {this.state.count > 0 && `（${this.state.count}）`}</Link>
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