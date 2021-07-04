import {
    FETCH_MEALS,
    ADD_MEAL,
    DELETE_MEAL,
    EDIT_MEAL_NAME,
    FETCH_MEAL
} from "../actions/types";
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_MEALS:
            return { ..._.mapKeys(action.payload, 'id') }
        case FETCH_MEAL:
            return {...state, [action.payload.id]:action.payload }
        case ADD_MEAL:
            return { ...state, [action.payload.id]: action.payload }
        case DELETE_MEAL:
            return _.omit(state, action.payload)
        case EDIT_MEAL_NAME:
            return { ...state, [action.payload.id]: action.payload }
        default:
            return state;
    }

}


