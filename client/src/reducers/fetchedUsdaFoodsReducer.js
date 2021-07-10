import {
  FETCH_USDA_FOODS,
  CLEAR_USDA_FOODS,
  FETCH_USDA_FOODS_CANCEL,
  START_FETCH_USDA_FOODS,
} from '../actions/types';
import _ from 'lodash';

const initState = { foods: [], fetchRequestId: -1 };

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_USDA_FOODS:
      if (action.payload.id !== state.fetchRequestId) {
        return { ...initState, fetchRequestId: state.fetchRequestId };
      }
      return {
        foods:
          state.foods.length < 1
            ? action.payload.data.foods
            : _.concat(state.foods, action.payload.data.foods),
        fetchRequestId: action.payload.id,
      };
    case START_FETCH_USDA_FOODS:
      return {
        ...initState,
        fetchRequestId: action.payload,
      };
    case CLEAR_USDA_FOODS:
      return initState;
    default:
      return state;
  }
};
