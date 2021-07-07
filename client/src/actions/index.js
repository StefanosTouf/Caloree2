import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_LOG,
  SET_DATE,
  FETCH_USER,
  ADD_MEAL,
  FETCH_MEALS,
  FETCH_MEAL,
  FETCH_LOGGED_FOODS,
  CLEAR_LOGGED_FOODS,
  FETCH_USDA_FOODS,
  CLEAR_USDA_FOODS,
  CLEAR_CUSTOM_FOODS,
  FETCH_USDA_FOODS_NEXT_PAGE,
  DELETE_MEAL,
  EDIT_MEAL_NAME,
  FETCH_DETAILED_USDA_FOOD,
  CLEAR_DETAILED_FOOD,
  SET_WEIGHT_VALUE,
  ADD_LOGGED_FOOD,
  DELETE_LOGGED_FOODS,
  ADD_LOG,
  FETCH_CUSTOM_FOODS,
  FETCH_DETAILED_CUSTOM_FOOD,
  SELECT_CUSTOM_FOOD,
  SELECT_FOOD,
  SELECT_LOGGED_FOOD,
  DELETE_LOGGED_FOOD,
  ADD_CUSTOM_FOOD,
  UPDATE_USER_NUTRIENT_TARGETS,
  SET_SEARCH_QUERY,
  RESET_SELECT_LOGGED_FOOD,
  COPY_LOGGED_FOOD,
  PASTE_LOGGED_FOOD,
} from './types';

import logs from '../apis/logs';
import meals from '../apis/meals';
import foods from '../apis/foods';
import usda from '../apis/usda';
import customFoods from '../apis/customFoods';
import users from '../apis/users';
import axios from 'axios';

import _ from 'lodash';

import { calculateAmountOfNutrient } from '../other/nutrientCalculations';
import history from '../history';
import flattenObjectArray from '../other/flattenObjectArray';

export const fetchLog = (date) => async (dispatch) => {
  const response = await logs.get('', {
    params: {
      date: date,
    },
  });

  if (response.data.targetsAchieved) {
    const flattenedTargets = flattenObjectArray(
      response.data.targetsAchieved,
      '_trackedNutrient'
    );

    dispatch({
      type: FETCH_LOG,
      payload: { ...response.data, targetsAchieved: flattenedTargets },
    });
  } else {
    dispatch({
      type: FETCH_LOG,
      payload: {},
    });
  }
};

export const addLog = (date) => async (dispatch) => {
  const log = {
    date,
  };

  const response = await logs.post('', log);

  const flattenedTargets = flattenObjectArray(
    response.data.targetsAchieved,
    '_trackedNutrient'
  );

  console.log(flattenedTargets);

  dispatch({
    type: ADD_LOG,
    payload: { ...response.data, targetsAchieved: flattenedTargets },
  });
};

export const addLogAndAppendMeal = (date, name) => async (dispatch) => {
  const log = await logs.post('', { date });
  const logId = log.data._id;

  const meal = await meals.post('', { logId, name });

  const flattenedTargets = flattenObjectArray(
    log.data.targetsAchieved,
    '_trackedNutrient'
  );

  dispatch({
    type: ADD_LOG,
    payload: { ...log.data, targetsAchieved: flattenedTargets },
  });

  dispatch({
    type: ADD_MEAL,
    payload: meal.data,
  });
};

export const updateLog = (logId) => async (dispatch, getState) => {
  const response = await logs.get(`/updatedLog/${logId}`);

  const flattenedTargets = flattenObjectArray(
    response.data.targetsAchieved,
    '_trackedNutrient'
  );

  dispatch({
    type: FETCH_LOG,
    payload: { ...response.data, targetsAchieved: flattenedTargets },
  });
};

export const fetchMeals = (logId) => async (dispatch) => {
  const response = await meals.get(``, {
    params: {
      logId,
    },
  });

  dispatch({
    type: FETCH_MEALS,
    payload: response.data,
  });
};

export const fetchMeal = (mealId) => async (dispatch) => {
  const response = await meals.get(`/${mealId}`);

  dispatch({
    type: FETCH_MEAL,
    payload: response.data,
  });
};

export const addMeal = (logId, name) => async (dispatch) => {
  const meal = { logId, name };
  const response = await meals.post('', meal);

  dispatch({
    type: ADD_MEAL,
    payload: response.data,
  });
};

export const deleteMeal = (meal) => async (dispatch) => {
  const { _id, _log } = meal;
  await meals.delete(`/${_id}`);

  dispatch(updateLog(_log));

  dispatch({
    type: DELETE_MEAL,
    payload: _id,
  });
};

export const editMealName = (mealId, name) => async (dispatch) => {
  const response = await meals.patch(`/${mealId}`, { name });

  dispatch({
    type: EDIT_MEAL_NAME,
    payload: response.data,
  });
};

export const clearLoggedFoods = () => {
  return {
    type: CLEAR_LOGGED_FOODS,
  };
};

export const fetchLoggedFoods = (mealId) => async (dispatch) => {
  const response = await foods.get(``, {
    params: {
      mealId,
    },
  });

  const flattenedLoggedFoods = response.data.loggedFoods.map((food) => {
    return {
      ...food,
      foodNutrients: flattenObjectArray(food.foodNutrients, '_trackedNutrient'),
    };
  });

  dispatch({
    type: FETCH_LOGGED_FOODS,
    payload: flattenedLoggedFoods,
  });
};

