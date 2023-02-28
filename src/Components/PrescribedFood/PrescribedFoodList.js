import React from "react";
import {
  TextInput,
  SimpleList,
  Datagrid,
  DateField,
  List,
  TextField,
  ReferenceField,
  EditButton,
  DeleteButton,
} from "react-admin";
import { TimeField } from "../TimeField";
import { useMediaQuery } from "@mui/material";
const PrescribedFoodFilters = [
  <TextInput label="Search" source="food_id" alwaysOn />,
];

export const PrescribedFoodList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List filters={PrescribedFoodFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.food_id + " " + record.lastname}
        />
      ) : (
    <Datagrid rowClick="show">
      <TextField source="id" />
      <ReferenceField source="plan_id" reference="plan" />
      <ReferenceField source="food_id" reference="food" />
      <TimeField source="eating_moment_time" />
      <ReferenceField source="eating_moment_name" reference="eating_moment" />
      <TextField source="prescribed_quantity" />
      <DateField source="updated_at" />
      <DateField source="created_at" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
 )}
 </List>
);
};
