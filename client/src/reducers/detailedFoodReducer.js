import {
    FETCH_DETAILED_USDA_FOOD,
    FETCH_DETAILED_CUSTOM_FOOD,
    CLEAR_DETAILED_FOOD
} from "../actions/types";
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_DETAILED_USDA_FOOD:
            return action.payload
        case FETCH_DETAILED_CUSTOM_FOOD:
            return action.payload
        case CLEAR_DETAILED_FOOD:
            return {}
        default:
            return state;
    }

}


