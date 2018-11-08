
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import ScreensLanding from "./screens/Landing";
import ReduxTest from './components/Test/ReduxTest'
import { connect } from 'react-redux';
import  { appMounted }  from './actions/index';
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
        
          <Route exact path="/reduxtest" component={ReduxTest} />
        </Switch>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return state;
};  
export default connect(mapStateToProps, { appMounted })(App);  
