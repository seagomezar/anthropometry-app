import React from 'react';
import {
  Datagrid,
  DateField,
  List,
  NumberField,
  TextField,
  DateInput,
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
  Create,
} from 'react-admin';

export const FoodList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="sport" />
      <TextField source="gender" />
      <NumberField source="endomorph" />
      <NumberField source="mesomorph" />
      <NumberField source="ectomortph" />
      <NumberField source="x" />
      <NumberField source="y" />
      <DateField source="updated_at" />
      <DateField source="created_at" />
    </Datagrid>
  </List>
);

export const FoodEdit = () => (
  <Edit>
    <SimpleForm>
    <TextField source="sport" />
      <TextField source="gender" />
      <NumberField source="endomorph" />
      <NumberField source="mesomorph" />
      <NumberField source="ectomortph" />
      <NumberField source="x" />
      <NumberField source="y" />
    </SimpleForm>
  </Edit>
);
export const FoodCreate = () => (
  <Create>
    <SimpleForm>
    <TextField source="sport" />
      <TextField source="gender" />
      <NumberField source="endomorph" />
      <NumberField source="mesomorph" />
      <NumberField source="ectomortph" />
      <NumberField source="x" />
      <NumberField source="y" />
    </SimpleForm>
  </Create>
);
