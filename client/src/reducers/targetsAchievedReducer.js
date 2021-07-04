import {
    ADD_LOG,
    FETCH_LOG,
    UPDATE_LOG,
    SELECT_LOGGED_FOOD
} from "../actions/types";

import _ from 'lodash';
import { targetsPrototype } from '../other/configs'
import configNutrients from '../other/configNutrients'

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_LOG:
            if (!_.isEmpty(action.payload)) {
                return _.mapKeys(action.payload.targetsAchieved, 'shortName');
            }
            else
                return  _.mapKeys(configNutrients(targetsPrototype), 'shortName')
        case UPDATE_LOG:
            return _.mapKeys(action.payload.targetsAchieved, 'shortName');
        case ADD_LOG:
            return _.mapKeys(action.payload.targetsAchieved, 'shortName');
        case SELECT_LOGGED_FOOD:
            return _.mapKeys(action.payload.foodNutrients, 'shortName');
        default:
            return state;
    }

}


