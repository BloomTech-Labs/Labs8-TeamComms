
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import ScreensLanding from "./screens/Landing";
<<<<<<< HEAD
import ScreensSignin from "./screens/Landing";
=======
import ReduxTest from './components/Test/ReduxTest'
import { connect } from 'react-redux';
import  { appMounted }  from './actions/index';
>>>>>>> master
import "./App.css";


class App extends Component {

  componentDidMount() {
    this.props.appMounted();
  }

  render() {
    return (
<<<<<<< HEAD
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
=======
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
        
          <Route exact path="/reduxtest" component={ReduxTest} />
        </Switch>
>>>>>>> master
      </div>
    );
  }
}


const mapStateToProps = state => {
  return state;
};  
export default connect(mapStateToProps, { appMounted })(App);  
