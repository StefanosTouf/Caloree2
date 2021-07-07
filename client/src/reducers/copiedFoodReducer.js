import { COPY_LOGGED_FOOD, PASTE_LOGGED_FOOD } from '../actions/types';
import _ from 'lodash';

export default (state = '', action) => {
  switch (action.type) {
    case COPY_LOGGED_FOOD:
      return action.payload;
    case PASTE_LOGGED_FOOD:
      return '';
    default:
      return state;
  }
};
