import { FETCH_USER, UPDATE_USER_NUTRIENT_TARGETS } from '../actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER:
      return _.mapKeys(action.payload.generalTargets, 'shortName');
    case UPDATE_USER_NUTRIENT_TARGETS:
      return _.mapKeys(action.payload.generalTargets, 'shortName');
    default:
      return state;
  }
};
