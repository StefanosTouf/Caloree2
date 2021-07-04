import React from 'react';
import { connect } from 'react-redux'
import _ from 'lodash'

import './detailedInf.css'

const DetailedInfo = ({ userTargets, targetsAchieved }) => {



    const renderProgressBars = () => {




        if (_.isEmpty(userTargets)) {
            return;
        }

        if (_.isEmpty(targetsAchieved)) {


        } else {
            const ar = [];

            for (let key of Object.keys(userTargets)) {

                const achievedAmount = targetsAchieved[key] ? targetsAchieved[key].amount : 0

                ar.push(
                    <div className="column" key={key}>
                        <div className="ui green inverted progress">

                            <h5>
                                {`${userTargets[key].label}: ${achievedAmount}/${userTargets[key].amount} ${userTargets[key].unitLabel} `}
                            </h5>
                            <div className="bar-wrapper">
                                <div className="bar"
                                    style={{ width: `${(achievedAmount / userTargets[key].amount) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
            return ar;
        }




    }

    return (
        <div className="ui segment" id="detailed-info">
            <h3 className="ui header">Detailed Info</h3>
            <div className="ui five column grid">
                {renderProgressBars()}
            </div>

        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        targetsAchieved: state.targetsAchieved,
        userTargets: state.userTargets
    }
}

export default connect(
    mapStateToProps
)(DetailedInfo);


/*
<div className="ui olive inverted progress">
                    <div>
                        <h5>
                            {`${energyTarg.label}: ${energyAch.amount}/${energyTarg.amount} ${energyTarg.unitLabel} `}
                        </h5>
                        <div className="bar"
                            style={{ width: `${(energyAch.amount / energyTarg.amount) * 100}%` }}
                        />
                    </div>
                </div>


*/