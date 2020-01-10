import React, { Component } from 'react'

import styles from './index.module.scss'

import { WhiteSpace, WingBlank, Flex, Toast } from 'antd-mobile'

import NavHeader from '../../components/NavHeader'

import { setToken } from '../../utils/token'

import { withFormik, Form, Field, ErrorMessage } from 'formik'

import { axios } from '../../utils/axios'

import * as Yup from 'yup'

class Index extends Component {
  render() {
    return (
      <div className={styles.root}>
        <NavHeader>账号登录</NavHeader>
        <WhiteSpace />
        <WingBlank size="lg">
          <Form>
            <div className={styles.formItem}>
              <Field
                className={styles.input}
                name="username"
                type="text"
                placeholder="请输入用户名"
              />
            </div>
            <ErrorMessage name="username" component="div" className={styles.error}/>
            <div className={styles.formItem}>
              <Field
                className={styles.input}
                name="password"
                type="password"
                placeholder="请输入密码"
              />
            </div>
            <ErrorMessage name="password" component="div" className={styles.error}/>
            <div className={styles.formSubmit}>
              <Field className={styles.submit} type="submit" value="登录" />
            </div>
          </Form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <a href="#">还没有账号，去注册</a>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}

const userNameReg = /^[a-zA-Z_\d]{5,8}$/
const passwordReg = /^[a-zA-Z_\d]{5,12}$/

export default withFormik({
  // 将 Props中的值，映射给 input 的 value
  mapPropsToValues: () => ({ username: 'test2', password: 'test2' }),

  // 对表单进行校验
  validationSchema: Yup.object().shape({
    username: Yup.string().required('用户名不能为空').matches(userNameReg,'长度为5到8位，只能出现数字、字母、下划线'),
    password: Yup.string().required('密码不能为空').matches(passwordReg,'长度为5到12位，只能出现数字、字母、下划线')
  }),

  // 处理提交
  handleSubmit: async (values, { props }) => {
    const result = await axios.post('/user/login', values)

    if (result.data.status === 200) {
      // 登录成功之后，需要保存token
      setToken(result.data.body.token)

      // 并且做相应的跳转
      if (props.location.state) {
        // push ['/my','/login','/rent']
        // props.history.push(this.props.location.state.from.pathname)

        // replace ['/my','/rent']
        props.history.replace(props.location.state.from.pathname)
      } else {
        props.history.goBack()
      }
    } else {
      Toast.info(result.data.description, 1.5)
    }
  }
})(Index)
