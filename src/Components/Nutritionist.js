import React from 'react';
import {
  Datagrid,
  DateField,
  EmailField,
  List,
  TextField,
  DateInput,
  Edit,
  SimpleForm,
  TextInput,
  Create,
} from 'react-admin';

export const NutritionistList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="address" />
      <DateField source="created_at" />
      <EmailField source="email" />
      <TextField source="firstname" />
      <TextField source="lastname" />
      <TextField source="phone" />
      <DateField source="updated_at" />
    </Datagrid>
  </List>
);

export const NutritionistEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="address" />
      <DateInput source="created_at" />
      <TextInput source="email" />
      <TextInput source="firstname" />
      <TextInput source="lastname" />
      <TextInput source="phone" />
      <DateInput source="updated_at" />
    </SimpleForm>
  </Edit>
);
export const NutritionistCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="address" />
      <TextInput source="email" />
      <TextInput source="firstname" />
      <TextInput source="lastname" />
      <TextInput source="phone" />
    </SimpleForm>
  </Create>
);
