import React, { Component } from 'react';

function Welcome(){
    return <div>
        欢迎 隋孟林
    </div>
}

class Login extends Component{
    render() {
        return <div>
            <form action="">
                用户名：<input /><br/>
                密码<input /><br/>
                <button>登录</button>
            </form>
        </div>
    }
}

class If extends Component {
    constructor() {
        super()

        this.state = {
            isLogin: false
        }
    }


    render() {
        /**
        if (this.state.isLogin) {
            return <Welcome />
        } else {
            return <Login />
        }
         */

        return <div>
            {/* {this.state.isLogin ? <Welcome /> : <Login/>} */}

            {this.state.isLogin && <Welcome />}

            {!this.state.isLogin && <Login />}
        </div>
    }
}

export default If;