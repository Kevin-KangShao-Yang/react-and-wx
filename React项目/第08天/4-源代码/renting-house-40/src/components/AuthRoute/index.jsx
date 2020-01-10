import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { isAuth } from '../../utils/token'

function AuthRoute({ component: Component, ...rest }) {
  /**
   * <Route {...rest} /> 相当于 <Route path="/rent" abc="abc" def="def"/>
   */
  return (
    <Route
      {...rest}
      render={props => { // 在这里统一处理逻辑
        if (isAuth()) {
          // 登录
          return <Component {...props} />
        } else {
          // 未登录，则重定向到登录页面
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
        }
      }}
    />
  )
}

export default AuthRoute
