import React from "react";
import { Provider } from "react-redux";
import { Router, Route } from "react-router-dom";
import App from "./App";
import history from "./history";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor } from "./index";

const Root = ({ store }) => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router history={history}>
        <Route path="/" component={App} />
      </Router>
    </PersistGate>
  </Provider>
);
export default Root;
