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

import _ from 'lodash';

import { targetsPrototype, trackedNutrients } from '../other/configs';
import { calculateAmountOfNutrient } from '../other/nutrientCalculations';
import configNutrients from '../other/configNutrients';
import history from '../history';

export const fetchLog = (date, getState) => async (dispatch) => {
  //const userId = getState().auth;
  const response = await logs.get('', {
    params: {
      date: date,
    },
  });

  dispatch({
    type: FETCH_LOG,
    payload: response.data[0],
  });
};

export const updateLog = () => async (dispatch, getState) => {
  const { date } = getState();

  const mealsResponse = await meals.get('', {
    params: {
      userId: 123412312,
      date: date,
    },
  });

  const logResponse = await logs.get('/logs', {
    params: {
      userId: 123412312,
      date: date,
    },
  });

  let startingNutrients = { ...trackedNutrients };

  for (let meal of mealsResponse.data) {
    const loggedFoods = await foods.get('', {
      params: {
        mealId: meal.id,
      },
    });

    for (let food of loggedFoods.data) {
      for (let nutrient of food.foodNutrients) {
        if (startingNutrients[nutrient.name]) {
          startingNutrients = {
            ...startingNutrients,
            [nutrient.name]: {
              name: nutrient.name,
              number: nutrient.number,
              amount: startingNutrients[nutrient.name].amount + nutrient.amount,
              unitName: nutrient.unitName,
            },
          };
        }
      }
    }
  }

  const newTargets = logResponse.data[0].targetsAchieved.map((targ) => {
    if (startingNutrients[targ.name]) {
      return { ...targ, ['amount']: startingNutrients[targ.name].amount };
    }
    return { ...targ };
  });

  const updatedLog = {
    id: logResponse.data.id,
    userId: 123412312,
    date,
    targetsAchieved: configNutrients(newTargets),
  };

  const response = await logs.put(
    `/logs/${logResponse.data[0].id}`,
    updatedLog
  );

  dispatch({
    type: UPDATE_LOG,
    payload: response.data,
  });
};

export const addLog = (date) => async (dispatch) => {
  const userId = 123412312;

  const log = {
    date,
    userId,
    targetsAchieved: Object.values(trackedNutrients),
  };

  const response = await logs.post('/logs', log);

  dispatch({
    type: ADD_LOG,
    payload: response.data,
  });
};

export const fetchMeals = (date) => async (dispatch) => {
  console.log('fetchMeals', date);
  //const userId = getState().auth;
  const response = await meals.get(``, {
    params: {
      userId: 123412312,
      date: date,
    },
  });

  dispatch({
    type: FETCH_MEALS,
    payload: response.data,
  });
};

export const fetchMeal = (mealId) => async (dispatch) => {
  //const userId = getState().auth;
  const response = await meals.get(`/${mealId}`);

  dispatch({
    type: FETCH_MEAL,
    payload: response.data,
  });
};

export const addMeal = (date, name) => async (dispatch) => {
  const meal = { date, name, userId: 123412312 };
  const response = await meals.post('', meal);

  dispatch({
    type: ADD_MEAL,
    payload: response.data,
  });
};

export const deleteMeal = (mealId) => async (dispatch) => {
  //const userId = getState().auth;

  await meals.delete(`/${mealId}`);

  dispatch(updateLog());

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
  //const userId = getState().auth;
  const response = await foods.get(``, {
    params: {
      mealId,
    },
  });

  dispatch({
    type: FETCH_LOGGED_FOODS,
    payload: response.data,
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
    foodNutrients: configNutrients(newFoodNutrients),
  };

  const response = await foods.post('', newFood);

  await dispatch(updateLog());

  dispatch({
    type: ADD_LOGGED_FOOD,
    payload: response.data,
  });
};

export const deleteLoggedFoods = (foodsToDelete) => async (dispatch) => {
  let loggedFoodsIds = [];

  for (let food of foodsToDelete) {
    loggedFoodsIds.push(food.id);
  }

  dispatch(updateLog());

  dispatch({
    type: DELETE_LOGGED_FOODS,
    payload: loggedFoodsIds,
  });
};

export const deleteLoggedFood = (id) => async (dispatch) => {
  await foods.delete(`/${id}`);

  dispatch(updateLog());

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
      description_like: query,
      _limit: 50,
    },
  });

  dispatch({
    type: FETCH_CUSTOM_FOODS,
    payload: response.data,
  });
};

export const fetchDetailedCustomFood = (id) => async (dispatch) => {
  const response = await customFoods.get(`/${id}`);
  const configuredNutrients = configNutrients(response.data.foodNutrients);

  dispatch({
    type: FETCH_DETAILED_CUSTOM_FOOD,
    payload: { ...response.data, ['foodNutrients']: configuredNutrients },
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
  const response = await users.patch(`/${123412312}`, {
    generalTargets: nutrients,
  });

  console.log(response);

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
