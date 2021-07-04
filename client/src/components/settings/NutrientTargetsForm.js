import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import NutrientsForm from '../generalComponents/NutrientsForm';
import configNutrients from '../../other/configNutrients';

import { updateUserNurtientTargets, fetchUser } from '../../actions';

const NutrientTargetsForm = ({
  updateUserNurtientTargets,
  userTargets,
  fetchUser,
}) => {
  const onSubmit = (formValues) => {
    updateUserNurtientTargets(formValues.nutrients);
  };

  const getDefaultValues = () => {
    let defaultValues = {};

    for (let key of Object.keys(userTargets)) {
      defaultValues = {
        ...defaultValues,
        [userTargets[key].name]: userTargets[key].amount,
      };
    }

    return defaultValues;
  };

  return (
    <div className="ui segment">
      <NutrientsForm
        onSubmit={onSubmit}
        label="Customize your Nutrient Targets"
        defaultValues={getDefaultValues()}
        name="customNutrientTargets"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userTargets: state.userTargets,
  };
};

export default connect(mapStateToProps, {
  updateUserNurtientTargets,
  fetchUser,
})(NutrientTargetsForm);
