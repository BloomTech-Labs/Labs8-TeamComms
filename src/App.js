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
          <Route exact path="/landing" component={ScreensLanding} />
          <Route exact path="/login" component={ScreensLogin} />
          <Route exact path="/register" component={ScreensRegister} />
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
