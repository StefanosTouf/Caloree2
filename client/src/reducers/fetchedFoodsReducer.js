import {
    FETCH_USDA_FOODS,
    CLEAR_FOODS,
    FETCH_USDA_FOODS_NEXT_PAGE,
    FETCH_CUSTOM_FOODS,
    FETCH_CUSTOM_FOODS_NEXT_PAGE
} from "../actions/types";
import _ from 'lodash';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_USDA_FOODS:
            return action.payload.foods
        case FETCH_CUSTOM_FOODS:
            return action.payload
        case CLEAR_FOODS:
            return []
        case FETCH_USDA_FOODS_NEXT_PAGE:
            return _.concat(state, action.payload.data.foods)
        case FETCH_CUSTOM_FOODS_NEXT_PAGE:
            return _.concat(state, action.payload.data)
        default:
            return state;
    }

}

