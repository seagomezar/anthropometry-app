import React from "react";
import {
  List,
  SimpleList,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  NumberField,
  TextInput,
  ReferenceField,
} from "react-admin";
import { useMediaQuery } from "@mui/material";

const physicalTestFilters = [
  <TextInput  label="Search" source="position@_like" alwaysOn/>,
];

export const PsychologicalTestList = () => {
  return (
    <List filters={physicalTestFilters}>
        <Datagrid rowClick="show">
          <ReferenceField source="athlete_id" reference="athlete" />
          <NumberField source="min_5_no_pert" />
          <NumberField source="min_5_with_pert" />
          <EditButton />
          <DeleteButton />
        </Datagrid>
    </List>
  );
};