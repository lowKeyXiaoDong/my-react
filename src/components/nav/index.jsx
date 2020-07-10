import React from 'react'
import styles from './style.module.scss'

const Nav = (props) => {

    return (
        <div className={styles.warp}>
            <div className={styles.left} onClick={() => props.onLeftClick && props.onLeftClick()}>
                { props.leftContent }
            </div>
            <div className={styles.content}>
                { props.children }
            </div>
            <div className={styles.right} onClick={() => props.onRightClick && props.onRightClick()}>
                { props.rightContent }
            </div>
        </div>
    )
}

export default Nav