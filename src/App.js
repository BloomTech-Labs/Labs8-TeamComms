import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import ScreensLanding from "./screens/Landing";
import ScreensLogin from "./screens/Login";
import ScreensRegister from "./screens/Register";
import ScreensMissionControl from "./screens/MissionControl";
import ConvoList from "./screens/ConvoList";
import { connect } from "react-redux";
import "./App.css";

class App extends Component {

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
          <Route exact path="/conversations" component={ConvoList} />
        </Switch>
      </div>
    );
  }
}
// export default App;
const mapStateToProps = state => {
  return state;
};
export default connect(
  mapStateToProps,  
)(App);
