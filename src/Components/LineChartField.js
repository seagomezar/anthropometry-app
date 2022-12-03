import * as React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import {
  useRecordContext,
  useGetManyReference,
  useTranslate,
} from 'react-admin';
import { Chart } from 'chart.js/auto';
import { MenuItem, Select } from '@mui/material';

const LineChartField = ({ source }) => {
  let graph;
  let options = [
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
  ];
  const record = useRecordContext();
  const translate = useTranslate();
  const [selectedOption, setSelectedOption] =
    React.useState('weight');
  const [reset, setReset] = React.useState(true);
  const { data } = useGetManyReference('measurement', {
    target: 'user_id',
    id: record.id,
  });

  React.useEffect(() => {
    paintChart('weight');
    return () => {
      if (graph) {
        graph.destroy();
      }
    };
  }, [data]);

  const paintChart = (selectedOption) => {
    setReset(false);

    if (graph) {
      graph.destroy();
    }
    setReset(true);

    const ctx = document.getElementById('myCanvas');
    graph = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data?.map((e) => e.evaluation_date),
        datasets: [
          {
            label: translate(
              'resources.measurement.fields.' + selectedOption
            ),
            data: data?.map((e) => e[selectedOption]),
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    });
    setSelectedOption(selectedOption);
  };

  return (
    <Card>
      <Select
        variant="outlined"
        aria-label="outlined button group"
        size="small"
        onChange={(e) => {
          paintChart(e.target.value);
        }}
        value={selectedOption}
      >
        {options.map((o) => {
          return (
            <MenuItem value={o} key={o}>
              {translate('resources.measurement.fields.' + o)}
            </MenuItem>
          );
        })}
      </Select>
      <CardContent>
        {reset && <canvas id="myCanvas"></canvas>}
      </CardContent>
    </Card>
  );
};

export default LineChartField;
