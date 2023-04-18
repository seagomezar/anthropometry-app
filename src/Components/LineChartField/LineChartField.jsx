import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  useRecordContext,
  useGetManyReference,
  useTranslate,
} from 'react-admin';
import { MenuItem, Select, Card, CardContent } from '@mui/material';
import LineChart from '../LineChart/LineChart';

const LineChartField = ({ source }) => {
  const options = useRef([
    'creatinine',
    'dm_elbow',
    'dm_knee',
    'dm_wrist',
    'height',
    'plg_abdominal',
    'plg_armpit',
    'plg_calf',
    'plg_chest',
    'plg_subscapular',
    'plg_suprailiac',
    'plg_supraspinal',
    'plg_thigh',
    'plg_triceps',
    'prm_arm',
    'prm_calf',
    'prm_chest',
    'prm_hip',
    'prm_thigh',
    'prm_waist',
    't3_t4',
    'triglycerides',
    'uric_acid',
    'weight',
    'x',
    'y',
  ]);
  const record = useRecordContext();
  const translate = useTranslate();
  const [selectedOption, setSelectedOption] = useState('weight');
  const [dataX, setX] = useState([]);
  const [dataY, setY] = useState([]);
  const { data } = useGetManyReference('measurement', {
    target: 'user_id',
    id: record.id,
  });

  useEffect(() => {
    createData('weight');
    // eslint-disable-next-line
  }, [data]);

  const createData = (option) => {
    if (data) {
      setSelectedOption(option);
      const sortedData = data.sort((a, b) => parseInt(a.control) - parseInt(b.control));
      setX(sortedData.map((e) => e.evaluation_date));
      setY(sortedData.map((e) => e[option]));
    }
  };

  return (
    <Card sx={{ maxWidth: '100%' }}>
      <Select
        variant="outlined"
        aria-label="outlined button group"
        size="small"
        onChange={(e) => {
          createData(e.target.value);
        }}
        value={selectedOption}
      >
        {options.current.map((o) => (
          <MenuItem value={o} key={o}>
            {translate('resources.measurement.fields.' + o)}
          </MenuItem>
        ))}
      </Select>
      <CardContent>
        <LineChart
          title={selectedOption}
          x={dataX}
          y={dataY}
          translationSource="resources.measurement.fields."
        />
      </CardContent>
    </Card>
  );
};

LineChartField.propTypes = {
  source: PropTypes.string,
};

export default LineChartField;