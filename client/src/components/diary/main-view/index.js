import React from 'react';

import GeneralInfo from './GeneralInfo';
import TodaysDiary from './TodaysDiary';
import CalendarWrapper from './CalendarWrapper';
import DetailedInfo from '../detailed-info';
import ResetLogView from './ResetLogView';

import './main-view.css';

const MainView = () => {
  return (
    <div className="ui grid" id="main-view">
      <div className="four wide column side computer only">
        <div id="general-row">
          <GeneralInfo />
        </div>
        <div className="center">
          <ResetLogView />
        </div>
      </div>
      <div className="twelve wide computer sixteen wide tablet column">
        <TodaysDiary />
      </div>
      <div className="sixteen wide column tablet only mobile only">
        <ResetLogView />
      </div>
      <div className="sixteen wide column tablet only mobile only">
        <GeneralInfo />
      </div>

      <div className="ui sixteen wide column">
        <DetailedInfo />
      </div>
    </div>
  );
};

export default MainView;
