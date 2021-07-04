import React, { useEffect } from 'react';
import _ from 'lodash';

import { connect } from 'react-redux';

import { fetchLog, fetchUser } from '../../../actions/index'


const GeneralInfo = ({ userTargets, targetsAchieved, fetchLog, date, fetchUser }) => {

    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        console.log('fetching log')
        fetchLog(date)
    }, [date])


    const renderInfo = () => {


        const { energyAch, proteinAch, carbAch, fatAch, fiberAch } = _.mapKeys(targetsAchieved, (_value, key) => {
            return key + 'Ach'
        })

        const { energyTarg, proteinTarg, carbTarg, fatTarg, fiberTarg } = _.mapKeys(userTargets, (_value, key) => {
            return key + 'Targ'
        })

        return (
            <div>
                <div className="ui olive inverted progress">

                    <h5>
                        {`${energyTarg.label}: ${energyAch.amount}/${energyTarg.amount} ${energyTarg.unitLabel} `}
                    </h5>
                    <div className="bar-wrapper">
                        <div className="bar"
                            style={{ width: `${(energyAch.amount / energyTarg.amount) * 100}%` }}
                        />
                    </div>
                </div>
                <div className="ui green inverted progress">

                    <h5>
                        {`${proteinTarg.label}: ${proteinAch.amount}/${proteinTarg.amount} ${proteinTarg.unitLabel} `}
                    </h5>
                    <div className="bar-wrapper">
                        <div className="bar"
                            style={{ width: `${(proteinAch.amount / proteinTarg.amount) * 100}%` }}
                        />
                    </div>
                </div>
                <div className="ui blue inverted progress">

                    <h5>
                        {`${carbTarg.label}: ${carbAch.amount}/${carbTarg.amount} ${carbTarg.unitLabel} `}
                    </h5>
                    <div className="bar-wrapper">
                        <div className="bar"
                            style={{ width: `${(carbAch.amount / carbTarg.amount) * 100}%` }}
                        />
                    </div>
                </div>
                <div className="ui red inverted progress">
                    <div >
                        <h5>
                            {`${fatTarg.label}: ${fatAch.amount}/${fatTarg.amount} ${fatTarg.unitLabel} `}
                        </h5>
                        <div className="bar-wrapper">
                            <div className="bar"
                                style={{ width: `${(fatAch.amount / fatTarg.amount) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
                <div className="ui brown inverted progress">
                    <h5>
                        {`${fiberTarg.label}: ${fiberAch.amount}/${fiberTarg.amount} ${fiberTarg.unitLabel} `}
                    </h5>
                    <div className="bar-wrapper">
                        <div className="bar"
                            style={{ width: `${(fiberAch.amount / fiberTarg.amount) * 100}%` }}
                        />
                    </div>
                </div>


            </div>
        )
    }

    const renderTargetsAchieved = () => {

        if (!_.isEmpty(userTargets) && !_.isEmpty(targetsAchieved)) {
            return renderInfo()

        } else {
            return <div>Loading...</div>
        }
    }

    return (
        <div className="ui segment" id="general-info">
            <h3 className="ui header">General Info</h3>
            {renderTargetsAchieved()}
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        date: state.date,
        targetsAchieved: state.targetsAchieved,
        userTargets: state.userTargets
    }
}


export default connect(
    mapStateToProps,
    { fetchLog, fetchUser }
)(GeneralInfo);