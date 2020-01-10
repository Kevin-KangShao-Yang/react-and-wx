import React, { Component } from "react";

import { Table, InputNumber, Button } from "antd";

import store from "./store";

export default class ShopCart extends Component {
  constructor() {
    super();

    const initialGoodsList = store.getState();
    initialGoodsList.forEach(item => {
      item.key = item.id;
    });

    this.state = {
      goodsList: initialGoodsList,
      columns: [
        {
          title: "名字",
          dataIndex: "name",
          key: "name",
          render: text => <a>{text}</a>
        },
        {
          title: "图片",
          dataIndex: "url",
          key: "url",
          render: url => <img style={{ width: 100, height: 80 }} src={url} />
        },
        {
          title: "数量",
          dataIndex: "num",
          key: "num",
          render: num => <InputNumber min={1} max={100000} defaultValue={num} />
        },
        {
          title: "单价",
          dataIndex: "price",
          key: "price"
        },
        {
          title: "总价",
          render: record => <span>{record.num * record.price}</span>
        },
        {
          title: "操作",
          render: () => <Button type="danger">删除</Button>
        }
      ]
    };
  }
  render() {
    const { columns, goodsList } = this.state;
    return (
      <div>
        <Table columns={columns} dataSource={goodsList} pagination={false} />
      </div>
    );
  }
}
