import {
    FETCH_LOG,
    ADD_LOG,
    UPDATE_LOG
} from "../actions/types";
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_LOG:
            return { ...action.payload};
        case UPDATE_LOG:
            return { ...action.payload};
        case ADD_LOG:
            return { ...action.payload };
        default:
            return state;
    }

}


