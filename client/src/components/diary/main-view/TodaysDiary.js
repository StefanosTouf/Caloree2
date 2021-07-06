import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { fetchMeals, addMeal, addLogAndAppendMeal } from '../../../actions';

import Meal from './Meal';
import MealHeader from './MealHeader';

const TodaysDiary = ({
  meals,
  fetchMeals,
  date,
  addMeal,
  log,
  addLogAndAppendMeal,
}) => {
  useEffect(() => {
    if (log) {
      fetchMeals(log._id);
    }
  }, [log._id]);

  const accordionItem = (meal) => {
    return (
      <div className="ui segment" key={meal._id}>
        <MealHeader mealId={meal._id} />
        <Meal meal={meal} />
      </div>
    );
  };

  const accordionItems = (meals) => {
    return Object.values(meals).map((meal) => {
      return accordionItem(meal);
    });
  };

  const handleAddMeal = () => {
    if (!log._id) {
      addLogAndAppendMeal(date, 'New Meal');
      return;
    }

    addMeal(log._id, 'New Meal');
  };

  return (
    <div id="diary-wrapper">
      <h3 class="ui top attached header" id="diary-header">
        <div className="ui two column grid">
          <div className="ui twelve wide column">
            <h2>{`${date}`.substring(0, 10)}</h2>
          </div>
          <div className="ui four wide column">
            <button className="ui button positive" onClick={handleAddMeal}>
              Add Meal
            </button>
          </div>
        </div>
      </h3>
      <div className="ui attached segment" id="todays-diary">
        <div className="ui segments">{accordionItems(meals)}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    meals: state.meals,
    date: state.date,
    log: state.log,
  };
};

export default connect(mapStateToProps, {
  fetchMeals,
  addMeal,
  addLogAndAppendMeal,
})(TodaysDiary);
