import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  fetchUsdaFoods,
  fetchUsdaFoodsNextPage,
  selectFood,
  fetchDetailedUsdaFood,
} from '../../actions/index';
import FoodList from './FoodList';

import './foods.css';

const UsdaFoodList = ({
  fetchUsdaFoods,
  fetchedFoods,
  fetchUsdaFoodsNextPage,
  mealId,
  selectFood,
  fetchDetailedUsdaFood,
}) => {
  return (
    <>
      <FoodList
        fetchFoods={fetchUsdaFoods}
        foods={fetchedFoods}
        fetchFoodsNextPage={fetchUsdaFoodsNextPage}
        selectFood={selectFood}
        fetchDetailedFood={fetchDetailedUsdaFood}
        mealId={mealId}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    fetchedFoods: state.fetchedFoods,
  };
};

export default connect(mapStateToProps, {
  fetchUsdaFoods,
  fetchUsdaFoodsNextPage,
  selectFood,
  fetchDetailedUsdaFood,
})(UsdaFoodList);
