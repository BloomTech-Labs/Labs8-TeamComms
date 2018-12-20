import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import GlobalStyles from "./components/Common/GlobalStyles";
import ScreensLogin from "./screens/Login";
import ScreensRegister from "./screens/Register";
import ScreensLanding from "./screens/Landing";
import ScreensDashboard from "./screens/Dashboard";
import Header from "./components/Header";
import Content from "./components/Common/Content";
import AppWrapper from "./components/Common/AppWrapper";
import CreateMeeting from "./components/CreateMeeting";
import UpdateMeeting from "./components/UpdateMeeting";
import Meeting from "./components/Meeting";
import UserPreferences from "./components/UserPreferences";
import { toggleOverpane } from "./actions/index";
import { MainLogo } from "./components/Common/Logo";

class App extends Component {
  render() {
    return (
      <Fragment>
        <GlobalStyles />
        <AppWrapper history={this.props.history}>
          {this.props.loginSuccess ? (
            <Link to="/dashboard">
              <MainLogo src="../images/logo.png" width="190x" height="65px" />
            </Link>
          ) : (
            <Link to="/landing">
              <MainLogo src="../images/logo.png" width="190x" height="65px" />
            </Link>
          )}
          <Header history={this.props.history} />
          <Route
            exact
            path="/"
            render={props =>
              this.props.loginSuccess ? (
                <Redirect history={props.history} to="/dashboard" />
              ) : (
                <Redirect history={props.history} to="/landing" />
              )
            }
          />
          <Switch>
            <Content>
              <Route exact path="/landing" component={ScreensLanding} />
              <Route
                exact
                path="/register"
                render={props => {
                  return <ScreensRegister history={this.props.history} />;
                }}
              />
              <Route exact path="/meeting/:id" component={Meeting} />
              <Route path="/dashboard/:token?" component={ScreensDashboard} />
              <Route path="/preferences" component={UserPreferences} />
              <Route path="/updateMeeting/:id" component={UpdateMeeting} />
              <Route path="/createMeeting" component={CreateMeeting} />
            </Content>
          </Switch>
          <ScreensLogin />
        </AppWrapper>
      </Fragment>
    );
  }
}
// export default App;
const mapStateToProps = state => {
  return state;
};
export default connect(
  mapStateToProps,
  { toggleOverpane }
)(App);
