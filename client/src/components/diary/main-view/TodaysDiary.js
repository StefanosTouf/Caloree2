import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { fetchMeals, addMeal, addLog } from '../../../actions';

import Accordion from '../../generalComponents/Accordion';
import Meal from './Meal';
import MealHeader from './MealHeader'

const TodaysDiary = ({ meals, fetchMeals, date, addMeal, log, addLog }) => {

    useEffect(() => {
        fetchMeals(date)
    }, [date])



    const accordionItem = (meal) => {
        return (
            <div className="ui segment" key={meal.id}>
                <MealHeader mealId={meal.id} />
                <Meal mealId={meal.id} />
            </div>
        )
    }

    const accordionItems = (meals) => {
        return Object.values(meals).map((meal) => {
            return accordionItem(meal)
        })
    }

    const handleAddMeal = () => {
        if (!log.id) {
            addLog(date)
        }

        addMeal(date, 'New Meal')
    }



    return (
        <div id="diary-wrapper">
            <h3 class="ui top attached header" id="diary-header">
                <div className="ui two column grid" >
                    <div className="ui twelve wide column"><h2>Todays Diary: {date}</h2></div>
                    <div className="ui four wide column">
                        <button className="ui button positive" onClick={handleAddMeal}>Add Meal</button>
                    </div>
                </div>
            </h3>
            <div className="ui attached segment" id="todays-diary">
                <div className="ui segments">
                    {accordionItems(meals)}
                </div>
            </div>
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        meals: state.meals,
        date: state.date,
        log: state.log
    }
}


export default connect(
    mapStateToProps,
    { fetchMeals, addMeal, addLog }
)(TodaysDiary);