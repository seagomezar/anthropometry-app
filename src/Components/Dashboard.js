import * as React from 'react';
import { useAuthenticated, useTranslate } from 'react-admin';
import { Card, CardContent, CardHeader, Box } from '@mui/material';
import NutritionistScheduler from './Scheduler/Scheduler';

const Dashboard = () => {
  const translate = useTranslate();
  useAuthenticated();
  return (
    <Box>
      <Card>
        <CardHeader title={translate('myroot.welcomeScheduler')} />
        <CardContent>
          <NutritionistScheduler />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
