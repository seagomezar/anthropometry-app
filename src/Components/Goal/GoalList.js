import React from 'react';
import {
  Datagrid,
  DateField,
  List,
  TextField,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const GoalList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
      <DateField source="updated_at" />
      <DateField source="created_at" />
      <EditButton />
          <DeleteButton />
    </Datagrid>
  </List>
);
