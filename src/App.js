import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import Routes from './routes';
import store from './store/store';

import './assets/styles/app.scss';

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('App'));
