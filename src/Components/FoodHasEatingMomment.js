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
  useTranslate,
  Create,
  Show,
  SimpleShowLayout,
} from 'react-admin';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';

const Separator = () => <Box pt="1em" />;

export const FoodHasEatingMomentList = () => (
  <List>
    <Datagrid rowClick="show">
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
   <SimpleForm sx={{ maxWidth: 600 }}>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <ReferenceInput
        source="eating_moment_id"
        reference="eating_moment"
      />
     </Box>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <ReferenceInput source="food_id" reference="food"fullWidth />
     </Box>
    </Box>
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
        reference="eating_moment"
      />
     </Box>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <ReferenceInput source="food_id" reference="food"fullWidth />
     </Box>
    </Box>
    </SimpleForm>
  </Create>
);

export const FoodHasEatingMomentShow = () => {
  const translate = useTranslate();
  return (
 <Show>
  <SimpleShowLayout sx={{ maxWidth: 500 }}>
  <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <Typography variant="h6" gutterBottom>
              {translate('resources.food_has_eating_moment.fields.eating_moment_id')}
            </Typography>
     <ReferenceField
        source="eating_moment_id"
        reference="eating_moment"
      />
     </Box>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <Typography variant="h6" gutterBottom>
              {translate('resources.food_has_eating_moment.fields.food_id')}
            </Typography>
      <ReferenceField source="food_id" reference="food"fullWidth />
     </Box>
    </Box>
   </SimpleShowLayout>
 </Show>
 );
};