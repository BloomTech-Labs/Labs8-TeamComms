import React from "react";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { render } from "react-dom";
import Root from "./Root";
import thunk from "redux-thunk";
import { reducer } from "./reducers/index";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import "./index.css";

const logger = createLogger({
  collapsed: true
});

const initialState = {
  userData: {},
  overpane: false,
  registrationCalled: false,
  registrationSuccess: false,
  loginCalled: false,
  loginReturned: false,
  loginSuccess: false,
  conversations: [
    {
      title: "Conversation 1",
      description:
        "Description lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    },
    {
      title: "Conversation 2",
      description:
        "Description lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    },
    {
      title: "Conversation 3",
      description:
        "Description lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    },
    {
      title: "Conversation 4",
      description:
        "Description lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    },
    {
      title: "Conversation 5",
      description:
        "Description lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    },
    {
      title: "Conversation 5",
      description:
        "Description lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    },
    {
      title: "Conversation 5",
      description:
        "Description lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    },
    {
      title: "Conversation 5",
      description:
        "Description lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    },
    {
      title: "Conversation 5",
      description:
        "Description lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    },
    {
      title: "Conversation 5",
      description:
        "Description lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    }
  ]
};

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

export const persistor = persistStore(store);

render(
  <Root store={store} />,

  document.getElementById("root")
);
