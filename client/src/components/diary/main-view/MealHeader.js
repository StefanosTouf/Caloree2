import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import _ from 'lodash';

import { deleteMeal, editMealName, fetchMeal, deleteLoggedFoods } from '../../../actions/index'
import FoodsModal from './FoodsModal'

const MealHeader = ({ meal, mealId, deleteMeal, editMealName, fetchMeal, loggedFoods, deleteLoggedFoods }) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [editingTitle, setEditingTitle] = useState(false);
    const [titleValue, setTitleValue] = useState(meal.name);

    useEffect(() => {
        if (!meal) {
            fetchMeal(mealId)
        }
    }, [])



    const handleDeleteMeal = () => {
        if (window.confirm(`Are you sure you want to delete: ${meal.name}`)) {
            const foodsToDelete = Object.values(loggedFoods).filter((lFood) => lFood.mealId === mealId)
            deleteMeal(mealId);
            deleteLoggedFoods(foodsToDelete);
        }

    }

    const handleEditMeal = () => {
        editMealName(mealId, titleValue);
        setEditingTitle(false);
    }

    const { energy, protein, carb, fat, fiber } = _.mapKeys(meal.mealTargetsAchieved, 'name');

    return (
        <div className="meal-header" style={{display:'flex', justifyContent:'space-between'}}>
            <div>
                {
                    editingTitle ?
                        <div class="ui action input">
                            <input type="text" value={titleValue} onChange={(e) => setTitleValue(e.target.value)}></input>
                            <button className="ui button primary" onClick={handleEditMeal}>Edit</button>
                        </div>
                        :
                        <h5>
                            {meal.name}
                        </h5>

                }

            </div>

            <div className='ui buttons'>
                <button className="ui icon button positive" onClick={() => setModalOpen(true)} >
                    <i className="plus icon" />
                </button>
                <button className="ui icon button primary" onClick={() => setEditingTitle(!editingTitle)} >
                    <i className="edit icon" />
                </button>
                <button className="ui icon button negative" onClick={handleDeleteMeal} >
                    <i className="trash icon" />
                </button>
            </div>
            {modalOpen ? <FoodsModal open={modalOpen} mealId={mealId} onDismiss={() => setModalOpen(false)} /> : <></>}
        </div>
    )
}

const mapStateToProps = (state, ownState) => {

    return {
        meal: state.meals[ownState.mealId],
        loggedFoods: state.loggedFoods
    }
}

export default connect(
    mapStateToProps,
    { editMealName, deleteMeal, fetchMeal, deleteLoggedFoods }
)(MealHeader);