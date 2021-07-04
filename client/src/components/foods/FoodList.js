import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import DetailedFoodDisplay from './DetailedFoodDisplay';

const FoodList = ({
  searchQuery,
  foods,
  fetchFoodsNextPage,
  mealId,
  selectFood,
  fetchDetailedFood,
}) => {
  const [resultsPage, setResultsPage] = useState(1);

  useEffect(() => {
    fetchFoodsNextPage(searchQuery, resultsPage);
  }, [resultsPage]);

  return (
    <>
      <div className="ui middle aligned selection list foods-list">
        {foods.map(
          ({ fdcId, description, brandName, additionalDescriptions, _id }) => {
            return (
              <div
                className="item"
                key={fdcId || _id}
                onClick={() => selectFood(fdcId || _id)}
              >
                <div className="content">
                  <div>
                    {`${description}${brandName ? `, ${brandName}` : ''}${
                      additionalDescriptions
                        ? `, ${additionalDescriptions}`
                        : ''
                    }`}
                  </div>
                </div>
              </div>
            );
          }
        )}
        <button
          className="ui button"
          onClick={() => setResultsPage(resultsPage + 1)}
        >
          Load More
        </button>
      </div>
      <DetailedFoodDisplay
        mealId={mealId}
        fetchDetailedFood={fetchDetailedFood}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    searchQuery: state.searchQuery,
  };
};

export default connect(mapStateToProps)(FoodList);
