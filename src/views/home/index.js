import React, { Component } from 'react'

export default class Home extends Component {
    onWeixin() {
        // document.location.href = 'weixin://dl/scan'
        window.location.href = 'http://weixin.qq.com/mp/qrcode?_biz=MjM5NTA3NzUwMQ=='
    }
    render() {
        return (
            <div>
                <button onClick={() => this.onWeixin()}>点击打开微信</button>
            </div>
        )
    }
}