export const addLoggedFood = (detailedFood, weight) => async (dispatch) => {
  const { meal, foodNutrients, ...rest } = detailedFood;

  const newFoodNutrients = foodNutrients.map((nutrient) => {
    return {
      ...nutrient,
      amount: calculateAmountOfNutrient(nutrient.amount || 0, weight),
    };
  });

  const newFood = {
    mealId: meal._id,
    foodNutrients: newFoodNutrients,
    ...rest,
  };

  const response = await foods.post('', newFood);

  const flattenedNutrients = flattenObjectArray(
    response.data.foodNutrients,
    '_trackedNutrient'
  );

  dispatch(updateLog(meal._log));

  await dispatch({
    type: ADD_LOGGED_FOOD,
    payload: { ...response.data, foodNutrients: flattenedNutrients },
  });
};

export const deleteLoggedFoods = (foodsToDelete) => async (dispatch) => {
  let loggedFoodsIds = [];

  for (let food of foodsToDelete) {
    loggedFoodsIds.push(food.id);
  }

  dispatch({
    type: DELETE_LOGGED_FOODS,
    payload: loggedFoodsIds,
  });
};

export const deleteLoggedFood = (id, meal) => async (dispatch) => {
  await foods.delete(`/${id}`);

  dispatch(updateLog(meal._log));

  dispatch({
    type: DELETE_LOGGED_FOOD,
    payload: id,
  });
};

export const setDate = (date) => {
  return {
    type: SET_DATE,
    payload: date,
  };
};

export const clearUsdaFoods = () => {
  return {
    type: CLEAR_USDA_FOODS,
  };
};

export const clearCustomFoods = () => {
  return {
    type: CLEAR_CUSTOM_FOODS,
  };
};

export const clearDetailedFood = () => {
  return {
    type: CLEAR_DETAILED_FOOD,
  };
};

export const fetchDetailedUsdaFood = (fdcId) => async (dispatch) => {
  const response = await usda.get(`/food/${fdcId}`);

  dispatch({
    type: FETCH_DETAILED_USDA_FOOD,
    payload: response.data,
  });
};

export const fetchUsdaFoods = (query, page) => async (dispatch) => {
  const response = await usda.get('/foods/search', {
    params: {
      query,
      pageNumber: page,
    },
  });

  dispatch({
    type: FETCH_USDA_FOODS,
    payload: {
      data: response.data,
      page,
    },
  });
};

export const selectFood = (fdcId) => {
  return {
    type: SELECT_FOOD,
    payload: fdcId,
  };
};

export const fetchCustomFoods = (query) => async (dispatch) => {
  const response = await customFoods.get('', {
    params: {
      query,
      limit: 50,
    },
  });

  dispatch({
    type: FETCH_CUSTOM_FOODS,
    payload: response.data,
  });
};

export const fetchDetailedCustomFood = (id) => async (dispatch) => {
  const response = await customFoods.get(`/${id}`);

  const flattenedTargets = flattenObjectArray(
    response.data.foodNutrients,
    '_trackedNutrient'
  );

  dispatch({
    type: FETCH_DETAILED_CUSTOM_FOOD,
    payload: { ...response.data, foodNutrients: flattenedTargets },
  });
};

export const selectCustomFood = (id) => {
  return {
    type: SELECT_CUSTOM_FOOD,
    payload: id,
  };
};

export const clearSelection = () => async (dispatch) => {
  dispatch(clearDetailedFood());
  dispatch(selectFood(0));
};

export const setWeightValue = (value) => {
  return {
    type: SET_WEIGHT_VALUE,
    payload: value,
  };
};

export const selectLoggedFood = (loggedFood) => {
  return {
    type: SELECT_LOGGED_FOOD,
    payload: loggedFood,
  };
};

export const resetSelectLoggedFood = (loggedFood) => {
  return {
    type: RESET_SELECT_LOGGED_FOOD,
    payload: loggedFood,
  };
};

export const copyLoggedFood = (loggedFoodId) => {
  return {
    type: COPY_LOGGED_FOOD,
    payload: loggedFoodId,
  };
};

export const pasteLoggedFood =
  (loggedFoodId, { _id, _log }) =>
  async (dispatch) => {
    const response = await foods.post(`/copyLoggedFood/${loggedFoodId}`, {
      mealId: _id,
    });
    dispatch(updateLog(_log));
    dispatch({
      type: PASTE_LOGGED_FOOD,
      payload: response.data,
    });
  };

export const addCustomFood = (customFood) => async (dispatch) => {
  const response = await customFoods.post('', customFood);

  dispatch({
    type: ADD_CUSTOM_FOOD,
    payload: response.data,
  });
  history.push('/foods');
};

export const updateUserNurtientTargets = (nutrients) => async (dispatch) => {
  const response = await users.patch(``, {
    generalTargets: nutrients,
  });

  const flattenedTargets = flattenObjectArray(
    response.data.generalTargets,
    '_trackedNutrient'
  );

  dispatch({
    type: UPDATE_USER_NUTRIENT_TARGETS,
    payload: { ...response.data, generalTargets: flattenedTargets },
  });

  history.push('/diary');
};

export const setSearchQuery = (query) => {
  return {
    type: SET_SEARCH_QUERY,
    payload: query,
  };
};

export const fetchUser = () => async (dispatch) => {
  const response = await axios.get('/api/user');

  if (!response.data._id) {
    dispatch({
      type: FETCH_USER,
      payload: {},
    });
    return;
  }

  const flattenedTargets = flattenObjectArray(
    response.data.generalTargets,
    '_trackedNutrient'
  );

  dispatch({
    type: FETCH_USER,
    payload: { ...response.data, generalTargets: flattenedTargets },
  });
};
