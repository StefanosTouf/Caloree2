import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import mealsReducer from './mealsReducer';
import dateReducer from './dateReducer';
import targetsAchievedReducer from './targetsAchievedReducer';
import userTargetsReducer from './userTargetsReducer';
import logReducer from './logReducer';
import loggedFoodsReducer from './loggedFoodsReducer';
import fetchedUsdaFoodsReducer from './fetchedUsdaFoodsReducer';
import fetchedCustomFoodsReducer from './fetchedCustomFoodsReducer';

import detailedFoodReducer from './detailedFoodReducer';
import selectFoodReducer from './selectFoodReducer';
import weightValueSelection from './weightValueSelection';
import searchQueryReducer from './searchQueryReducer';

import authReducer from './authReducer';

export default combineReducers({
  meals: mealsReducer,
  date: dateReducer,
  targetsAchieved: targetsAchievedReducer,
  userTargets: userTargetsReducer,
  log: logReducer,
  loggedFoods: loggedFoodsReducer,
  fetchedUsdaFoods: fetchedUsdaFoodsReducer,
  fetchedCustomFoods: fetchedCustomFoodsReducer,
  detailedFood: detailedFoodReducer,
  selectedFood: selectFoodReducer,
  weightValue: weightValueSelection,
  form: formReducer,
  searchQuery: searchQueryReducer,
  auth: authReducer,
});
