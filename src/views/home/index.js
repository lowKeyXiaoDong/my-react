import React, { Component } from 'react'
import { Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

@connect(
    ({ count }) => ({ count }),
    (dispatch) => {
        let comst = {
            add: () => ({ type: 'ADD' })
        }
        comst = bindActionCreators(comst, dispatch)
        return {
            dispatch,
            ...comst
        }
    }
)
class Home extends Component {
    onWeixin() {
        document.location.href = 'weixin://'
        // window.location.href = 'https://wdfp.5ifapiao.com/my-invoice/html/public/footer.html#invoice_list_reimbursement_bx'
    }
    render() {
        console.log(this.props);
        const { state, add } = this.props
        return (
            <div>
                <p>{state}</p>
                <button onClick={add}>add</button>
                <button onClick={() => this.onWeixin()}>点击打开微信</button>
                <Button type="primary" onClick={() => this.onWeixin()}>点击打开微信</Button>
            </div>
        )
    }
}

export default Home