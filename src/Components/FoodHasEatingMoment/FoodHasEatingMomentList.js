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

export const FoodHasEatingMomentList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <ReferenceField
        source="eating_moment_id"
        reference="eating_moment"
      />
      <ReferenceField source="food_id" reference="food" />
      <DateField source="updated_at" />
      <DateField source="created_at" />
      <EditButton />
          <DeleteButton />
    </Datagrid>
  </List>
);