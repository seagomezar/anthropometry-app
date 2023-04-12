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
          secondaryText={(record) => `Control # ${record.control} - ${record.weight} Kg, ${record.height} cms`}
          tertiaryText={(record) => (
            <DateField record={record} source="created_at" />
          )}
          rowStyle={(record) => ({backgroundColor: "lightblue"})}
        />
      ) : (
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name"/>
      <TextField source="document" />
      <TextField source="birth_date" />
      <TextField source="email" />
      <TextField source="phone" />
      <TextField source="club" />
      <TextField source="position" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  )}
  </List>
);
};
