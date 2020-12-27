import React from 'react'
import { Context, UserContext } from '../home/context'

export default function KkbChildrenFn(props) {
  const theme = React.useContext(Context)
  const user = React.useContext(UserContext)

  return (
    <div
      style={{
        color: theme.color,
      }}
    >
      kkbChildrenFn {user.name}
    </div>
  )
}
