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

const logger = createLogger({
  collapsed: true
});

const initialState = {
  userData: {},
  meetingsLoading: false,
  userDataLoading: false,
  meetingError: false,
  overpane: false,
  registrationCalled: false,
  registrationSuccess: false,
  regError: false,
  loginCalled: false,
  loginLoading: false,
  loginReturned: false,
  loginSuccess: false,
  loginError: false,
  mobileMenu: false,
  meetings: [],
  questions: []
};

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: [
    "overpane",
    "mobileMenu",
    "regError",
    "meetingError",
    "loginError",
    "meetingsLoading",
    "userDataLoading",
    "loginLoading"
  ]
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

  document.getElementById("root") || document.createElement("div")
);
