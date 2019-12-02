import React, { Component } from 'react'
import MyHeader from './MyHeader'

export default class Signup extends Component {
    render() {
        return (
            <MyHeader {...this.props}/>
        )
    }
}
