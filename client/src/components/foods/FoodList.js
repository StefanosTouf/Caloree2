import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import useRemountEffect from '../../customHooks/useRemountEffect';

import DetailedFoodDisplay from './DetailedFoodDisplay';

const FoodList = ({
  searchQuery,
  foods,
  meal,
  selectFood,
  fetchDetailedFood,
  fetchFoods,
  clearFoods,
}) => {
  const [resultsPage, setResultsPage] = useState(1);

  useEffect(() => {
    if (foods.length < 1) {
      fetchFoods(searchQuery, resultsPage);
    }
  }, []);

  useRemountEffect(() => {
    fetchFoods(searchQuery, resultsPage);
  }, [resultsPage]);

  useRemountEffect(() => {
    const search = async () => {
      clearFoods();
      if (resultsPage > 1) {
        return setResultsPage(1);
      }
      fetchFoods(searchQuery, 1);
    };

    const timeout = setTimeout(() => {
      search();
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  return (
    <>
      <div className="ui middle aligned selection list foods-list">
        {foods.map(
          (
            { fdcId, description, brandName, additionalDescriptions, _id },
            index
          ) => {
            return (
              <div
                className="item"
                key={index}
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
      <DetailedFoodDisplay meal={meal} fetchDetailedFood={fetchDetailedFood} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    searchQuery: state.searchQuery,
  };
};

export default connect(mapStateToProps)(FoodList);
