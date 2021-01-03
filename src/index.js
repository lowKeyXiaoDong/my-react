import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Routers from './routers'
// import { Provider } from 'react-redux'
import { Provider } from './views/kkb/redux/hReactRedux'
import store from './views/kkb/redux/store'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Routers />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
