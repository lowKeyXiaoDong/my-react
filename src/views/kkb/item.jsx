import React, { Component } from 'react'
import { withRouter } from '../../h-react-router-dom'
class Item extends Component {
  render() {
    console.log(this.props);
    return <div>Item</div>
  }
}

export default withRouter(Item)
