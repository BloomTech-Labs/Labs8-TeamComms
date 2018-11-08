import React, { Component } from "react";
import { Route } from "react-router-dom";
import ScreensLanding from "./screens/Landing";
import ScreensSignin from "./screens/Landing";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/landing"
          render={props => {
            return <ScreensLanding />;
          }}
        />
        <Route
          exact
          path="/signin"
          render={props => {
            return <ScreensSignin />;
          }}
        />
      </div>
    );
  }
}

export default App;
