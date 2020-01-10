import React,{Suspense} from 'react';
import './App.css';

// 导入react-router-dom相关的内容
import {HashRouter as Router,Switch,Route,Redirect} from 'react-router-dom'

// 导入授权组件
import AuthRoute from './components/AuthRoute'
// const AuthRoute = React.lazy(() => import('./components/AuthRoute'))

// 导入子组件
// import Layout from './views/Layout'
// import Login from './views/Login'
// import CityList from './views/CityList'
// import Map from './views/Map'
// import Detail from './views/Detail'
// import Rent from './views/Rent'
// import RentAdd from './views/Rent/Add'
// import RentSearch from './views/Rent/Search'

const Layout = React.lazy(() => import('./views/Layout'))
const Login = React.lazy(() => import('./views/Login'))
const CityList = React.lazy(() => import('./views/CityList'))
const Map = React.lazy(() => import('./views/Map'))
const Detail = React.lazy(() => import('./views/Detail'))
const Rent = React.lazy(() => import('./views/Rent'))
const RentAdd = React.lazy(() => import('./views/Rent/Add'))
const RentSearch = React.lazy(() => import('./views/Rent/Search'))

function NotFound() {
  return <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573454629185&di=366c6b556953e5f89b05ab8d372e698f&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01565959e6bcfda80121bea5beef4c.jpg%401280w_1l_2o_100sh.jpg"/>
}

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div id="app">
          <Switch>
            <Route path="/layout" component={Layout} />
            <Route path="/login" component={Login} />
            <Route path="/citylist" component={CityList} />
            <Route path="/map" component={Map} />
            <Route path="/detail/:id" component={Detail} /> 

            {/* 访问下面的路径，是需要先判断是否有权限的 */}
            <AuthRoute exact path="/rent" component={Rent} />
            <AuthRoute path="/rent/add" component={RentAdd} />
            <AuthRoute path="/rent/search" component={RentSearch} />

            <Redirect exact from="/" to="/layout"/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;
