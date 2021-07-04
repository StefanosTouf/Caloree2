import {
    ADD_LOGGED_FOOD,
    CLEAR_LOGGED_FOODS,
    DELETE_LOGGED_FOODS,
    FETCH_LOGGED_FOODS,
    DELETE_LOGGED_FOOD
} from "../actions/types";
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_LOGGED_FOODS:
            return { ...state, ..._.mapKeys(action.payload, 'id') }
        case ADD_LOGGED_FOOD:
            return { ...state, [action.payload.id]: action.payload }
        case DELETE_LOGGED_FOODS:
            return _.omit(state, action.payload)
        case DELETE_LOGGED_FOOD:
            return _.omit(state, action.payload)
        case CLEAR_LOGGED_FOODS:
            return {}
        default:
            return state;
    }

}


