import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchCustomFoods, fetchCustomFoodsNextPage, selectCustomFood, fetchDetailedCustomFood} from '../../actions/index';
import FoodList from './FoodList';

import './foods.css'

const UsdaFoodList = ({ fetchCustomFoods, fetchedFoods, fetchCustomFoodsNextPage, mealId, selectCustomFood, fetchDetailedCustomFood }) => {
    console.log("in custom foods list")
    return (
        <>
            <FoodList
                fetchFoods={fetchCustomFoods}
                foods={fetchedFoods}
                fetchFoodsNextPage={fetchCustomFoodsNextPage}
                selectFood={selectCustomFood}
                fetchDetailedFood={fetchDetailedCustomFood}
                mealId={mealId}
            />
        </>
    )

}


const mapStateToProps = (state) => {
    return {
        fetchedFoods: state.fetchedFoods
    }
}

export default connect(
    mapStateToProps,
    { fetchCustomFoods, fetchCustomFoodsNextPage, selectCustomFood, fetchDetailedCustomFood }
)(UsdaFoodList);








