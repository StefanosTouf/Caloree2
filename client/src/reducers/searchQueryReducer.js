import {
    SET_SEARCH_QUERY
} from "../actions/types";
import _ from 'lodash';

export default (state = '', action) => {
    switch (action.type) {
        case SET_SEARCH_QUERY:
            return action.payload;
        default:
            return state;
    }

}


