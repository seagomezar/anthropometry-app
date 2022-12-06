import React from 'react';
import {
  Datagrid,
  DateField,
  List,
  ReferenceField,
  TextField,
  Edit,
  ReferenceInput,
  SimpleForm,
  TextInput,
  useTranslate,
  Create,
  Show,
  SimpleShowLayout,
  EditButton,
  DeleteButton,
  ReferenceManyField,
  NumberField,
  CreateButton,
} from 'react-admin';
import { Box, Typography } from '@mui/material';
import { Empty } from './Empty';
import { TimeField } from './TimeField';
import { Separator } from './Separator';
import { PlanSummaryField } from './PlanSummary';

export const PlanList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="comments" />
      <ReferenceField source="goal_id" reference="goal" />
      <ReferenceField source="user_id" reference="user" />
      <DateField source="created_at" />
      <DateField source="updated_at" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const PlanEdit = () => (
  <Edit>
    <SimpleForm sx={{ maxWidth: 600 }}>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="comments" fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <ReferenceInput
            source="goal_id"
            reference="goal"
            fullWidth
          />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <ReferenceInput
            source="user_id"
            reference="user"
            fullWidth
          />
        </Box>
      </Box>
    </SimpleForm>
  </Edit>
);
export const PlanCreate = () => (
  <Create>
    <SimpleForm sx={{ maxWidth: 600 }}>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="comments" fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <ReferenceInput
            source="goal_id"
            reference="goal"
            fullWidth
          />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <ReferenceInput
            source="user_id"
            reference="user"
            fullWidth
          />
        </Box>
      </Box>
    </SimpleForm>
  </Create>
);

export const PlanShow = () => {
  const translate = useTranslate();
  return (
    <Show>
      <SimpleShowLayout sx={{ maxWidth: 500 }}>
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
