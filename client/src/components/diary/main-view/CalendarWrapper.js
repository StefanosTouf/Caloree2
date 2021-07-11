import React, { useEffect } from 'react';
import Calendar from 'react-calendar';

import { connect } from 'react-redux';

import { setDate } from '../../../actions/index';

import './Calendar.css';

const CalendarWrapper = ({ setDate, date }) => {
  useEffect(() => {
    if (!date) {
      const nowDate = new Date();
      const shortDate =
        nowDate.getFullYear() +
        '-' +
        ('0' + (nowDate.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + nowDate.getDate()).slice(-2);

      setDate(shortDate);
    }
  }, []);

  return (
    <div className="calendar-wrapper">
      <input
        type="date"
        id="start"
        name="trip-start"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
        }}
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
