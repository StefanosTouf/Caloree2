import React from 'react';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';

import configNutrients from '../../other/configNutrients';

import { addCustomFood } from '../../actions/index';
import NutrientsForm from '../generalComponents/NutrientsForm';

const AddCustomFood = ({ addCustomFood }) => {
  const onSubmit = (formValues) => {
    addCustomFood(formValues);
  };

  return (
    <div id="add-custom-food">
      <div className="ui segment">
        <NutrientsForm
          onSubmit={onSubmit}
          label="Add custom food"
          foodDescription
          name="addCustomFood"
        />
      </div>
      <NavLink exact to="/foods" className="ui labeled icon button">
        <i className="arrow left icon"></i>
        Back
      </NavLink>
    </div>
  );
};

export default connect(null, { addCustomFood })(AddCustomFood);
