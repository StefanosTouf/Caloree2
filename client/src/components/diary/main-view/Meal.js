import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  fetchLoggedFoods,
  deleteLoggedFoods,
  selectLoggedFood,
  deleteLoggedFood,
  copyLoggedFood,
} from '../../../actions/index';
import FoodsModal from './FoodsModal';

const Meal = ({
  meal,
  fetchLoggedFoods,
  loggedFoods,
  deleteLoggedFoods,
  selectLoggedFood,
  deleteLoggedFood,
  copyLoggedFood,
}) => {
  useEffect(() => {
    if (Object.values(loggedFoods).length < 1) {
      fetchLoggedFoods(meal._id);
    }
  }, [meal]);

  const renderFoods = () => {
    return Object.values(loggedFoods).map((loggedFood) => {
      const { description, amount, unitName, energy, _id } = loggedFood;
      return (
        <div
          className="item"
          key={_id}
          style={{ position: 'relative', padding: '0.15rem' }}
          onClick={() => selectLoggedFood(loggedFood)}
        >
          <div
            className="content"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{ fontSize: '1.15rem' }}
            >{`${description}, ${amount}${unitName}`}</div>

            <div className="ui icon  buttons delete">
              <button
                className="ui circular icon button "
                onClick={(e) => {
                  copyLoggedFood(_id);
                  e.stopPropagation();
                }}
              >
                <i className="copy icon" />
              </button>
              <button
                className="ui negative circular icon button "
                onClick={(e) => {
                  deleteLoggedFood(_id, meal);
                  e.stopPropagation();
                }}
              >
                <i className="trash icon" />
              </button>
            </div>
          </div>
        </div>
      );
    });
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
  copyLoggedFood,
})(Meal);
