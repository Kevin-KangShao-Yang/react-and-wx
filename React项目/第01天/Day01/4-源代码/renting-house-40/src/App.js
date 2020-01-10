import React from 'react';
import './App.css';

// 导入react-router-dom相关的内容
import {HashRouter as Router,Switch,Route,Redirect} from 'react-router-dom'

// 导入子组件
import Layout from './views/Layout'
import Login from './views/Login'

function NotFound() {
  return <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573454629185&di=366c6b556953e5f89b05ab8d372e698f&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01565959e6bcfda80121bea5beef4c.jpg%401280w_1l_2o_100sh.jpg"/>
}

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/layout" component={Layout} />
          <Route path="/login" component={Login} />
          <Redirect exact from="/" to="/layout"/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
