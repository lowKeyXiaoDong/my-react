'use strict';

import React, { Component } from 'react';

import './style.responsive.css';

class Block_0 extends Component {
  render() {
    return (
      <div className="mod">
        <div className="box">
          <div className="primary">
            <div className="wrap">
              <img className="fail" src={'https://img.alicdn.com/tfs/TB1F1jLvYj1gK0jSZFOXXc7GpXa-800-800.png'} />
              <input
                onInput={(e) => {
                  console.log(e.target.value);
                }}
              />
            </div>
            <div className="icon-failWrap">
              <img className="fail_1" src={'https://img.alicdn.com/tfs/TB1F1jLvYj1gK0jSZFOXXc7GpXa-800-800.png'} />
              <img className="fail_2" src={'https://img.alicdn.com/tfs/TB1F1jLvYj1gK0jSZFOXXc7GpXa-800-800.png'} />
            </div>
          </div>
          <span className="word">确定</span>
        </div>
      </div>
    );
  }
}
export default Block_0;
