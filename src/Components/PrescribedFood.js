import React from 'react';
import {
  Datagrid,
  DateField,
  List,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  ReferenceField,
  ReferenceInput,
  NumberInput,
  NumberField,
  useTranslate,
  Show,
  SimpleShowLayout,
  EditButton,
  DeleteButton,
  TimeInput,
  AutocompleteInput,
} from 'react-admin';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TimeField } from './TimeField';

export const PrescribedFoodList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <ReferenceField source="plan_id" reference="plan" />
      <ReferenceField source="food_id" reference="food" />
      <TimeField source="eating_moment_time" />
      <ReferenceField
        source="eating_moment_name"
        reference="eating_moment"
      />
      <TextField source="prescribed_quantity" />
      <DateField source="updated_at" />
      <DateField source="created_at" />
      <EditButton />
          <DeleteButton />
    </Datagrid>
  </List>
);

export const PrescribedFoodEdit = () => (
  <Edit>
    <SimpleForm sx={{ maxWidth: 600 }}>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <ReferenceInput
            source="plan_id"
            reference="plan"
            fullWidth
          />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <ReferenceInput
            source="food_id"
            reference="food"
            fullWidth
          />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <TimeInput source="eating_moment_time" fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <ReferenceInput
            source="eating_moment_name"
            reference="eating_moment"
            fullWidth
          />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="prescribed_quantity" fullWidth />
        </Box>
      </Box>
    </SimpleForm>
  </Edit>
);

const filterToQuery = (searchText) => ({
  description: `%${searchText}%`,
});
export const PrescribedFoodCreate = () => (
  <Create>
    <SimpleForm sx={{ maxWidth: 600 }}>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <ReferenceInput
            source="plan_id"
            reference="plan"
            fullWidth
          />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <ReferenceInput source="food_id" reference="food" fullWidth>
            <AutocompleteInput filterToQuery={filterToQuery} />
          </ReferenceInput>
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <TimeInput source="eating_moment_time" fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <ReferenceInput
            source="eating_moment_name"
            reference="eating_moment"
            fullWidth
          />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <NumberInput source="prescribed_quantity" fullWidth />
        </Box>
      </Box>
    </SimpleForm>
  </Create>
);

export const PrescribedFoodShow = () => {
  const translate = useTranslate();
  return (
    <Show>
      <SimpleShowLayout sx={{ maxWidth: 500 }}>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.prescribed_food.fields.plan_id')}
            </Typography>
            <ReferenceField
              source="plan_id"
              reference="plan"
              fullWidth
            />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.prescribed_food.fields.food_id')}
            </Typography>
            <ReferenceField
              source="food_id"
              reference="food"
              fullWidth
            />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate(
                'resources.prescribed_food.fields.eating_moment_time'
              )}
            </Typography>
            <TimeField source="eating_moment_time" />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate(
                'resources.prescribed_food.fields.eating_moment_name'
              )}
            </Typography>
            <ReferenceField
              source="eating_moment_name"
              reference="eating_moment"
              fullWidth
            />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate(
                'resources.prescribed_food.fields.prescribed_quantity'
              )}
            </Typography>
            <NumberField source="prescribed_quantity" fullWidth />
          </Box>
        </Box>
      </SimpleShowLayout>
    </Show>
  );
};
