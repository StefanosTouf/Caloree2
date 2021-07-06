import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

const PrivateRoute = ({ auth, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.googleId ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
