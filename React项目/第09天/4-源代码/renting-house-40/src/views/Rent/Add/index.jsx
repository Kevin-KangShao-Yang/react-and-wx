import React, { Component } from 'react'

import styles from './index.module.scss'

import {
  List,
  InputItem,
  Picker,
  ImagePicker,
  TextareaItem,
  Flex
} from 'antd-mobile'

// 导入子组件
import NavHeader from '../../../components/NavHeader'
import Supporting from '../../../components/Supporting'

// 导入connect
import { connect } from 'react-redux'

const Item = List.Item

// 房屋类型
const roomTypeData = [
  { label: '一室', value: 'ROOM|d4a692e4-a177-37fd' },
  { label: '二室', value: 'ROOM|d1a00384-5801-d5cd' },
  { label: '三室', value: 'ROOM|20903ae0-c7bc-f2e2' },
  { label: '四室', value: 'ROOM|ce2a5daa-811d-2f49' },
  { label: '四室+', value: 'ROOM|2731c38c-5b19-ff7f' }
]

// 楼层
const floorData = [
  { label: '高楼层', value: 'FLOOR|1' },
  { label: '中楼层', value: 'FLOOR|2' },
  { label: '低楼层', value: 'FLOOR|3' }
]

// 朝向：
const orientedData = [
  { label: '东', value: 'ORIEN|141b98bf-1ad0-11e3' },
  { label: '西', value: 'ORIEN|103fb3aa-e8b4-de0e' },
  { label: '南', value: 'ORIEN|61e99445-e95e-7f37' },
  { label: '北', value: 'ORIEN|caa6f80b-b764-c2df' },
  { label: '东南', value: 'ORIEN|dfb1b36b-e0d1-0977' },
  { label: '东北', value: 'ORIEN|67ac2205-7e0f-c057' },
  { label: '西南', value: 'ORIEN|2354e89e-3918-9cef' },
  { label: '西北', value: 'ORIEN|80795f1a-e32f-feb9' }
]

class RentAdd extends Component {
  constructor(props) {
    super()

    this.state = {
      community: props.community, // 小区的id
      communityName: props.communityName || '请输入小区名称', // 小区的名称
      files: [], // 图片的数组
      title: '', // 房屋标题
      description: '', // 房屋描述
      houseImg: null, // 提交之前，需要上传给后台的图片
      oriented: null, // 朝向
      supporting: null, // 房屋配套
      price: '', // 价格
      roomType: null, // 房屋类型
      size: '', // 建筑面积
      floor: null // 楼层
    }
  }

  /**
   * 当图片发生变化的时候，有可能是添加，也有可能是删除
   */
  onChange = (files, operationType, index) => {
    this.setState({
      files: files
    })
  }

  publicHouse = () => {
    console.log(this.state)
  }

  // 更改值
  changeValue = (name, val) => {
    this.setState({
      [name]: val
    })
  }

  render() {
    const {
      files,
      title,
      description,
      oriented,
      price,
      roomType,
      size,
      floor
    } = this.state
    return (
      <div className={styles.root}>
        <NavHeader>发布房源</NavHeader>
        {/* 房源信息 */}
        <List renderHeader={() => '房源信息'}>
          <Item
            extra={this.state.communityName}
            arrow="horizontal"
            onClick={() => {
              this.props.history.push('/rent/search')
            }}
          >
            小区名称
          </Item>
          <InputItem
            value={price}
            onChange={val => this.changeValue('price', val)}
            extra="￥/月"
            placeholder="请输入租金/月"
          >
            租&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金
          </InputItem>
          <InputItem
            value={size}
            onChange={val => this.changeValue('size', val)}
            extra="㎡"
            placeholder="请输入建筑面积"
          >
            建筑面积
          </InputItem>
          <Picker
            value={[roomType]}
            onChange={val => this.changeValue('roomType', val[0])}
            data={roomTypeData}
            cols={1}
          >
            <List.Item arrow="horizontal">
              户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型
            </List.Item>
          </Picker>
          <Picker
            value={[floor]}
            onChange={val => this.changeValue('floor', val[0])}
            data={floorData}
            cols={1}
          >
            <List.Item arrow="horizontal">所在楼层</List.Item>
          </Picker>
          <Picker
            value={[oriented]}
            onChange={val => this.changeValue('oriented', val[0])}
            data={orientedData}
            cols={1}
          >
            <List.Item arrow="horizontal">
              朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向
            </List.Item>
          </Picker>
        </List>
        {/* 房屋标题 */}
        <List renderHeader={() => '房屋标题'}>
          <InputItem
            value={title}
            onChange={val => this.changeValue('title', val)}
            placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
          />
        </List>
        <List renderHeader={() => '房屋头像'}>
          <ImagePicker
            files={files}
            onChange={this.onChange}
            selectable={files.length < 9}
            multiple
          />
        </List>
        <List renderHeader={() => '房屋配套'}>
          <Supporting
            edit={true}
            onChange={supportins =>
              this.setState({
                supporting: supportins.join('|')
              })
            }
          />
        </List>
        <List renderHeader={() => '房屋描述'}>
          <TextareaItem
            value={description}
            onChange={val => this.changeValue('description', val)}
            placeholder="请输入房屋描述"
            rows={6}
          />
        </List>
        <Flex className={styles.bottom}>
          <Flex.Item className={styles.cancel}>取消</Flex.Item>
          <Flex.Item onClick={this.publicHouse} className={styles.confirm}>
            确定
          </Flex.Item>
        </Flex>
      </div>
    )
  }
}

// const mapStateToProps = state  => {
//   return {
//     community: state.community
//   }
// }

export default connect(state => state.community, null)(RentAdd)
