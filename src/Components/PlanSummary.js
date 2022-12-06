import React from 'react';
import { useRecordContext, useGetManyReference } from 'react-admin';
import { Card, CardContent } from '@mui/material';

export const PlanSummaryField = ({ source }) => {
  const record = useRecordContext();
  const { data } = useGetManyReference('prescribed_food', {
    target: 'plan_id',
    id: record.id,
  });

  React.useEffect(() => {
    console.log('DATA', data);
  }, [data]);

  return (
    <Card>
      <CardContent></CardContent>
    </Card>
  );
};
