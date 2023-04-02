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

const SkillTestFilters = [
  <TextInput label="Search" source="position@_like" alwaysOn />,
];

export const SkillTestList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List filters={SkillTestFilters}>
        <Datagrid rowClick="show">
          <ReferenceField source="athlete_id" reference="athlete" />
          <TextField source="id" />
          <NumberField source="cod_sin" />
          <NumberField source="cod_con_el" />
          <NumberField  source="diff_percentage" />
          <NumberField  source="d_der" />
          
          <TextField source="position" />
          <EditButton />
          <DeleteButton />
        </Datagrid></List>
      )}
