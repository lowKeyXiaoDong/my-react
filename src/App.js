import React from 'react';
import logo from './logo.svg';
import './App.css';
import styles from './dome.module.css'
console.log(styles, 'styles');

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className={styles.dome}>你好</p>
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
