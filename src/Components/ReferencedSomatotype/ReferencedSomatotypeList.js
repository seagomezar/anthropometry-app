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
} from "react-admin";

export const ReferencedSomatotypeList = () => {
  const translate = useTranslate();
  return (
    <List>
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
    </List>
  );
};
