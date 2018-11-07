import React, { Component } from "react";
import { Route } from "react-router-dom";
import ScreensLanding from "./screens/Landing";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        Ready to go.
        <Route
          exact
          path="/landing"
          render={props => {
            return <ScreensLanding />;
          }}
        />
      </div>
    );
  }
}

export default App;
