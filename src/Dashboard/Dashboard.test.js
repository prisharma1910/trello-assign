import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import { createStore} from 'redux';
import { default as Dashboard } from './Dashboard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  let store = createStore((state, action) => state, {dashboardData: {}});
  ReactDOM.render(<Provider store={store}><Dashboard /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
