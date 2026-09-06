import React from 'react';
import { useRecordContext } from 'react-admin';
import PropTypes from 'prop-types';
import './TimeField.css';

export const TimeField = ({
  source,
  locales = 'en-US',
  options = { hour: '2-digit', minute: '2-digit' },
}) => {
  const record = useRecordContext();

  if (record && record[source]) {
    const time = new Date(record[source]);
    const formattedTime = time.toLocaleTimeString(locales, options);

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
  locales: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  options: PropTypes.object,
};