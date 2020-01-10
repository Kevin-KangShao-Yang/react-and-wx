import React, { Component } from 'react'

import { Button } from 'antd-mobile'

export default class Index extends Component {
    render() {
        return (
            <div>
                首页
                <Button type="warning">你好、世界</Button>
            </div>
        )
    }
}
