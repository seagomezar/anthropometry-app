import * as React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import { useDataProvider, useGetList, useGetMany } from 'react-admin';
import {Chart} from 'chart.js/auto';

const Dashboard = () => {

  const dataProvider = useDataProvider();
  const { data, isLoading, error } = useGetList('user');

  React.useEffect(()=>{
    const ctx = document.getElementById('myChart');

  const graph = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  return ()=>{
    graph.destroy();
  }
  }, [])

  return (
    <Card>
      <CardHeader title="Welcome to the administration" />
      <CardContent>
        <canvas id="myChart"></canvas>

      </CardContent>
    </Card>
  );
};

export default Dashboard;
