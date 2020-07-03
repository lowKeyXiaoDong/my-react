import React, {Component} from 'react'
import Nav from '@components/nav'
import styles from './style.module.scss'

class TaskIndex extends Component {
  render() {
    return (
      <div className={styles.task}>
        <Nav
          leftContent={'返回'}
        >
          任务说明
        </Nav>
      </div>
    );
  }
}

export default TaskIndex;