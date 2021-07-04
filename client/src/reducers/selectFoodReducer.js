import {
    SELECT_CUSTOM_FOOD,
    SELECT_FOOD
} from "../actions/types";
import _ from 'lodash';

export default (state = 0, action) => {
    switch (action.type) {
        case SELECT_FOOD:
            return action.payload;
        case SELECT_CUSTOM_FOOD:
            return action.payload;
        default:
            return state;
    }

}


