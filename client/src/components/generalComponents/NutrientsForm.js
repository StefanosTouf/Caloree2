import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import { trackedNutrients } from '../../other/configs'



const AddCustomFood = ({ handleSubmit, onSubmit, label, foodDescription}) => {
    const renderInput = ({ input, label, meta }, type) => {

        const { error, touched } = meta;

        return (
            <div className="field ui column">
                <label>{label}</label>
                <input {...input} type={type} />
                {touched && error ?
                    <p style={{ color: 'red' }}>{error}</p>
                    :
                    <></>
                }

            </div>

        )
    }

    const onHandleSubmit = (formValues) => {
        console.log(formValues)
        onSubmit(formValues)
    }

    const renderNutrientInputs = () => {
        return Object.keys(trackedNutrients).map((key) => {
            return (
                <Field
                    name={key}
                    component={(props) => renderInput(props, "number")}
                    label={`${trackedNutrients[key].label}, ${trackedNutrients[key].unitLabel}`}
                    key={key}
                />
            )
        })
    }


    return (
        <>
            <div className="ui header">{label}</div>
            <form className="ui error form" onSubmit={handleSubmit(onHandleSubmit)} autoComplete="off">

                {
                    foodDescription ?
                        <Field name="description" component={(props) => renderInput(props, "text")} label="Description" />
                        :
                        <></>
                }

                <div className="ui six column doubling grid">
                    {
                        renderNutrientInputs()
                    }

                </div>

                <button className="ui button primary" style={{margin:'1rem'}}>Submit</button>
            </form>
        </>
    )
}

const validate = (formValues, props) => {
    let errors = {}

    for (let key of Object.keys(trackedNutrients)) {
        if (formValues[key] === "") {
            errors = { ...errors, [key]: 'You must enter this value' }

        }
    }

    if (props.foodDescription && !formValues.description) {
        errors = { ...errors, description: 'Enter a description' }
    }

    return errors;
}

const mapStateToProps = (state, props) => {
   
    return {
        initialValues: props.defaultValues,
        form:props.name
    }
}


export default connect(
    mapStateToProps
)(reduxForm({
    form: 'newCustomFood',
    validate,
    enableReinitialize: true
   
})(AddCustomFood))

