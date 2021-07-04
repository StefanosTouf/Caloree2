import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchLoggedFoods, deleteLoggedFoods, selectLoggedFood, deleteLoggedFood } from '../../../actions/index'
import FoodsModal from './FoodsModal'

const Meal = ({ mealId, fetchLoggedFoods, loggedFoods, deleteLoggedFoods, selectLoggedFood, deleteLoggedFood }) => {

    useEffect(() => {
        if (Object.values(loggedFoods).length < 1) {
            fetchLoggedFoods(mealId);
            console.log('fetched', loggedFoods, mealId)
        }
    }, [mealId])

    const renderFoods = () => {

        return Object.values(loggedFoods).map(({ description, amount, unitName, energy, id }) => {
            return (
                <div className="item" key={id} style={{ position: 'relative' }} onClick={() => selectLoggedFood(loggedFoods[id])}>
                    <div className="content">{`${description}, ${amount}${unitName}`}
                        <button
                            className='ui icon negative button delete'
                            style={{ padding: '0.35rem', position: 'absolute', right: '0' }}
                            onClick={() => deleteLoggedFood(id)}
                        > <i className="trash icon" />
                        </button>
                    </div>
                </div >
            )
        })
    }

return (
    <>
        <div class="ui middle aligned selection list meal">
            {renderFoods()}

        </div>
    </>
)
}




const mapStateToProps = (state, ownProps) => {

    let loggedFoodsObj = {};

    for (let food of Object.keys(state.loggedFoods)) {

        if (state.loggedFoods[food].mealId === ownProps.mealId) {
            loggedFoodsObj = { ...loggedFoodsObj, [food]: state.loggedFoods[food] }

        }

    }

    return { loggedFoods: loggedFoodsObj };


}

export default connect(
    mapStateToProps,
    { fetchLoggedFoods, deleteLoggedFoods, selectLoggedFood, deleteLoggedFood }
)(Meal);