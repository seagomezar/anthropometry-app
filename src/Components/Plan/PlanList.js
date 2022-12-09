import React from 'react';
import {
  Datagrid,
  DateField,
  List,
  ReferenceField,
  TextField,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const PlanList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="comments" />
      <ReferenceField source="goal_id" reference="goal" />
      <ReferenceField source="user_id" reference="user" />
      <DateField source="created_at" />
      <DateField source="updated_at" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);