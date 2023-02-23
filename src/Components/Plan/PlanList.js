import React from "react";
import {
  TextInput,
  List,
  SimpleList,
  ReferenceField,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
} from "react-admin";
import { useMediaQuery } from "@mui/material";

const userFilters = [
  <TextInput label="Search" source="comments@_like" alwaysOn />,
];

export const PlanList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List filters={userFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.comments + " " + record.lastname}
        />
        ) : (
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="comments" />
      <ReferenceField source="goal_id" reference="goal" />
      <ReferenceField source="user_id" reference="user" />
      <DateField source="created_at" />
      <DateField source="updated_at" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
    )}
    </List>
  );
};
