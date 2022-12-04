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
  EditButton,
  DeleteButton,
} from 'react-admin';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const Separator = () => <Box pt="1em" />;

export const FoodHasFoodCategoryList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <ReferenceField
        source="food_category_id"
        reference="food_category"
      />
      <ReferenceField source="food_id" reference="food" />
      <DateField source="updated_at" />
      <DateField source="created_at" />
      <EditButton />
          <DeleteButton />
    </Datagrid>
  </List>
);

export const FoodHasFoodcategoryEdit = () => (
  <Edit>
    <SimpleForm sx={{ maxWidth: 600 }}>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <ReferenceInput source="food_category_id"reference="food_category"fullWidth/>
      </Box>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <ReferenceInput source="food_id" reference="food"fullWidth />
      </Box>
      </Box>
    </SimpleForm>
  </Edit>
);
export const FoodHasFoodCategoryCreate = () => (
  <Create>
    <SimpleForm sx={{ maxWidth: 600 }}>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <ReferenceInput source="food_category_id"reference="food_category"fullWidth/>
      </Box>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <ReferenceInput source="food_id" reference="food"fullWidth />
      </Box>
      </Box>
    </SimpleForm>
  </Create>
);

export const FoodHasFoodCategoryShow = () => {
  const translate = useTranslate();
  return (
 <Show>
   <SimpleShowLayout sx={{ maxWidth: 500 }}>
   <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <Typography variant="h6" gutterBottom>
              {translate('resources.food_has_food_category.fields.food_category_id')}
            </Typography>
     <ReferenceField source="food_category_id"reference="food_category"fullWidth/>
      </Box>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <Typography variant="h6" gutterBottom>
              {translate('resources.food_has_food_category.fields.food_id')}
            </Typography>
      <ReferenceField source="food_id" reference="food"fullWidth />
      </Box>
      </Box>
   </SimpleShowLayout>
 </Show>
  );
};