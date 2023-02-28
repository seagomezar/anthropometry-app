import React from "react";
import {
  TextInput,
  SimpleList,
  Datagrid,
  DateField,
  List,
  NumberField,
  TextField,
  EditButton,
  DeleteButton,
} from "react-admin";
import { useMediaQuery } from "@mui/material";

const FoodFilters = [
  <TextInput label="Search" source="description@_like" alwaysOn />,
];

export const FoodList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List filters={FoodFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.description+ " " + record.lastname}
        />
      ) : (
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
    )}
  </List>
);
};
