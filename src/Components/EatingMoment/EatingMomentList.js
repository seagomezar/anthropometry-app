import React from "react";
import {
  Datagrid,
  DateField,
  List,
  TextField,
  EditButton,
  DeleteButton,
  TextInput,
  SimpleList,
} from "react-admin";
import { useMediaQuery } from "@mui/material";

const EatingMomentFilters = [
  <TextInput label="Search" source="name@_like" alwaysOn />,
];

export const EatingMomentList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List filters={EatingMomentFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name + " " + record.lastname}
        />
      ) : (
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
   )}
   </List>
 );
};

