import React from 'react';
import {
  Datagrid,
  DateField,
  EmailField,
  List,
  TextField,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const NutritionistList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="address" />
      <EmailField source="email" />
      <TextField source="firstname" />
      <TextField source="lastname" />
      <TextField source="phone" />
      <DateField source="updated_at" />
      <DateField source="created_at" />
      <EditButton />
          <DeleteButton />
    </Datagrid>
  </List>
);
