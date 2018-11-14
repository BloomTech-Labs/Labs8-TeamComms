import React from "react";
import { Provider } from "react-redux";
import { Router, Route } from "react-router-dom";
import App from "./App";
import history from "./history";

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  </Provider>
);
export default Root;
