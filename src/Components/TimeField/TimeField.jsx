import React from 'react';
import { useRecordContext } from 'react-admin';
import PropTypes from 'prop-types';
import './TimeField.css';

export const TimeField = ({ source }) => {
  const record = useRecordContext();

  if (record) {
    const time = new Date(record[source]);
    const formattedTime = time.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <time dateTime={time.toISOString()} aria-label={formattedTime}>
        {formattedTime}
      </time>
    );
  } else {
    return (
      <span className="placeholder" aria-label="No time available">
        {record && record[source]}
      </span>
    );
  }
};

TimeField.propTypes = {
  source: PropTypes.string.isRequired,
};