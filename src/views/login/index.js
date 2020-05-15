import React, { Component } from 'react'
import { login } from '@/api/loginApi'

export default class Login extends Component {
    componentDidMount() {
        login({
            type: '1'
        })
    }

    render() {
        return (
            <div>登录</div>
        )
    }
}