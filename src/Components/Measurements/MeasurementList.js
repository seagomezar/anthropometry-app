import React from "react";
import {
  Datagrid,
  DateField,
  List,
  NumberField,
  ReferenceField,
  TextField,
  EditButton,
  DeleteButton,
  SimpleList,
  TextInput
} from "react-admin";
import { useMediaQuery } from "@mui/material";

const measurementFilters = [
  <TextInput  label="Search" source="notes@_like" alwaysOn />,
];

export const MeasurementList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List filters={measurementFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => (
            <ReferenceField source="user_id" reference="user" link={false}/>
          )}
          secondaryText={(record) => `Control # ${record.control} - ${record.weight} Kg, ${record.height} cms`}
          tertiaryText={(record) => (
            <DateField record={record} source="created_at" />
          )}
          rowStyle={() => ({backgroundColor: "lightblue"})}
          linkType="show"
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
          <TextField source="training_period" />
          <DateField source="created_at" />
          <DateField source="updated_at" />
          <EditButton />
          <DeleteButton className="delete-button" />
        </Datagrid>
      )}
    </List>
  );
};
