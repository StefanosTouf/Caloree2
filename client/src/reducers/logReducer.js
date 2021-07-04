import { FETCH_LOG, ADD_LOG, UPDATE_LOG } from '../actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_LOG:
      return { ..._.omit(action.payload, 'targetsAchieved') };
    case UPDATE_LOG:
      return { ..._.omit(action.payload, 'targetsAchieved') };
    case ADD_LOG:
      return { ..._.omit(action.payload, 'targetsAchieved') };
    default:
      return state;
  }
};
