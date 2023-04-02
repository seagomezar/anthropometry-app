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

export const PhysicalTestList = () => {
  return (
    <List filters={physicalTestFilters}>
        <Datagrid rowClick="show">
        <ReferenceField source="athlete_id" reference="athlete" />
          <TextField source="id" />
          <TextField source="position" />
          <NumberField source="weight" />
          <NumberField source="height" />
          <NumberField  source="wingspan" />
          <NumberField  source="five_mt" />
          <NumberField  source="ten_mt" />
          {/*<NumberField source="t_test_left" />
          <NumberField source="t_test_right" />*/}
          <NumberField source="cmj" />
          <NumberField source="legger" />
          <EditButton />
          <DeleteButton />
        </Datagrid>
    </List>
  );
};