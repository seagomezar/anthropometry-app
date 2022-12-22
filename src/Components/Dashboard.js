import * as React from 'react';
import { Card, CardContent, CardHeader, Container, Box  } from '@mui/material';
import { Chart } from 'chart.js/auto';

const Dashboard = () => {
  React.useEffect(() => {
    const ctx = document.getElementById('myChart');

    const graph = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Red',
          'Blue',
          'Yellow',
          'Green',
          'Purple',
          'Orange',
        ],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
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
	<Box  maxWidth="sm">
		<Card>
      <CardHeader title="Welcome to the administration" />
      <CardContent>
        <canvas id="myChart"></canvas>
      </CardContent>
    </Card>
	</Box >
    
  );
};

export default Dashboard;
