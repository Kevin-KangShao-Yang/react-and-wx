import React, { Component } from 'react';

import styles from './index.module.css'

import {HashRouter as Router,Link,Route,Switch,Redirect} from 'react-router-dom'

// 导入子组件，设置路由规则
import GoodsList from './GoodsList'
import ShopCart from './ShopCart'

import {connect} from 'react-redux'

import Header from './Header'

class Index extends Component {
    constructor() {
        super()
    }

    componentDidMount() {
        // 监听窗口的关闭和刷新事件
        window.onbeforeunload = () => {
            // window.localStorage.setItem('test','222')

            // 把购物车刷新、关闭之前的最新数据保存到本地
            window.localStorage.setItem('mycart',JSON.stringify(this.props.goodsList))
        }
    }

    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <h2 className={styles.title}>黑马买买买-商城
                        <p className={styles.links}>
                            <Link to="/goodslist">商品列表</Link>&nbsp;&nbsp;
                            <Link to="/shopcart">购物车 {this.props.count > 0 && `（${this.props.count}）`}</Link>&nbsp;&nbsp;
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

/**
 * 这个就是仓库中最新值，该函数在每次仓库的值发生变化之后调用
 * @param {*} state 这个就是仓库中最新值
 */
const mapStateToProps = state => {
    
    const calcTotalCount = () => {
        let totalCount = 0

        state.forEach(item => {
            totalCount += item.num
        })

        return totalCount
    }

    // 这个对象就是传递给组件的props
    return {
        count: calcTotalCount(),
        goodsList: state
    }
}

/**
 * connect 方法中接收两个参数
 * 
 * mapStateToProps 就是单纯的从仓库中拿数据，然后通过props传给组件
 * mapDispatchToProps 这个就是用来操作仓库的     
 */
export default connect(
    mapStateToProps
)(Index);