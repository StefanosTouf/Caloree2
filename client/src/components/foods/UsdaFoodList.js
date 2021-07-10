import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  fetchUsdaFoods,
  selectFood,
  fetchDetailedUsdaFood,
  clearUsdaFoods,
} from '../../actions/index';
import FoodList from './FoodList';

import './foods.css';

const UsdaFoodList = ({
  fetchUsdaFoods,
  fetchedUsdaFoods,
  meal,
  selectFood,
  fetchDetailedUsdaFood,
  clearUsdaFoods,
}) => {
  return (
    <>
      <FoodList
        fetchFoods={fetchUsdaFoods}
        foods={fetchedUsdaFoods}
        selectFood={selectFood}
        fetchDetailedFood={fetchDetailedUsdaFood}
        meal={meal}
        clearFoods={clearUsdaFoods}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    fetchedUsdaFoods: state.fetchedUsdaFoods.foods,
  };
};

export default connect(mapStateToProps, {
  fetchUsdaFoods,
  selectFood,
  fetchDetailedUsdaFood,
  clearUsdaFoods,
})(UsdaFoodList);
