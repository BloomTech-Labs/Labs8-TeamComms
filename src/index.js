
import React from 'react';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/index';
import { render } from 'react-dom';
import Root from './Root';
import "./index.css";


const logger = createLogger({
  collapsed: true
});


export const store = createStore(rootReducer,
  composeWithDevTools(
  applyMiddleware(logger)
));


render(

  <Root store={store} />,

  document.getElementById('root')
);