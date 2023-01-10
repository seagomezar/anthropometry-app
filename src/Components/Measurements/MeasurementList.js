import React from "react";
import {
  Datagrid,
  DateField,
  List,
  NumberField,
  ReferenceField,
  TextField,
  ReferenceInput,
  EditButton,
  DeleteButton,
  SimpleList,
} from "react-admin";
import { useMediaQuery } from "@mui/material";

const measurementFilters = [
  <ReferenceInput source="user_id" label="User" reference="user" />,
];

export const MeasurementList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List filters={measurementFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => (
            <ReferenceField source="user_id" record={record} reference="user" />
          )}
          secondaryText={(record) => `Control # ${record.control}`}
          tertiaryText={(record) => (
            <DateField record={record} source="created_at" />
          )}
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField source="id" />
          <ReferenceField source="user_id" reference="user" />
          <ReferenceField
            source="referenced_somatotype_id"
            reference="referenced_somatotype"
          />
          <ReferenceField source="nutritionist_id" reference="nutritionist" />
          <NumberField source="control" />
          <NumberField source="height" />
          <NumberField source="weight" />
          <DateField source="evaluation_date" />
          <TextField source="notes" />
          <DateField source="created_at" />
          <DateField source="updated_at" />
          <EditButton />
          <DeleteButton />
        </Datagrid>
      )}
    </List>
  );
};
