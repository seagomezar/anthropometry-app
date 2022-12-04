import React from 'react';
import {
  Datagrid,
  DateField,
  List,
  TextField,
  DateInput,
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
} from 'react-admin';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Separator = () => <Box pt="1em" />;

export const PrescribedFoodList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <ReferenceField source="plan_id" reference="plan" />
      <ReferenceField source="food_id" reference="food" />
      <TextField source="eating_moment_time" />
      <TextField source="eating_moment_name" />
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
          <TextInput source="eating_moment_time" fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="eating_moment_name" fullWidth />
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
          <ReferenceInput
            source="food_id"
            reference="food"
            fullWidth
          />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="eating_moment_time" fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="eating_moment_name" fullWidth />
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

export const PrescribedFoodShow= () => {
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
              {translate('resources.prescribed_food.fields.eating_moment_time')}
            </Typography>
          <TextField source="eating_moment_time" fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <Typography variant="h6" gutterBottom>
              {translate('resources.prescribed_food.fields.eating_moment_name')}
            </Typography>
          <TextField source="eating_moment_name" fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <Typography variant="h6" gutterBottom>
              {translate('resources.prescribed_food.fields.prescribed_quantity')}
            </Typography>
          <NumberField source="prescribed_quantity" fullWidth />
        </Box>
      </Box>
    </SimpleShowLayout>
  </Show>
 );
};