import React, { Component } from "react";

import {connect} from 'react-redux'

import {updateGoods,asyncDeleteGoods} from './store/actionCreators'

import { Table, InputNumber, Button, Modal } from "antd";

const { Column } = Table;
const { confirm } = Modal

class ShopCart extends Component {
  // 删除
  deleteGoods = id => {
    confirm({
      title: '提示',
      content: '确认删除该商品吗?',
      okText:'确定',
      cancelText:'取消',
      onOk:() => {
        // 触发异步的修改action
        this.props.deleteGoods(id)
      }
    });
  }

  render() {
    return (
      <div>
        <Table dataSource={this.props.goodsList} pagination={false}>
          <Column title="名字" dataIndex="name" key="name" />
          <Column
            title="图片"
            dataIndex="url"
            key="url"
            render={url => {
              return <img style={{ width: 100, height: 100 }} src={url} />;
            }}
          />
          <Column
            title="数量"
            key="num"
            render={({id,num}) => {
              return <InputNumber min={1} defaultValue={num} onChange={data => {this.props.changeNum(id,data)}} />;
            }}
          />
          <Column title="名字" dataIndex="price" key="price" />
          <Column
            title="总价"
            key={Math.random()}
            render={({ num, price }) => {
              return <span>{num * price}</span>;
            }}
          />
          <Column
            title="操作"
            dataIndex="id"
            key="id"
            render={id => {
              return <Button onClick={() => this.deleteGoods(id)} type="danger">删除</Button>;
            }}
          />
        </Table>
      </div>
    );
  }
}

/**
 * 初始化及仓库中的值变化了都会执行
 * @param {*} state 仓库中的最新值
 */
const mapStateToProps = state => {
  const generateKey = () => {
    const oldState = JSON.parse(JSON.stringify(state))

    oldState.forEach(item => {
      item.key = item.id
    })

    return oldState
  }
  // props
  return {
    goodsList: generateKey()
  }
}

const mapDispatchToProps = dispatch => {
  // props
  return {
    // 修改仓库的方法
    changeNum:function(id,num){
      // 触发action
      dispatch(updateGoods({id,num}))
    },
    // 删除仓库的方法
    deleteGoods: function(id){
      // 触发action
      dispatch(asyncDeleteGoods(id))
    }
  }
}

/**
 * mapStateToProps 获取值
 * mapDispatchToProps 修改值
 */
export default connect(mapStateToProps,mapDispatchToProps)(ShopCart);
