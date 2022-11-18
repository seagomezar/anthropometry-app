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
    <SimpleForm>
      <ReferenceInput
        source="food_category_id"
        reference="food_categories"
      />
      <ReferenceInput source="food_id" reference="food" />
    </SimpleForm>
  </Create>
);
