import React from "react";
import {
  TextInput,
  SimpleList,
  Datagrid,
  DateField,
  EmailField,
  List,
  TextField,
  EditButton,
  DeleteButton,
} from "react-admin";
import { useMediaQuery } from "@mui/material";

const nutricionistaFilters = [
  <TextInput label="Search" source="firstname@_like" alwaysOn />,
];

export const NutritionistList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List filters={nutricionistaFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.firstname + " " + record.lastname}
        />
      ) : (
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
  )}
  </List>
);
};
