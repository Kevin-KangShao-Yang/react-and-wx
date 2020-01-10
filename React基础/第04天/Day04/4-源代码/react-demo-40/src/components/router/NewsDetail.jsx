import React, { Component } from 'react';

class NewsDetail extends Component {
    constructor(props){
        super()

        // console.log(props)

        // const searchParams = new URLSearchParams(props.location.search)

        this.state = {
            // newsId: searchParams.get('id')
            newsId: props.match.params.id
        }
    }

    render() {
        return (
            <div>
                我是详情组件
            </div>
        );
    }
}

export default NewsDetail;