import React, { useEffect } from 'react';
import _ from 'lodash';

import { connect } from 'react-redux';

import { fetchLog, fetchUser } from '../../../actions/index'


const GeneralInfo = ({ fetchLog, date}) => {

    return (

        <div className="button-wrapper reset-log-view" >
            <button
                className="ui primary button"
                onClick={() => {
                    fetchLog(date)
                }}
            >
                Reset View
            </button>
        </div>
    )
}


export default connect(
    null,
    { fetchLog, fetchUser }
)(GeneralInfo);