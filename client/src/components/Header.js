import React from 'react';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';

const Header = ({ auth }) => {
  const loggedInHeader = (
    <div
      className="ui secondary pointing menu"
      style={{ height: '4rem', fontSize: '1.35rem' }}
    >
      <NavLink to="/diary" className="item" exact>
        Caloree
      </NavLink>
      <div className="right menu">
        <NavLink to="/diary" className="item" exact activeClassName="active">
          Diary
        </NavLink>
        <NavLink to="/foods" className="item" activeClassName="active">
          Foods
        </NavLink>
        <NavLink to="/settings" className="item" activeClassName="active">
          Settings
        </NavLink>
        <a href="/api/logout" className="item" activeClassName="active">
          Log Out
        </a>
      </div>
    </div>
  );

  const loggedOutHeader = (
    <div
      className="ui secondary pointing menu"
      style={{ height: '4rem', fontSize: '1.35rem' }}
    >
      <NavLink to="/" className="item" exact>
        Caloree
      </NavLink>
      <div className="right menu">
        <a href="/auth/google" className="item" activeClassName="active">
          Log In
        </a>
      </div>
    </div>
  );

  const renderHeader = () => {
    return _.isEmpty(auth) ? loggedOutHeader : loggedInHeader;
  };

  return renderHeader();
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Header);
