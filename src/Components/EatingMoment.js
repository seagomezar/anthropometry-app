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

export const EatingMomentList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <DateField source="created_at" />
      <TextField source="name" />
      <TextField source="time" />
      <DateField source="updated_at" />
      <DateField source="created_at" />
    </Datagrid>
  </List>
);

export const EatingMomentEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="time" />
    </SimpleForm>
  </Edit>
);

export const EatingMomentCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="time" />
    </SimpleForm>
  </Create>
);
