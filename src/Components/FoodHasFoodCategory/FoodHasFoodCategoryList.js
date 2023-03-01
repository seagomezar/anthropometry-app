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

const FoodHasFoodCategoryFilters = [
  <TextInput label="Search" source="food_id" alwaysOn />,
];

export const  FoodHasFoodCategoryList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List filters={FoodHasFoodCategoryFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name + " " + record.lastname}
        />
      ) : (
    <Datagrid rowClick="show">
      <TextField source="id" />
      <ReferenceField source="food_category_id" reference="food_category" />
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
