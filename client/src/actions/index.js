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
  CLEAR_FOODS,
  FETCH_USDA_FOODS_NEXT_PAGE,
  DELETE_MEAL,
  EDIT_MEAL_NAME,
  FETCH_DETAILED_USDA_FOOD,
  CLEAR_DETAILED_FOOD,
  SET_WEIGHT_VALUE,
  ADD_LOGGED_FOOD,
  DELETE_LOGGED_FOODS,
  ADD_LOG,
  UPDATE_LOG,
  FETCH_CUSTOM_FOODS,
  FETCH_CUSTOM_FOODS_NEXT_PAGE,
  FETCH_DETAILED_CUSTOM_FOOD,
  SELECT_CUSTOM_FOOD,
  SELECT_FOOD,
  SELECT_LOGGED_FOOD,
  DELETE_LOGGED_FOOD,
  ADD_CUSTOM_FOOD,
  UPDATE_USER_NUTRIENT_TARGETS,
  SET_SEARCH_QUERY,
  DELETE_CUSTOM_FOOD,
  FETCH_USER_INF,
} from './types';

import logs from '../apis/logs';
import meals from '../apis/meals';
import foods from '../apis/foods';
import usda from '../apis/usda';
import customFoods from '../apis/customFoods';
import users from '../apis/users';
import axios from 'axios';

import _, { update } from 'lodash';

import { targetsPrototype, trackedNutrients } from '../other/configs';
import { calculateAmountOfNutrient } from '../other/nutrientCalculations';
import configNutrients from '../other/configNutrients';
import history from '../history';
import { ContactSupportOutlined } from '@material-ui/icons';

export const fetchLog = (date, getState) => async (dispatch) => {
  const response = await logs.get('', {
    params: {
      date: date,
    },
  });

  if (response.data.targetsAchieved) {
    const flattenedTargets = response.data.targetsAchieved.map(
      ({ _trackedNutrient, ...others }) => {
        return { ..._trackedNutrient, ...others };
      }
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

  dispatch({
    type: ADD_LOG,
    payload: response.data,
  });
};

export const updateLog = () => async (dispatch, getState) => {
  const { date } = getState();
  console.log('date', date);

  const response = await logs.get('/updatedLog', { params: { date } });

  const flattenedTargets = response.data.targetsAchieved.map(
    ({ _trackedNutrient, ...others }) => {
      return { ..._trackedNutrient, ...others };
    }
  );

  dispatch({
    type: FETCH_LOG,
    payload: { ...response.data, targetsAchieved: flattenedTargets },
  });
};

export const fetchMeals = (date) => async (dispatch) => {
  const response = await meals.get(``, {
    params: {
      date: date,
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

export const addMeal = (date, name) => async (dispatch) => {
  const meal = { date, name };
  const response = await meals.post('', meal);

  dispatch({
    type: ADD_MEAL,
    payload: response.data,
  });
};

export const deleteMeal = (mealId) => async (dispatch) => {
  //const userId = getState().auth;

  await meals.delete(`/${mealId}`);

  dispatch({
    type: DELETE_MEAL,
    payload: mealId,
  });
};

export const editMealName = (mealId, name) => async (dispatch) => {
  //const userId = getState().auth;

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

  dispatch({
    type: FETCH_LOGGED_FOODS,
    payload: response.data.loggedFoods,
  });
};

export const addLoggedFood = (detailedFood, weight) => async (dispatch) => {
  const newFoodNutrients = detailedFood.foodNutrients.map((nutrient) => {
    return {
      ...nutrient,
      amount: calculateAmountOfNutrient(nutrient.amount || 0, weight),
    };
  });

  const newFood = {
    ...detailedFood,
    foodNutrients: newFoodNutrients,
  };

  const response = await foods.post('', newFood);

  dispatch(updateLog());

  await dispatch({
    type: ADD_LOGGED_FOOD,
    payload: response.data,
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

export const deleteLoggedFood = (id) => async (dispatch) => {
  await foods.delete(`/${id}`);

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

export const clearFoods = () => {
  return {
    type: CLEAR_FOODS,
  };
};

export const clearDetailedFood = () => {
  return {
    type: CLEAR_DETAILED_FOOD,
  };
};

export const fetchUsdaFoods = (query) => async (dispatch) => {
  const response = await usda.get('/foods/search', {
    params: {
      query,
    },
  });

  dispatch({
    type: FETCH_USDA_FOODS,
    payload: response.data,
  });
};

export const fetchDetailedUsdaFood = (fdcId) => async (dispatch) => {
  const response = await usda.get(`/food/${fdcId}`, {
    params: {
      format: 'abridged',
    },
  });

  const configuredNutrients = configNutrients(response.data.foodNutrients);

  dispatch({
    type: FETCH_DETAILED_USDA_FOOD,
    payload: { ...response.data, ['foodNutrients']: configuredNutrients },
  });
};

export const fetchUsdaFoodsNextPage = (query, page) => async (dispatch) => {
  const response = await usda.get('/foods/search', {
    params: {
      query,
      pageNumber: page,
    },
  });

  dispatch({
    type: FETCH_USDA_FOODS_NEXT_PAGE,
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

  dispatch({
    type: FETCH_DETAILED_CUSTOM_FOOD,
    payload: response.data,
  });
};

export const fetchCustomFoodsNextPage =
  (query) => async (dispatch, getState) => {
    const nextPage = getState().foodsPage + 1;

    const response = await customFoods.get('', {
      params: {
        query,
        _page: nextPage,
      },
    });

    dispatch({
      type: FETCH_CUSTOM_FOODS_NEXT_PAGE,
      payload: {
        data: response.data,
        page: nextPage,
      },
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
  dispatch(clearFoods());
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

export const addCustomFood = (customFood) => async (dispatch) => {
  const response = await customFoods.post('', customFood);

  dispatch({
    type: ADD_CUSTOM_FOOD,
    payload: response.data,
  });
  history.push('/foods');
};

export const updateUserNurtientTargets = (nutrients) => async (dispatch) => {
  console.log(nutrients);
  const response = await users.patch(``, {
    generalTargets: nutrients,
  });

  dispatch({
    type: UPDATE_USER_NUTRIENT_TARGETS,
    payload: response.data,
  });

  history.push('/');
};

export const setSearchQuery = (query) => {
  return {
    type: SET_SEARCH_QUERY,
    payload: query,
  };
};

export const fetchUser = () => async (dispatch) => {
  const response = await axios.get('/api/user');

  const flattenedTargets = response.data.generalTargets.map(
    ({ _trackedNutrient, ...others }) => {
      return { ..._trackedNutrient, ...others };
    }
  );

  dispatch({
    type: FETCH_USER,
    payload: { ...response.data, generalTargets: flattenedTargets },
  });
};
