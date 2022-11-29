import React from 'react';
import {
  Datagrid,
  DateField,
  List,
  ReferenceField,
  TextField,
  DateInput,
  Edit,
  ReferenceInput,
  SimpleForm,
  TextInput,
  Create,
} from 'react-admin';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';

const Separator = () => <Box pt="1em" />;

export const FoodHasEatingMomentList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField
        source="eating_moment_id"
        reference="eating_moment"
      />
      <ReferenceField source="food_id" reference="food" />
      <DateField source="updated_at" />
      <DateField source="created_at" />
    </Datagrid>
  </List>
);

export const FoodHasEatingMomentEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput
        source="eating_moment_id"
        reference="eating_moments"
      />
      <ReferenceInput source="food_id" reference="food" />
    </SimpleForm>
  </Edit>
);
export const FoodHasEatingMomentCreate = () => (
  <Create>
    <SimpleForm sx={{ maxWidth: 600 }}>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <ReferenceInput
        source="eating_moment_id"
        reference="eating_moments"
      />
     </Box>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <ReferenceInput source="food_id" reference="food"fullWidth />
     </Box>
    </Box>
    </SimpleForm>
  </Create>
);
