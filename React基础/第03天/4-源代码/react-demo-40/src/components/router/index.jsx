import React, { Component } from "react";

import {
//   BrowserRouter as Router,
  HashRouter as Router,
  Link,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

// 导入子组件
import NewsList from "./NewsList";
import FoodList from "./FoodList";
import NotFound from "./NotFound";

class Index extends Component {
  render() {
    return (
      <Router>
        <div>
          <p>
            <Link to="/newslist">新闻列表</Link>&nbsp;&nbsp;
            <Link to="/foodslist">食品列表</Link>
          </p>
          <div>
            <Switch>
              {/* <Route path="/newslist" component={NewsList} />
              <Route path="/foodslist" component={FoodList} /> */}

              {/* <Route exact path="/">
                <FoodList />
              </Route> */}

              <Route path="/newslist">
                <NewsList />
              </Route>

              <Route path="/foodslist">
                <FoodList />
              </Route>

              {/* 重定向 */}
              <Redirect exact from="/" to="/foodslist" />

              {/* 404 一定要放在最后 */}
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default Index;
