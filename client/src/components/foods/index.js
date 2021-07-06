import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  fetchUsdaFoods,
  selectFood,
  setSearchQuery,
} from '../../actions/index';
import { NavLink, BrowserRouter as Router } from 'react-router-dom';

import CustomFoodList from './CustomFoodList';
import UsdaFoodList from './UsdaFoodList';

import './foods.css';
import '../diary/main-view/foodsModal.css';

const Foods = ({ fetchUsdaFoods, meal, setSearchQuery, searchQuery }) => {
  const [page, setPage] = useState(0);

  useEffect(() => {
    return setSearchQuery('');
  }, []);

  useEffect(() => {
    const fetchFoods = async () => {
      fetchUsdaFoods(searchQuery);
    };

    const timeOut = setTimeout(() => {
      fetchFoods();
    }, 500);

    return () => clearTimeout(timeOut);
  }, [searchQuery]);

  return (
    <div className="foods">
      <h1>Foods</h1>
      <div className="ui top attached menu stackable grid">
        <a
          className={`item ${page === 0 ? 'active' : ''}`}
          onClick={() => {
            setPage(0);
          }}
        >
          USDA Database
        </a>
        <a
          className={`item ${page === 1 ? 'active' : ''}`}
          onClick={() => {
            setPage(1);
          }}
        >
          Custom Foods
        </a>

        <div className="right menu">
          <div className="item">
            <div className="ui search">
              <div className="ui icon input fluid">
                <input
                  className="prompt foods-search-input"
                  type="text"
                  placeholder="Search foods..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <i className="search icon"></i>
              </div>
              <div className="results"></div>
            </div>
          </div>
          <div className="item">
            <NavLink
              to="/foods/add-food"
              exact
              className="fluid ui button primary"
            >
              Add Custom Food
            </NavLink>
          </div>
        </div>
      </div>
      <div className="ui bottom attached segment foods-list-wrapper">
        {page === 0 ? (
          <UsdaFoodList meal={meal} />
        ) : (
          <CustomFoodList meal={meal} />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    usdaFoods: state.usdaFoods,
    searchQuery: state.searchQuery,
  };
};

export default connect(mapStateToProps, {
  fetchUsdaFoods,
  selectFood,
  setSearchQuery,
})(Foods);
