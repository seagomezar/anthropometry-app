import React from 'react';
import {
  Datagrid,
  DateField,
  List,
  NumberField,
  TextField,
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
  useTranslate,
  Create,
  Show,
  SimpleShowLayout,
} from 'react-admin';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const FoodList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <NumberField source="calories" />
      <NumberField source="chos" />
      <TextField source="description" />
      <NumberField source="fat" />
      <TextField source="measure_unit" />
      <NumberField source="protein" />
      <NumberField source="quantity" />
      <DateField source="updated_at" />
      <DateField source="created_at" />
    </Datagrid>
  </List>
);

export const FoodEdit = () => (
  <Edit>
    <SimpleForm sx={{ maxWidth: 600 }}>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <NumberInput source="calories" fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <NumberInput source="chos" fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="description" fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <NumberInput source="fat" fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="measure_unit" fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <NumberInput source="protein" fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <NumberInput source="quantity" fullWidth />
        </Box>
      </Box>
    </SimpleForm>
  </Edit>
);
export const FoodCreate = () => (
  <Create>
    <SimpleForm sx={{ maxWidth: 600 }}>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <NumberInput source="calories" fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <NumberInput source="chos" fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="description" fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <NumberInput source="fat" fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="measure_unit" fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <NumberInput source="protein" fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <NumberInput source="quantity" fullWidth />
        </Box>
      </Box>
    </SimpleForm>
  </Create>
);

export const FoodShow = () => {
  const translate = useTranslate();
  return (
    <Show>
      <SimpleShowLayout sx={{ maxWidth: 500 }}>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.food.fields.calories')}
            </Typography>
            <NumberField source="calories" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.food.fields.chos')}
            </Typography>
            <NumberField source="chos" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.food.fields.description')}
            </Typography>
            <TextField source="description" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.food.fields.fat')}
            </Typography>
            <NumberField source="fat" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.food.fields.measure_unit')}
            </Typography>
            <TextField source="measure_unit" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.food.fields.protein')}
            </Typography>
            <NumberField source="protein" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.food.fields.quantity')}
            </Typography>
            <NumberField source="quantity" fullWidth />
          </Box>
        </Box>
      </SimpleShowLayout>
    </Show>
  );
};
