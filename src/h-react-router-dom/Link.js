import React, { useContext } from 'react'
import RouterContext from './RouterContext'

export default function Link({ to, children, ...restProps }) {
  const Context = useContext(RouterContext)

  const handleClick = (e) => {
    e.preventDefault()
    Context.history.push(to)
  }
  return (
    <a href={to} onClick={handleClick} {...restProps}>{children}</a>
  )
}