import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import ScreensLanding from "./screens/Landing";
import ScreensLogin from "./screens/Login";
import ScreensRegister from "./screens/Register";
import ScreensMissionControl from "./screens/MissionControl";
import ReduxTest from "./components/Test/ReduxTest";
import { connect } from "react-redux";
import { appMounted } from "./actions/index";
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.appMounted();
  }

  render() {
    return (
      <div className="App">
        Ready to go.
        <Switch>
          <Route
            exact
            path="/landing"
            render={props => {
              return <ScreensLanding />;
            }}
          />
          <Route
            exact
            path="/login"
            render={props => {
              return <ScreensLogin />;
            }}
          />
          <Route
            exact
            path="/register"
            render={props => {
              return <ScreensRegister />;
            }}
          />
          <Route
            exact
            path="/missioncontrol"
            component={ScreensMissionControl}
          />
          <Route exact path="/reduxtest" component={ReduxTest} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(
  mapStateToProps,
  {
    appMounted
  }
)(App);
