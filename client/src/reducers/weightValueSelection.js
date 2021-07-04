import {
    SET_WEIGHT_VALUE
} from "../actions/types";
import _ from 'lodash';

export default (state = 100, action) => {
    switch (action.type) {
        case SET_WEIGHT_VALUE:
            return action.payload;
        default:
            return state;
    }

}


