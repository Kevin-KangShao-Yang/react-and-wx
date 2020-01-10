import React, { Component } from 'react';

import { Link } from 'react-router-dom'

class NewsList extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        {/* <Link to="/newsdetail?id=1001">
                            罗永浩被限制高消费
                        </Link> */}

                        <Link to="/newsdetail/1001">
                            罗永浩被限制高消费
                        </Link>
                    </li>
                    <li>桂林机长被停飞</li>
                    <li>朝鲜痛斥美国挑衅</li>
                    <li>
                        {/* <Link to="/newsdetail?id=1004">
                            11岁女孩斗鳄鱼
                        </Link> */}

                        <Link to="/newsdetail/1004">
                            11岁女孩斗鳄鱼
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default NewsList;