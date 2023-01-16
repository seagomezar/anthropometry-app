import * as React from 'react';
import { useAuthenticated } from 'react-admin';
import { Card, CardContent, CardHeader, Box } from '@mui/material';
import { Chart } from 'chart.js/auto';
import Demo from './Scheduler/Scheduler';

const Dashboard = () => {
  useAuthenticated();
  return (
    <Box>
      <Card>
        <CardHeader title="Welcome to the administration" />
        <CardContent>
          <Demo />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
