import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Dashboard, DashboardReducer, DashboardSaga } from './Dashboard';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  DashboardReducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(DashboardSaga)

render(
  <Provider store={store}>
    <Dashboard />
  </Provider>,
  document.getElementById('root')
)