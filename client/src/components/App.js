import React, { useEffect } from 'react';
import { Router, Route, NavLink, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Diary from './diary';
import Foods from './foods';
import AddCustomFood from './foods/AddCustomFood';
import Settings from './settings';
import LandingPage from './LandingPage';
import Header from './Header';

import PrivateRoute from './PrivateRoute';

import history from '../history';

import './general.css';
import { fetchUser } from '../actions';

const App = ({ fetchUser, auth }) => {
  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (auth.googleId) {
      history.push('/diary');
    }
  }, [auth]);

  return (
    <div id="app">
      <Router history={history}>
        <Header />
        <div className="ui container">
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <PrivateRoute path="/diary" exact component={Diary} />
            <PrivateRoute path="/foods" exact component={Foods} />
            <PrivateRoute
              path="/foods/add-food"
              exact
              component={AddCustomFood}
            />
            <PrivateRoute path="/settings" exact component={Settings} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { fetchUser })(App);
