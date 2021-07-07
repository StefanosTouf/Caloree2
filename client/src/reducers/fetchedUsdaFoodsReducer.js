import {
  FETCH_USDA_FOODS,
  CLEAR_USDA_FOODS,
  FETCH_USDA_FOODS_CANCEL,
} from '../actions/types';
import _ from 'lodash';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_USDA_FOODS:
      return state.length < 1
        ? action.payload.data.foods
        : _.concat(state, action.payload.data.foods);
    case CLEAR_USDA_FOODS:
      return [];
    case FETCH_USDA_FOODS_CANCEL:
      return state;
    default:
      return state;
  }
};
