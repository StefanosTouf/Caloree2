import React from 'react';
import { connect } from 'react-redux';

import {
  fetchCustomFoods,
  selectCustomFood,
  fetchDetailedCustomFood,
  clearCustomFoods,
} from '../../actions/index';
import FoodList from './FoodList';

import './foods.css';

const UsdaFoodList = ({
  fetchCustomFoods,
  fetchedCustomFoods,
  meal,
  selectCustomFood,
  fetchDetailedCustomFood,
  clearCustomFoods,
}) => {
  return (
    <>
      <FoodList
        fetchFoods={fetchCustomFoods}
        foods={fetchedCustomFoods}
        selectFood={selectCustomFood}
        fetchDetailedFood={fetchDetailedCustomFood}
        meal={meal}
        clearFoods={clearCustomFoods}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    fetchedCustomFoods: state.fetchedCustomFoods,
  };
};

export default connect(mapStateToProps, {
  fetchCustomFoods,
  selectCustomFood,
  fetchDetailedCustomFood,
  clearCustomFoods,
})(UsdaFoodList);
