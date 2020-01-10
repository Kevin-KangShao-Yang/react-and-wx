import React, { Component } from 'react'
import './Index.css'
import styles from './Index.module.css'

import GoodsList from './GoodsList'
import ShopCart from './ShopCart'

import {HashRouter as Router,Link,Route,Switch,Redirect} from 'react-router-dom'

// 导入仓库
import store from './store'

export default class Index extends Component {
    constructor() {
        super()

        this.state = {
            count: 0
        }
    }

    componentDidMount(){
        this.setState({
            count: this.calcTotalNum()
        })

        // 监听仓库值的变化
        store.subscribe(() => {
            this.setState({
                count: this.calcTotalNum()
            })
        })

        window.addEventListener('beforeunload',() => {
            window.localStorage.setItem('cache_goodslist',JSON.stringify(store.getState()))
        })
    }

    componentWillUnmount() {
        // window.localStorage.setItem('abc','123')

        window.removeEventListener('beforeunload',() => {})
    }

    calcTotalNum(){
        let totalNum = 0
        store.getState().forEach(item => {
            totalNum += item.num
        })

        return totalNum
    }

    render() {
        return (
            <Router>
                <div>
                    <h2 className={styles.title}>黑马买买买-商城
                        <p className={styles.links}>
                            <Link to="/goodslist">商品列表</Link>&nbsp;&nbsp;
                            <Link to="/cart">购物车{this.state.count > 0 && <span>（{this.state.count}）</span>}</Link>
                        </p>
                    </h2>
                    <div>
                        <Switch>
                            <Route path="/goodslist" component={GoodsList}/>
                            <Route path="/cart" component={ShopCart}/>
                            <Redirect exact from="/" to="/goodslist"/>
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}
