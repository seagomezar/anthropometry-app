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

export const GoalList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <DateField source="updated_at" />
      <DateField source="created_at" />
    </Datagrid>
  </List>
);

export const GoalEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <DateInput source="updated_at" />
      <DateInput source="created_at" />
    </SimpleForm>
  </Edit>
);
export const GoalCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <DateInput source="updated_at" />
      <DateInput source="created_at" />
    </SimpleForm>
  </Create>
);
