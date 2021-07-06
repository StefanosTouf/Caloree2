import React, { useEffect } from 'react';
import Calendar from 'react-calendar';

import { connect } from 'react-redux';

import { setDate } from '../../../actions/index';

import './Calendar.css';

const CalendarWrapper = ({ setDate, date }) => {
  useEffect(() => {
    if (!date) {
      setDate(new Date());
    }
  }, []);

  return (
    <div className="calendar-wrapper">
      <Calendar
        className="react-calendars"
        onChange={(newDate) => {
          if (date !== newDate) {
            setDate(newDate);
          }
        }}
        value={date ? date : new Date()}
        maxDetail="month"
        minDetail="year"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    date: state.date,
  };
};

export default connect(mapStateToProps, { setDate })(CalendarWrapper);
