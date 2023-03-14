import React from "react";
import {
  Datagrid,
  TextInput,
  SimpleList,
  List,
  TextField,
  EditButton,
  DeleteButton,
} from "react-admin";
import { useMediaQuery } from "@mui/material";

const AthleteFilters = [
  <TextInput label="Search" source="name@_like" alwaysOn />,
];

export const AthleteList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List filters={AthleteFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name + " " + record.lastname}
        />
      ) : (
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  )}
  </List>
);
};
