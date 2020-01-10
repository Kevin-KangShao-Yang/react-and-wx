import React, { Component } from "react";

import store from "./store";

import { Table,InputNumber,Button  } from "antd";

class ShopCart extends Component {
  constructor() {
    super();

    this.state = {
      // 初始化的时候给goodsList赋值
      goodsList: store.getState()
    };
  }

  // 定义每一列长什么样子
  columns = [
    {
      title: "名字",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "图片",
      dataIndex: "url",
      key: "url",
      render: url => {
          return <img src={url} style={{width:100,height:100}}/>
      }
    },
    {
      title: "数量",
      dataIndex: "num",
      key: "num",
      render: num => {
          return <InputNumber min={1}  defaultValue={num} />
      }
    },
    {
      title: "单价",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "总价",
      key: "total",
      // 如果我们整个列中，没有写dataIndex，则参数就是整一行数据
      render: ({num,price}) => {
        return <span>{num * price}</span>
      }
    },
    {
      title: "操作",
      dataIndex: "id",
      key: "action",
      render: id => {
          return <Button type="danger">删除</Button>
      }
    }
  ];

  componentDidMount() {
    // 监听仓库中的变化，并且重新给goodsList赋值
    store.subscribe(() => {
      this.setState({
        goodsList: store.getState()
      });
    });
  }

  render() {
    return (
      <div>
        <Table columns={this.columns} dataSource={this.state.goodsList} pagination={false}/>
      </div>
    );
  }
}

export default ShopCart;
