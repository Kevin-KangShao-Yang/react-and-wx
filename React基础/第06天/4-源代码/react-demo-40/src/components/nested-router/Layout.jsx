import React, { Component } from 'react';

import styles from './Layout.module.css'

import { Link,Route,Redirect,Switch } from 'react-router-dom'

function Menu1() {
    return <div style={{color:'red',fontSize:30}}>
        我是菜单1哦
    </div>
}

function Menu2() {
    return <div style={{color:'green',fontSize:50}}>
        menu2
    </div>
}

class Layout extends Component {
    render() {
        return (
            <div className={styles.layout}>
                <div className={styles.left}>
                    <p>
                        <Link to="/layout/menu1">菜单1</Link>
                    </p>
                    <p>
                        <Link to="/layout/menu2">菜单2</Link>
                    </p>
                </div>
                <div className={styles.right}>
                    {/* 配置嵌套路由规则 */}
                    <Switch>
                        <Route path="/layout/menu1" component={Menu1}/>
                        <Route path="/layout/menu2" component={Menu2}/>

                        <Redirect exact from="/layout" to="/layout/menu1"/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Layout;