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
import styled from "styled-components";
import Header from "./components/Header";
import { Logo } from "./components/Common";

const AppWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: #374353;
  background-position: fixed;
  color: #374353;

  display: grid;
  grid-template-columns: 15rem auto;
  grid-template-rows: auto auto auto;
`;

const FadedLogo = styled(Logo)``;

const Content = styled.div`
  grid-column: 2;
  grid-row: 3;
`;

class App extends Component {
  componentDidMount() {
    this.props.appMounted();
  }

  render() {
    return (
      <AppWrapper>
        <FadedLogo src="../images/logo.png" width="200px" height="90px" />
        <Header />

        <Switch>
          <Route exact path="/landing" component={ScreensLanding} />
          <Content>
            <Route exact path="/login" component={ScreensLogin} />
            <Route exact path="/register" component={ScreensRegister} />
            <Route
              exact
              path="/missioncontrol"
              component={ScreensMissionControl}
            />
            <Route exact path="/reduxtest" component={ReduxTest} />
          </Content>
        </Switch>
      </AppWrapper>
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
