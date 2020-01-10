import React, { Component } from 'react';

import styles from './Login.module.css'

class Login extends Component {
    state = {
        username:'admin',
        password:'123'
    }

    changeValue = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = () => {
        // console.log(this.state)
        const {username,password} = this.state

        if (username === 'admin' && password==='123'){
            // console.log(this.props)
            this.props.history.push('/layout')
        }
    }

    render() {
        const {username,password} = this.state
        return (
            <div className={styles.loginContainer}>
                用户名:<input name="username" value={username} onChange={this.changeValue} /><br/>
                密码:<input name="password" value={password} onChange={this.changeValue} type="password"/><br/>
                <button onClick={this.login}>登录</button>
            </div>
        );
    }
}

export default Login;