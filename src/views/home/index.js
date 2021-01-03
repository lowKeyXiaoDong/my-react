import React, { Component } from 'react'
import { Button } from 'antd-mobile'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { bindActionCreators, connect } from '../kkb/redux/hReactRedux'

@connect(
    ({ count }) => ({ count }),
    (dispatch) => {
        let creators = {
            add: () => ({ type: 'ADD' })
        }
        creators = bindActionCreators(creators, dispatch)
        return {
            dispatch,
            ...creators
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
        const { count, add, dispatch } = this.props
        return (
            <div>
                <p>{count}</p>
                <button onClick={add}>add</button>
                <button onClick={() => dispatch({ type: 'ADD' })}>dispatchAdd</button>
                {/* <button onClick={() => this.onWeixin()}>点击打开微信</button>
                <Button type="primary" onClick={() => this.onWeixin()}>点击打开微信</Button> */}
            </div>
        )
    }
}

export default Home