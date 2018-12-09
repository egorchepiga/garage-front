import React, {Component} from 'react';
import {connect} from 'react-redux';
import DataGrip from './containers/datagrip';

class App extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
          <div id="root">
              <DataGrip />
          </div>
        );
    };
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({})
)(App);
