import React, { Component } from 'react'
import { Button } from 'antd-mobile'

export default class Home extends Component {
    onWeixin() {
        document.location.href = 'weixin://'
        // window.location.href = 'https://wdfp.5ifapiao.com/my-invoice/html/public/footer.html#invoice_list_reimbursement_bx'
    }
    render() {
        return (
            <div>
                <button onClick={() => this.onWeixin()}>点击打开微信</button>
                <Button type="primary" onClick={() => this.onWeixin()}>点击打开微信</Button>
            </div>
        )
    }
}