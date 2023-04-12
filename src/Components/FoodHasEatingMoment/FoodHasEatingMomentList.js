import React from "react";
import {
  Datagrid,
  DateField,
  List,
  ReferenceField,
  TextField,
  EditButton,
  DeleteButton,
  TextInput,
  SimpleList,
} from "react-admin";
import { useMediaQuery } from "@mui/material";

const FoodHasEatingMomentFilters = [
  <TextInput label="Search" source="food_id" alwaysOn />,
];

export const  FoodHasEatingMomentList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List filters={FoodHasEatingMomentFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => <ReferenceField record={record} source="food_id" reference="food" /> }
          secondaryText={(record) =>  <ReferenceField record={record} source="eating_moment_id" reference="eating_moment"/> }
          tertiaryText={(record) => (
            <DateField record={record} source="created_at" />
          )}
          rowStyle={(record) => ({backgroundColor: "pink"})}
        />
      ) : (
    <Datagrid rowClick="show">
      <TextField source="id" />
      <ReferenceField source="eating_moment_id" reference="eating_moment" />
      <ReferenceField source="food_id" reference="food" />
      <DateField source="updated_at" />
      <DateField source="created_at" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  )}
  </List>
);
};