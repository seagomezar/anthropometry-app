import React from "react";
import {
  TextInput,
  SimpleList,
  Datagrid,
  DateField,
  List,
  TextField,
  EditButton,
  DeleteButton,
} from "react-admin";
import { useMediaQuery } from "@mui/material";

const FoodCategoryFilters = [
  <TextInput label="Search" source="name@_like" alwaysOn />,
];

export const FoodCategoryList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List filters={FoodCategoryFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.firstname + " " + record.lastname}
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
