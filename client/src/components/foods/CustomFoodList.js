import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  fetchCustomFoods,
  fetchCustomFoodsNextPage,
  selectCustomFood,
  fetchDetailedCustomFood,
} from '../../actions/index';
import FoodList from './FoodList';

import './foods.css';

const UsdaFoodList = ({
  fetchCustomFoods,
  fetchedFoods,
  fetchCustomFoodsNextPage,
  meal,
  selectCustomFood,
  fetchDetailedCustomFood,
}) => {
  return (
    <>
      <FoodList
        fetchFoods={fetchCustomFoods}
        foods={fetchedFoods}
        fetchFoodsNextPage={fetchCustomFoodsNextPage}
        selectFood={selectCustomFood}
        fetchDetailedFood={fetchDetailedCustomFood}
        meal={meal}
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
  fetchCustomFoods,
  fetchCustomFoodsNextPage,
  selectCustomFood,
  fetchDetailedCustomFood,
})(UsdaFoodList);
