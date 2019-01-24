import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import store from './store'

import {Provider} from 'react-redux'
// a special React Redux component called <Provider /> 
// 1) makes the Redux store available to any nested components 
// that have been wrapped in the connect() function.
// 2) alerts the wrapped component when there has been a change in state

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>), 
  document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
