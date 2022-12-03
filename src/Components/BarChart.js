import * as React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import { useDataProvider, useGetList, useGetMany } from 'react-admin';
import { Chart } from 'chart.js/auto';

const BarChart = ({ labels, data, title }) => {
  React.useEffect(() => {
    const ctx = document.getElementById('myChart');

    const graph = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: title,
            data,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return () => {
      graph.destroy();
    };
  }, []);

  return (
    <Card>
      <CardHeader title="Welcome to the administration" />
      <CardContent>
        <canvas id="myChart"></canvas>
      </CardContent>
    </Card>
  );
};

export default BarChart;
