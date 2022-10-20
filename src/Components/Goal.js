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
      <DateField source="created_at" />
      <TextField source="name" />
      <DateField source="updated_at" />
    </Datagrid>
  </List>
);

export const GoalEdit = () => (
  <Edit>
    <SimpleForm>
      <DateInput source="created_at" />
      <TextInput source="name" />
      <DateInput source="updated_at" />
    </SimpleForm>
  </Edit>
);
export const GoalCreate = () => (
  <Create>
    <SimpleForm>
      <DateInput source="created_at" />
      <TextInput source="name" />
      <DateInput source="updated_at" />
    </SimpleForm>
  </Create>
);
