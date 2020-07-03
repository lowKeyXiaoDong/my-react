import React, { useState } from 'react'
import styles from './style.module.scss'

const Nav = (props) => {
    console.log(props)
    return (
        <div className={styles.warp}>
            <div className={styles.left}>
                { props.leftContent }
            </div>
            <div className={styles.content}>
                { props.children }
            </div>
            <div className={styles.right}></div>
        </div>
    )
}

export default Nav