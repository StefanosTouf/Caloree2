import React from 'react';
import { connect } from 'react-redux';

import MainView from './main-view';

const Diary = ({ auth }) => {
  return (
    <>
      <h2 class="ui header">Hello again, {auth.name}</h2>
      <MainView />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Diary);
