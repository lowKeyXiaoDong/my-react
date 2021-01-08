import React, { useContext } from 'react'
import { RouterContext } from './RouterContext'

const Link = ({ to, children, ...restProps }) => {
  const Context = useContext(RouterContext)

  const handleClick = (e) => {
    e.preventDefault()
    Context.history.push(to)
  }

  return (
    <a href={to} {...restProps} onClick={handleClick}>
      {children}
    </a>
  )
}

export default Link
