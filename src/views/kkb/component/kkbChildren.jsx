import React, { Component } from 'react'
import { Context } from '../home/context'

class KkbChildren extends Component {
  static contextType = Context

  render() {
    console.log(this.context)
    return (
      <div
        style={{
          color: this.context.color,
        }}
      >
        children
      </div>
    )
  }
}

export default KkbChildren
