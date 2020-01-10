import React, { Component } from 'react';

class For extends Component {
    constructor() {
        super()

        this.state = {
            persons: [
                {id:1001,name:'张无忌',skill:'撩妹'},
                {id:1002,name:'赵敏',skill:'撩仔'},
                {id:1003,name:'尼古拉斯.赵四',skill:'搞笑'},
                {id:1004,name:'成昆',skill:'挖墙脚'}
            ]
        }
    }

    render() {
        return (
            <div>
                for 实例
                <ul>
                    {
                       this.state.persons.map(item => {
                           return <li key={item.id}>{item.name} --- {item.skill}</li>
                       }) 
                    }
                </ul>
            </div>
        );
    }
}

export default For;