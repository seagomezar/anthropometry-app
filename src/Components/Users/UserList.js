import React from "react";
import {
  TextInput,
  List,
  SimpleList,
  ReferenceField,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  EditButton,
  DeleteButton,
} from "react-admin";
import { useMediaQuery } from "@mui/material";

const userFilters = [
  <TextInput label="Search" source="firstname@_like" alwaysOn />,
];

export const UserList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List filters={userFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.firstname + " " + record.lastname}
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField source="id" />
          <TextField source="firstname" />
          <TextField source="lastname" />
          <EmailField source="email" />
          <TextField source="phone" />
          <TextField source="address" />
          <TextField source="birthday" />
          <TextField source="gender" />
          <ReferenceField source="nutritionist_id" reference="nutritionist" />
          <DateField source="created_at" />
          <DateField source="updated_at" />
          <EditButton />
          <DeleteButton />
        </Datagrid>
      )}
    </List>
  );
};
