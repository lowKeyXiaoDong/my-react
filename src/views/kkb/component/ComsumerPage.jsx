import React, { Component } from 'react'
import { Context, UserContext } from '../home/context'

class ComsumerPage extends Component {
  render() {
    return (
      <div>
        <Context.Consumer>
          {(theme) => {
            return (
              <div
                style={{
                  color: theme.color,
                }}
              >
                <UserContext.Consumer>
                  {(user) => {
                    return <p>{user.name}</p>
                  }}
                </UserContext.Consumer>
              </div>
            )
          }}
        </Context.Consumer>
      </div>
    )
  }
}

export default ComsumerPage
