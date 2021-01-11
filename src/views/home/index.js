import React, { Component } from 'react'
import { Button } from 'antd-mobile'
import Search from "@components/search";

export default class Home extends Component {
  onWeixin() {
    document.location.href = 'weixin://'
    // window.location.href = 'https://wdfp.5ifapiao.com/my-invoice/html/public/footer.html#invoice_list_reimbursement_bx'
  }

  onAlipay() {
    // document.location.href = 'alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=https://render.alipay.com/p/h5/shebei/index.html?ct=ZJXL&__webview_options__=transparentTitle%3Dalways'

    document.location.href = 'alipays://'
  }

  render() {
    return (
      <div>
        <Search />
        <Button type='primary' onClick={() => this.onWeixin()}>
          点击打开微信
        </Button>
        <br />
        <Button type='primary' onClick={() => this.onAlipay()}>
          点击打开支付宝
        </Button>
      </div>
    )
  }
}
