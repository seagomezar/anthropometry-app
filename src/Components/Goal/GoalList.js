import React from "react";
import {
  Datagrid,
  TextInput,
  SimpleList,
  DateField,
  List,
  TextField,
  EditButton,
  DeleteButton,
} from "react-admin";
import { useMediaQuery } from "@mui/material";

const goalFilters = [
  <TextInput label="Search" source="name@_like" alwaysOn />,
];

export const GoalList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List filters={goalFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name + " " + record.lastname}
        />
      ) : (
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
      <DateField source="updated_at" />
      <DateField source="created_at" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  )}
  </List>
);
};
