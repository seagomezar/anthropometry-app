import React from 'react';
import {
  Datagrid,
  DateField,
  List,
  NumberField,
  TextField,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const FoodList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <NumberField source="calories" />
      <NumberField source="chos" />
      <TextField source="description" />
      <NumberField source="fat" />
      <TextField source="measure_unit" />
      <NumberField source="protein" />
      <NumberField source="quantity" />
      <DateField source="updated_at" />
      <DateField source="created_at" />
      <EditButton />
          <DeleteButton />
    </Datagrid>
  </List>
);
