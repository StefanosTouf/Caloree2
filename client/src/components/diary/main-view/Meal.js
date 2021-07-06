import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  fetchLoggedFoods,
  deleteLoggedFoods,
  selectLoggedFood,
  deleteLoggedFood,
} from '../../../actions/index';
import FoodsModal from './FoodsModal';

const Meal = ({
  meal,
  fetchLoggedFoods,
  loggedFoods,
  deleteLoggedFoods,
  selectLoggedFood,
  deleteLoggedFood,
}) => {
  useEffect(() => {
    if (Object.values(loggedFoods).length < 1) {
      fetchLoggedFoods(meal._id);
    }
  }, [meal]);

  const renderFoods = () => {
    return Object.values(loggedFoods).map(
      ({ description, amount, unitName, energy, _id }) => {
        return (
          <div
            className="item"
            key={_id}
            style={{ position: 'relative' }}
            onClick={() => selectLoggedFood(loggedFoods[_id])}
          >
            <div className="content">
              {`${description}, ${amount}${unitName}`}
              <button
                className="ui icon negative button delete"
                style={{ padding: '0.35rem', position: 'absolute', right: '0' }}
                onClick={() => deleteLoggedFood(_id, meal)}
              >
                {' '}
                <i className="trash icon" />
              </button>
            </div>
          </div>
        );
      }
    );
  };

  return (
    <>
      <div class="ui middle aligned selection list meal">{renderFoods()}</div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  let loggedFoodsObj = {};

  for (let food of Object.keys(state.loggedFoods)) {
    if (state.loggedFoods[food]._meal === ownProps.meal._id) {
      loggedFoodsObj = { ...loggedFoodsObj, [food]: state.loggedFoods[food] };
    }
  }

  return { loggedFoods: loggedFoodsObj };
};

export default connect(mapStateToProps, {
  fetchLoggedFoods,
  deleteLoggedFoods,
  selectLoggedFood,
  deleteLoggedFood,
})(Meal);
