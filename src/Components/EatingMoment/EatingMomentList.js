import React from "react";
import {
  Datagrid,
  DateField,
  List,
  TextField,
  EditButton,
  DeleteButton,
} from "react-admin";

export const EatingMomentList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <DateField source="created_at" />
      <TextField source="name" />
      <TextField source="time" />
      <DateField source="updated_at" />
      <DateField source="created_at" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
