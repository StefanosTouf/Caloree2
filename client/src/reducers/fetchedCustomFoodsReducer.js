import {
  ADD_CUSTOM_FOOD,
  CLEAR_CUSTOM_FOODS,
  FETCH_CUSTOM_FOODS,
} from '../actions/types';
import _ from 'lodash';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_CUSTOM_FOODS:
      return state.length < 1
        ? action.payload
        : _.concat(state, action.payload);
    case ADD_CUSTOM_FOOD:
      return _.concat(state, action.payload);
    case CLEAR_CUSTOM_FOODS:
      return [];
    default:
      return state;
  }
};
