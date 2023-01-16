import React from 'react';
import {
  Datagrid,
  ReferenceField,
  TextField,
  useTranslate,
  Show,
  SimpleShowLayout,
  ReferenceManyField,
  CreateButton,
} from 'react-admin';
import { Box, Typography } from '@mui/material';
import { Empty } from '../Empty';
import { TimeField } from '../TimeField';
import { Separator } from '../Separator';
import { PlanSummaryField } from '../PlanSummary';

export const PlanShow = () => {
  const translate = useTranslate();
  return (
    <Show>
      <SimpleShowLayout>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.plan.fields.comments')}
            </Typography>
            <TextField source="comments" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.plan.fields.goal_id')}
            </Typography>
            <ReferenceField
              source="goal_id"
              reference="goal"
              fullWidth
            />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.plan.fields.user_id')}
            </Typography>
            <ReferenceField
              source="user_id"
              reference="user"
              fullWidth
            />
          </Box>
        </Box>
        <Separator />
        <ReferenceManyField
          label={translate('resources.plan.fields.prescribed_food')}
          reference="prescribed_food"
          target="plan_id"
        >
          <Datagrid empty={<Empty />} rowClick="edit">
            <TextField source="prescribed_quantity" />
            <ReferenceField source="food_id" reference="food" />
            <TimeField source="eating_moment_time" />
            <ReferenceField
              source="eating_moment_name"
              reference="eating_moment"
            />
          </Datagrid>
          <CreateButton
            label={translate('resources.plan.add_to_plan')}
          />
        </ReferenceManyField>
        <PlanSummaryField source="id" label="Plan Summary" />
      </SimpleShowLayout>
    </Show>
  );
};
