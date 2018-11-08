
import React, { Component, Fragment } from 'react';
import { reduxTest } from '../../actions/index';
import { connect } from 'react-redux';



class ReduxTest extends Component {

    componentDidMount() {
        this.props.reduxTest();
    }
    render() {
        return(
            <Fragment>
                <h1>ReduxTest</h1>
            </Fragment>
        )
    }
}


const mapStateToProps = state => {
    return state;
};  
export default connect(mapStateToProps, { reduxTest })(ReduxTest);  
