import {
    SET_DATE
} from "../actions/types";
import _ from 'lodash';

export default (state = "", action) => {
    switch (action.type) {
        case SET_DATE:
            return action.payload;
        default:
            return state;
    }

}


