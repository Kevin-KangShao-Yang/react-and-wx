import React, { Component } from "react";

import { Table, InputNumber, Button,Modal } from "antd";

import store from "./store";

import {updateGoods,asyncDeleteGoods} from './store/actionCreator'

const { Column } = Table
const { confirm } = Modal

export default class ShopCart extends Component {
  unsubscribe = null

  constructor() {
    super();

    const initialGoodsList = store.getState();
    initialGoodsList.forEach(item => {
      item.key = item.id;
    });

    this.state = {
      goodsList: initialGoodsList
    };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      const newGoodsList = store.getState();

      newGoodsList.forEach(item => {
        item.key = item.id;
      });

      this.setState({
        goodsList: newGoodsList
      })
    })
  }

  componentWillUnmount() {
    // this.setState = (state,callback) => {
    //   return
    // }

    // 解除监听
    this.unsubscribe()
  }

  getChangeNum = (id,num) => {
    //   console.log(id,value)
    store.dispatch(updateGoods({id,num}))
  }

  // 删除
  handleDelete = id => {
    confirm({
      title: '提示',
      content: '确认删除吗?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        store.dispatch(asyncDeleteGoods(id))
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  render() {
    const { goodsList } = this.state;
    return (
      <div>
        <Table dataSource={goodsList} pagination={false}>
            <Column title="名字" dataIndex="name" key="name" />
            <Column title="图片" dataIndex="url" key="url" render={url => (
                <img width="100" height="80" src={url}/>
            )}/>
            <Column title="数量" render={record => (
                 <InputNumber onChange={value => {
                     // 分两步写，第一步，调用 Input 本身的OnChange,获取到最新的数量
                     // 再调用我自定义的方法，拿到最新的数据和 id
                    //  console.log(value)
                    
                     this.getChangeNum(record.id,value)
                 }} defaultValue={record.num}/>
                // <InputNumber onChange={(value) => this.getChangeNum(record.id,value)} defaultValue={record.num}/>
            )}/>
            <Column title="单价" dataIndex="price" key="price" />
            <Column title="总价" render={record => <span>{record.price * record.num}</span>}/>
            <Column title="操作" render={record => <Button onClick={() => this.handleDelete(record.id)} type="danger">删除</Button>}/>
        </Table>
      </div>
    );
  }
}
