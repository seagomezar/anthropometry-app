import * as React from 'react';
import { useGetManyReference, useTranslate } from 'react-admin';
import { MenuItem, Select, Card, CardContent } from '@mui/material';
import LineChart from '../LineChart';
import { generateResults } from '../../Providers/retultsProvider';

const ResultsChart = ({ user }) => {
  let options = [
    'endomorph',
    'mesomorph',
    'ectomorph',
    'resultX',
    'resultY',
    'imc',
    'iaks',
    'complexion',
    'raizPT',
    'conicIndex',
    'sumOfPlgs',
    'sumaPlieguesEndo',
    'endoFactor',
    'yhaszFatPercentage',
    'ponderalIndex',
    'faulknerFatPercentage',
    'parizcovaFatPercentage',
    'fatWeight',
    'freeFatWeight',
    'activeMass',
    'residualWeight',
    'desiredWeight',
    'desiredIMC',
    'desiredFat2MethodPercentage',
  ];
  const translate = useTranslate();
  const [selectedOption, setSelectedOption] = React.useState('imc');
  const [dataX, setX] = React.useState([]);
  const [dataY, setY] = React.useState([]);
  const { data } = useGetManyReference('measurement', {
    target: 'user_id',
    id: user.id,
  });

  React.useEffect(() => {
    createData('imc');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const createData = (option) => {
    console.log(option);
    if (data) {
      const sortedData = data.sort(function (a, b) {
        return parseInt(a.control) - parseInt(b.control);
      });
      const results = sortedData.map((d) =>
        generateResults(
          d,
          d.height,
          d.weight,
          user.gender === 'Femenino' ? false : true
        )
      );
      setSelectedOption(option);
      setX(sortedData.map((e) => e.evaluation_date));
      setY(results.map((e) => e[option]));
    }
  };

  return (
    <Card>
      <Select
        variant="outlined"
        aria-label="outlined button group"
        size="small"
        onChange={(e) => {
          createData(e.target.value);
        }}
        value={selectedOption}
      >
        {options.map((o) => {
          return (
            <MenuItem value={o} key={o}>
              {translate('resources.result.fields.' + o)}
            </MenuItem>
          );
        })}
      </Select>
      <CardContent>
        <LineChart
          title={selectedOption}
          x={dataX}
          y={dataY}
          translationSource="resources.result.fields."
        />
      </CardContent>
    </Card>
  );
};

export default ResultsChart;
