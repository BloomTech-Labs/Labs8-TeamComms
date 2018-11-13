
import React from 'react';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { render } from 'react-dom';
import Root from './Root';
import thunk from 'redux-thunk';
import {reducer} from './reducers/index'

import "./index.css";


const logger = createLogger({
  collapsed: true
});

const initialState = {
  userData: {},
  registrationCalled: false,
  registrationSuccess: false,
  signinCalled: false,
  signinReturned: false,
  conversions: {}
}


const store = createStore(reducer,
  initialState,
  composeWithDevTools(
  applyMiddleware(thunk, logger)
));


render(

  <Root store={store} />,

  document.getElementById('root')
);