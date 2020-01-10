import React, { Component } from 'react'

import styles from './index.module.scss'

import { WhiteSpace,WingBlank,Flex,Toast } from 'antd-mobile'

import NavHeader from '../../components/NavHeader'

import { setToken } from '../../utils/token'

export default class Index extends Component {
    state = {
        username:'',
        password:''
    }

    changeValue = e => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    login = async () => {
        const result = await this.http.post('/user/login',this.state)

        if (result.data.status === 200) {
            // 登录成功之后，需要保存token
            setToken(result.data.body.token)

            // 并且做相应的跳转
            if (this.props.location.state) {
                // push ['/my','/login','/rent']
                // this.props.history.push(this.props.location.state.from.pathname)

                // replace ['/my','/rent']
                this.props.history.replace(this.props.location.state.from.pathname)
            } else {
                this.props.history.goBack()
            }
        } else {
            Toast.info(result.data.description,1.5)
        }
    }

    render() {
        return (
            <div className={styles.root}>
                <NavHeader>账号登录</NavHeader>
                <WhiteSpace />
                <WingBlank size="lg">
                    <div className={styles.formItem}>
                        <input className={styles.input} value={this.state.username} name="username" onChange={this.changeValue} type="text" placeholder="请输入用户名"/>
                    </div>
                    <div className={styles.formItem}>
                        <input className={styles.input} value={this.state.password} name="password" onChange={this.changeValue} type="password" placeholder="请输入密码"/>
                    </div>
                    <div className={styles.formSubmit}>
                        <input className={styles.submit} onClick={this.login} type="submit" value="登录"/>
                    </div>
                    <Flex className={styles.backHome}>
                        <Flex.Item>
                            <a href="#">还没有账号，去注册</a>
                        </Flex.Item>
                    </Flex>
                </WingBlank>
            </div>
        )
    }
}
