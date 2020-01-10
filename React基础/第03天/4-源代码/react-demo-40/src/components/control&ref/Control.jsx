import React, { Component } from "react";

class Control extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: ""
    };
  }

  login = () => {
    console.log("---login---");

    console.log(this.state)
  };

  /**
  changeUsername = e => {
    //   console.log(e.target.value)
    this.setState({
        username:e.target.value
    })
  }

  changePassword = e => {
      this.setState({
          password: e.target.value
      })
  } */

  /** 
  changeValue = (key,e) => {
    // console.log(key,e.target.value)
    this.setState({
      [key]: e.target.value
    })
  }
  */

  changeValue = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        用户名：
        {/* <input onChange={this.changeUsername} value={this.state.username}/> */}
        {/* <input onChange={e => this.changeValue('username',e)} value={this.state.username}/> */}
        <input onChange={this.changeValue} name="username" value={this.state.username}/>
        <br />
        密码：
        {/* <input onChange={this.changePassword} type="password" value={this.state.password}/> */}
        {/* <input onChange={e => this.changeValue('password',e)} type="password" value={this.state.password}/> */}
        <input onChange={this.changeValue} name="password" type="password" value={this.state.password}/>
        <br />
        <button onClick={this.login}>登录</button>
      </div>
    );
  }
}

export default Control;
