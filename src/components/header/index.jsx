import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styles from './style.module.scss'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            leftShow: props.leftShow,
            children: props.children || '慧出行',
        }
    }
    static propTypes = {
        title: PropTypes.string,
        leftShow: PropTypes.bool
    }

    componentDidMount() {
        console.log(this.props.children)
    }

    render() {
        const { children, leftShow } = this.state
        return (
            <div className={styles.header}>
                {
                    leftShow ? <img src="/images/left.svg" alt=""/> : <p></p>
                }
                <h2>{ children }</h2>
                <img src="/images/more.svg" alt=""/>
            </div>
        );
    }
}

export default Header