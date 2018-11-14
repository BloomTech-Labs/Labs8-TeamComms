import React from 'react';
import {
  createLogger
} from 'redux-logger';
import {
  createStore,
  applyMiddleware
} from 'redux';
import {
  composeWithDevTools
} from 'redux-devtools-extension';
import {
  render
} from 'react-dom';
import Root from './Root';
import thunk from 'redux-thunk';
import {
  reducer
} from './reducers/index';

import "./index.css";


const logger = createLogger({
  collapsed: true
});

const initialState = {
  userData: {},
  registrationCalled: false,
  registrationSuccess: false,
  loginCalled: false,
  loginReturned: false,
  loginSuccess: false,
  conversations: [{
      title: "Conversation 1",
      description: "Description lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    },
    {
      title: "Conversation 2",
      description: "Description lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    },
    {
      title: "Conversation 3",
      description: "Description lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    },
    {
      title: "Conversation 4",
      description: "Description lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    },
    {
      title: "Conversation 5",
      description: "Description lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    }, {
      title: "Conversation 5",
      description: "Description lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    }, {
      title: "Conversation 5",
      description: "Description lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    }, {
      title: "Conversation 5",
      description: "Description lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    }, {
      title: "Conversation 5",
      description: "Description lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    }, {
      title: "Conversation 5",
      description: "Description lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    }
  ]
}


const store = createStore(reducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk, logger)
  ));


render(

  <
  Root store = {
    store
  }
  />,

  document.getElementById('root')
);