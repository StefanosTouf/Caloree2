import React, { useEffect } from 'react';
import { Router, Route, NavLink, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Diary from './diary';
import Foods from './foods';
import AddCustomFood from './foods/AddCustomFood';
import Settings from './settings';
import LandingPage from './LandingPage';
import Header from './Header';

import history from '../history';

import './general.css';
import { fetchUser } from '../actions';

const App = ({ fetchUser }) => {
  useEffect(fetchUser, []);

  return (
    <div id="app">
      <Router history={history}>
        <Header />
        <div className="ui container">
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/diary" exact component={Diary} />
            <Route path="/foods" exact component={Foods} />
            <Route path="/foods/add-food" exact component={AddCustomFood} />
            <Route path="/settings" exact component={Settings} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default connect(null, { fetchUser })(App);
