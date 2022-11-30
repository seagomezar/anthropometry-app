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


const Separator = () => <Box pt="1em" />;

export const FoodHasFoodCategoryList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField
        source="food_category_id"
        reference="food_category"
      />
      <ReferenceField source="food_id" reference="food" />
      <DateField source="updated_at" />
      <DateField source="created_at" />
    </Datagrid>
  </List>
);

export const FoodHasFoodcategoryEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput
        source="food_category_id"
        reference="food_categories"
      />
      <ReferenceInput source="food_id" reference="food" />
    </SimpleForm>
  </Edit>
);
export const FoodHasFoodcategoryCreate = () => (
  <Create>
    <SimpleForm sx={{ maxWidth: 600 }}>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <ReferenceInput source="food_category_id"reference="food_categories"fullWidth/>
      </Box>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <ReferenceInput source="food_id" reference="food"fullWidth />
      </Box>
      </Box>
    </SimpleForm>
  </Create>
);
