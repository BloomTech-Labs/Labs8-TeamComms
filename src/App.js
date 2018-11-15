import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ScreensLanding from "./screens/Landing";
import ScreensLogin from "./screens/Login";
import ScreensRegister from "./screens/Register";
import ScreensMissionControl from "./screens/MissionControl";
import ScreensConvoList from "./screens/ConvoList";
import { connect } from "react-redux";
import "./App.css";
import styled from "styled-components";
import Header from "./components/Header";
import { Logo } from "./components/Common";
import CreateConvo from "./components/CreateConvo";

const AppWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  background: #374353;
  background-position: fixed;
  color: #374353;
  display: grid;
  grid-template-columns: 15rem auto;
  grid-template-rows: 4rem 25rem 5rem;
`;

const FadedLogo = styled(Logo)``;

const Content = styled.div`
  grid-column: 1/3;
  grid-row: 2;
`;

const Footer = styled.div`
  grid-column: 2;
  grid-row: 4;
  background: black;
`;

class App extends Component {
  render() {
    return (
      <AppWrapper history={this.props.history}>
        <FadedLogo src="../images/logo.png" width="190x" height="60px" />
        <Header history={this.props.history} />
        <Route
          exact
          path="/"
          render={props =>
            this.props.logInSuccess ? (
              <Redirect history={props.history} to="/dashboard" />
            ) : (
              <Redirect history={props.history} to="/landing" />
            )
          }
        />
        <Switch>
          <Route exact path="/landing" component={ScreensLanding} />
          <Content>
            <Route
              exact
              path="/login"
              render={props => {
                return <ScreensLogin history={this.props.history} />;
              }}
            />
            <Route
              exact
              path="/register"
              render={props => {
                return <ScreensRegister history={this.props.history} />;
              }}
            />
            <Route
              exact
              path="/missioncontrol"
              component={ScreensMissionControl}
            />

            <Route path="/dashboard/:token?" component={ScreensConvoList} />
          </Content>
        </Switch>
      </AppWrapper>
    );
  }
}
// export default App;
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(App);
