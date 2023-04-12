import React from "react";
import {
  Datagrid,
  DateField,
  List,
  NumberField,
  TextField,
  SelectField,
  useTranslate,
  EditButton,
  DeleteButton,
  TextInput,
  SimpleList,
} from "react-admin";
import { useMediaQuery } from "@mui/material";

const ReferencedSomatotypeFilters = [
  <TextInput label="Search" source="sport@_like" alwaysOn />,
];

export const ReferencedSomatotypeList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const translate = useTranslate();
  return (
    <List filters={ReferencedSomatotypeFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.sport }
          secondaryText={(record) => `${record.gender } - endomorph${record.endomorph} ,y ${record.y}`}
          tertiaryText={(record) => (
            <DateField record={record} source="created_at" />
          )}
          rowStyle={(record) => ({backgroundColor: "lightblue"})}
        />
      ) : (
      <Datagrid rowClick="show">
        <TextField source="id" />
        <TextField source="sport" />
        <SelectField
          source="gender"
          choices={[
            { id: true, name: translate("myroot.male") },
            { id: false, name: translate("myroot.female") },
          ]}
        />
        <NumberField source="endomorph" />
        <NumberField source="mesomorph" />
        <NumberField source="ectomorph" />
        <NumberField source="x" />
        <NumberField source="y" />
        <DateField source="updated_at" />
        <DateField source="created_at" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    )}
    </List>
  );
  };
