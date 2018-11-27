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
  meetings: [
    {
      id: 1425235,
      attendees: ["Austin", "Jameson", "Tristan"],
      title: "Meeting 1",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    },
    {
      id: 234234,
      attendees: ["Austin", "Jameson", "Tristan"],
      title: "Meeting 2",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    },
    {
      id: 334345345,
      attendees: ["Austin", "Jameson"],
      title: "Meeting 3",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    },
    {
      id: 4,
      attendees: ["Jerry", "Eric", "Jeff"],
      title: "Meeting 4",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    },
    {
      id: 5,
      attendees: ["Erica", "Lily", "Brad"],
      title: "Meeting 5",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    },
    {
      id: 6,
      attendees: ["Allen", "Vim", "Gary"],
      title: "Meeting 6",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    },
    {
      id: 7,
      attendees: ["Allen", "Vim", "Gary"],
      title: "Meeting 7",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    },
    {
      id: 8,
      attendees: ["Allen", "Vim", "Gary"],
      title: "Meeting 8",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    },
    {
      id: 9,
      attendees: ["Allen", "Vim", "Gary"],
      title: "Meeting 9",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    },
    {
      id: 10,
      attendees: ["Allen", "Vim", "Gary"],
      title: "Meeting 10",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum lacinia sapien nec laoreet. Nullam fermentum tristique mauris, dictum mattis est bibendum quis."
    }
  ],
  questions: [
    {
      qid: 1,
      user: "JJ Ashcraft",
      name: "Question 1",
      question: "What planet do we live on?",
      created_at: Date.now(),
      answered: false,
      answered_at: ""
    },
    {
      qid: 2,
      user: "JJ Ashcraft",
      name: "Question 2",
      question: "Are we gonna finish on time?",
      created_at: Date.now(),
      answered: false,
      answered_at: ""
    },
    {
      qid: 3,
      user: "JJ Ashcraft",
      name: "Question 3",
      question: "Who made this?",
      created_at: Date.now(),
      answered: false,
      answered_at: ""
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
