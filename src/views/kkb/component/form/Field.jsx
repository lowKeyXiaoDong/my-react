import React, { Component } from 'react'
import FieldContext from './FieldContext'

export default class Field extends Component {
  static contextType = FieldContext

  componentDidMount() {
    this.unregisterFieldEntity = this.context.registerFieldEntity(this)
  }

  componentWillUnmount() {
    if (this.unregisterFieldEntity) {
      this.unregisterFieldEntity()
    }
  }

  onStoreChange = () => {
    this.forceUpdate()
  }

  getContrlled = () => {
    const { getFieldValue, setFieldsValue } = this.context
    const { name } = this.props
    return {
      value: getFieldValue(name),
      onChange: (e) => {
        const newValue = e.target.value
        setFieldsValue({
          [name]: newValue,
        })
      },
    }
  }

  render() {
    const { children } = this.props
    const returnChildNode = React.cloneElement(children, this.getContrlled())
    return returnChildNode
  }
}
