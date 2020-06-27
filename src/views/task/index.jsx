import React, {Component} from 'react';
import Header from "@components/header";
import styles from './style.module.scss'

class TaskIndex extends Component {
  render() {
    return (
      <div className={styles.task}>
        <Header
          leftShow={true}
        >
          任务活动
        </Header>
      </div>
    );
  }
}

export default TaskIndex;