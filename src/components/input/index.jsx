import React, { useState, useRef } from 'react'

const Input = (props) => {
  const [ value, setValue ] = useState('')
  let inputValue = ''
  
  const onChange = (event) => {
    setValue(event.target.value)
    inputValue = event.target.value
    props.onChange && props.onChange(inputValue)
  }

  return (
    <input type="text" value={value} onChange={onChange}/>
  )
}

export default Input