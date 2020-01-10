import React, { Component } from "react";

import store from "./store/";

import { add,asyncMinus } from "./store/actionCreators";

class Counter extends Component {
  add = () => {
    store.dispatch(add(2));
  };

  minus = () => {
    // store.dispatch(minus(3));

    store.dispatch(asyncMinus(3))
  };

  render() {
    return (
      <div>
        <button onClick={this.minus}>-</button>&nbsp;&nbsp;
        <button onClick={this.add}>+</button>
      </div>
    );
  }
}

export default Counter;
