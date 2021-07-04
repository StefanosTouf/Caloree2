import React, { useEffect } from 'react';
import Calendar from 'react-calendar';

import { connect } from 'react-redux';

import { setDate } from '../../../actions/index';

import './Calendar.css';

const CalendarWrapper = ({ setDate, date }) => {
  useEffect(() => {
    if (!date) {
      const date = new Date();
      const shortDate = date.toISOString().substring(0, 10);
      setDate(shortDate);
    }
  }, []);

  return (
    <div className="calendar-wrapper">
      <Calendar
        className="react-calendars"
        onChange={(newDate) => {
          const correctDate = new Date(newDate.setDate(newDate.getDate() + 1));
          const shortDate = correctDate.toISOString().substring(0, 10);
          if (date !== shortDate) {
            setDate(shortDate);
          }
        }}
        value={date ? new Date(`${date}T00:00:00`) : new Date()}
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
