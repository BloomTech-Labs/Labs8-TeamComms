import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
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
            return <div> This is the landing page </div>;
          }}
        />
      </div>
    );
  }
}

export default App;
