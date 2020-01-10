import React, { Component } from 'react';

import Common from './Common'

export class Cat extends Component {
    // render() {
    //     return <Common render={(x,y) => {
    //         return <img style={{width:100,height:80,position:'absolute',left: x - 50,top: y - 40}} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573295161148&di=02b7cb96ff830feac627cbbfff537e46&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F20%2F20180620202907_pdfil.thumb.700_0.jpg" />
    //     }}/>
    // }

    // render() {
    //     return <Common children={(x,y) => {
    //         return <img style={{width:100,height:80,position:'absolute',left: x - 50,top: y - 40}} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573295161148&di=02b7cb96ff830feac627cbbfff537e46&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F20%2F20180620202907_pdfil.thumb.700_0.jpg" />
    //     }}/>
    // }

    render() {
        return <Common>
            {(x,y) => {
                return <img style={{width:100,height:80,position:'absolute',left: x - 50,top: y - 40}} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573295161148&di=02b7cb96ff830feac627cbbfff537e46&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F20%2F20180620202907_pdfil.thumb.700_0.jpg" />
            }}
        </Common>
    }
}

export default Cat;
