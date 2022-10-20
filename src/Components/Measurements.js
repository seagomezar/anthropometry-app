import React from 'react';
import {
  Datagrid,
  DateField,
  List,
  NumberField,
  ReferenceField,
  TextField,
  DateInput,
  Edit,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
  Create,
  EditButton,
  DeleteButton,
  SimpleList,
} from 'react-admin';
import { useMediaQuery } from '@mui/material';

const measurementFilters = [
  <ReferenceInput source="user_id" label="User" reference="user" />,
];

export const MeasurementList = () => {
  const isSmall = useMediaQuery((theme) =>
    theme.breakpoints.down('sm')
  );
  return (
    <List filters={measurementFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => (
            <ReferenceField
              source="user_id"
              record={record}
              reference="user"
            />
          )}
          secondaryText={(record) => `Control # ${record.control}`}
          tertiaryText={(record) => (
            <DateField record={record} source="created_at" />
          )}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <ReferenceField source="user_id" reference="user" />
          <NumberField source="control" />
          <NumberField source="height" />
          <NumberField source="weight" />
          <DateField source="created_at" />
          <DateField source="updated_at" />
          <EditButton />
          <DeleteButton />
        </Datagrid>
      )}
    </List>
  );
};

export const MeasurementEdit = () => (
  <Edit>
    <SimpleForm>
      <NumberInput source="control" />
      <DateInput source="created_at" />
      <DateInput source="creatinine" />
      <NumberInput source="dm_elbow" />
      <NumberInput source="dm_knee" />
      <NumberInput source="dm_wrist" />
      <NumberInput source="fitness_level" />
      <NumberInput source="height" />
      <TextInput source="id" />
      <NumberInput source="plg_abdominal" />
      <NumberInput source="plg_armpit" />
      <NumberInput source="plg_calf" />
      <NumberInput source="plg_chest" />
      <NumberInput source="plg_subscapular" />
      <NumberInput source="plg_suprailiac" />
      <NumberInput source="plg_supraspinal" />
      <NumberInput source="plg_thigh" />
      <NumberInput source="plg_triceps" />
      <NumberInput source="prm_arm" />
      <NumberInput source="prm_calf" />
      <NumberInput source="prm_chest" />
      <NumberInput source="prm_hip" />
      <NumberInput source="prm_thigh" />
      <NumberInput source="prm_waist" />
      <TextInput source="t3_t4" />
      <TextInput source="triglycerides" />
      <DateInput source="updated_at" />
      <TextInput source="uric_acid" />
      <ReferenceInput source="user_id" reference="user" />
      <NumberInput source="weight" />
      <NumberInput source="x" />
      <NumberInput source="y" />
    </SimpleForm>
  </Edit>
);

export const MeasurementCreate = () => (
  <Create>
    <SimpleForm>
      <NumberInput source="control" />
      <DateInput source="created_at" />
      <DateInput source="creatinine" />
      <NumberInput source="dm_elbow" />
      <NumberInput source="dm_knee" />
      <NumberInput source="dm_wrist" />
      <NumberInput source="fitness_level" />
      <NumberInput source="height" />
      <TextInput source="id" />
      <NumberInput source="plg_abdominal" />
      <NumberInput source="plg_armpit" />
      <NumberInput source="plg_calf" />
      <NumberInput source="plg_chest" />
      <NumberInput source="plg_subscapular" />
      <NumberInput source="plg_suprailiac" />
      <NumberInput source="plg_supraspinal" />
      <NumberInput source="plg_thigh" />
      <NumberInput source="plg_triceps" />
      <NumberInput source="prm_arm" />
      <NumberInput source="prm_calf" />
      <NumberInput source="prm_chest" />
      <NumberInput source="prm_hip" />
      <NumberInput source="prm_thigh" />
      <NumberInput source="prm_waist" />
      <TextInput source="t3_t4" />
      <TextInput source="triglycerides" />
      <DateInput source="updated_at" />
      <TextInput source="uric_acid" />
      <ReferenceInput source="user_id" reference="user" />
      <NumberInput source="weight" />
      <NumberInput source="x" />
      <NumberInput source="y" />
    </SimpleForm>
  </Create>
);
