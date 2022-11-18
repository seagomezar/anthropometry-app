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
} from 'react-admin';

export const FoodCategoryList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <DateField source="updated_at" />
      <DateField source="created_at" />
    </Datagrid>
  </List>
);

export const FoodCategoryEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
);
export const FoodCategoryCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);
