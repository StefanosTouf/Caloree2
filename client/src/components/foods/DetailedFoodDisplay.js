import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { trackedNutrients } from '../../other/configs';
import { calculateAmountOfNutrient } from '../../other/nutrientCalculations';

import { clearSelection, addLoggedFood } from '../../actions/index';

import _ from 'lodash';

import './foods.css';

const DetailedFoodDisplay = ({
  selectedFood,
  detailedFood,
  fetchDetailedFood,
  clearSelection,
  meal,
  addLoggedFood,
}) => {
  const [calculatorValue, setCalculatorValue] = useState(100);

  useEffect(() => {
    return () => clearSelection();
  }, []);

  useEffect(() => {
    if (selectedFood !== 0) {
      console.log(selectedFood);
      fetchDetailedFood(selectedFood);
      setCalculatorValue(100);
    }
  }, [selectedFood]);

  const handleAddFood = () => {
    addLoggedFood(
      _.omit(
        { ...detailedFood, meal, amount: calculatorValue, unitName: 'g' },
        'id'
      ),
      calculatorValue
    );
    clearSelection();
  };

  const renderHeader = () => {
    const { description, brandName, brandOwner, additionalDescriptions } =
      detailedFood;
    if (description) {
      return (
        <h3 className="ui header">
          <div className="content">
            {`${description}${brandName ? `, ${brandName}` : ''}${
              brandOwner ? `, ${brandOwner}` : ''
            }${additionalDescriptions ? `, ${additionalDescriptions}` : ''}`}
          </div>
        </h3>
      );
    }
  };

  const renderNutrients = () => {
    return detailedFood.foodNutrients.map(
      ({ number, name, amount, unitLabel, label }) => {
        return (
          <div key={name} className="column">
            {`${label}:  `}
            <b>
              {calculateAmountOfNutrient(amount, calculatorValue)}
              {unitLabel}
            </b>
          </div>
        );
      }
    );
  };

  const renderSegment = () => {
    const { description, foodNutrients } = detailedFood;

    if (foodNutrients && description) {
      return (
        <div className="ui segment food-display">
          {renderHeader()}
          <div className="ui two column stackable grid">
            <div className="ui row">
              <div className="ui twelve wide column">
                <div className="ui four column doubling grid">
                  {renderNutrients()}
                </div>
              </div>
              <div className="ui four wide column">
                <div className="ui right fluid labeled input">
                  <input
                    type="text"
                    placeholder="Enter weight"
                    value={calculatorValue}
                    onChange={(e) => setCalculatorValue(e.target.value)}
                  />
                  <div className="ui dropdown label">
                    <div className="text">G</div>
                  </div>
                </div>
                {meal ? (
                  <button
                    className="ui button primary "
                    onClick={handleAddFood}
                  >
                    Add Food
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return <>{renderSegment()}</>;
};

const mapStateToProps = (state) => {
  return {
    detailedFood: state.detailedFood,
    selectedFood: state.selectedFood,
  };
};

export default connect(mapStateToProps, {
  clearSelection,
  addLoggedFood,
})(DetailedFoodDisplay);
