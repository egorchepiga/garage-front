import React, {Component} from 'react';
import {connect} from 'react-redux';
import DataGrip from './containers/datagrip';
import Auth from './containers/auth'
import Navigation from './containers/navigation'


class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div id="root">
              <div className="container">
                  <div className="row">
                      <div className="col-md-2">
                          <Auth />
                      </div>
                      <div className="col-md-10">
                          { this.props.store.auth.auth && <Navigation />}
                      </div>
                  </div>
              </div>
              <DataGrip data={this.props.store.navigation.dbData}/>
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
