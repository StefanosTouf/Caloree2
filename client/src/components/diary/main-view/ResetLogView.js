import React, { useEffect } from 'react';
import _ from 'lodash';

import { connect } from 'react-redux';

import { resetSelectLoggedFood } from '../../../actions/index';

const GeneralInfo = ({ resetSelectLoggedFood, log }) => {
  return (
    <div className="button-wrapper reset-log-view">
      <button
        className="ui primary button"
        onClick={() => {
          resetSelectLoggedFood(log);
        }}
      >
        Reset View
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    log: state.log,
  };
};

export default connect(mapStateToProps, { resetSelectLoggedFood })(GeneralInfo);
