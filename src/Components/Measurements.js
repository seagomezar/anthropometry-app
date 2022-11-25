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
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
          <NumberField source="sport" />
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
      <TextInput source="uric_acid" />
      <ReferenceInput source="user_id" reference="user" />
    </SimpleForm>
  </Edit>
);

export const MeasurementCreate = () => (
  <Create>
    <SimpleForm sx={{ maxWidth: 500 }}>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <ReferenceInput source="user_id" reference="user"fullWidth/>
     </Box>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <NumberInput source="sport"fullWidth />
     </Box>
    </Box>
      <NumberInput source="control" />
      <Typography variant="h6" gutterBottom>
        Mediciones
      </Typography>
      <NumberInput source="weight" />
      <NumberInput source="height" />

      <Typography variant="h6" gutterBottom>
        Pliegues (m.m)
      </Typography>
      <NumberInput source="plg_abdominal" />
      <NumberInput source="plg_armpit" />
      <NumberInput source="plg_calf" />
      <NumberInput source="plg_chest" />
      <NumberInput source="plg_subscapular" />
      <NumberInput source="plg_suprailiac" />
      <NumberInput source="plg_supraspinal" />
      <NumberInput source="plg_thigh" />
      <NumberInput source="plg_triceps" />
      <Typography variant="h6" gutterBottom>
        Perímetros (cm)
      </Typography>
      <NumberInput source="prm_arm" />
      <NumberInput source="prm_calf" />
      <NumberInput source="prm_chest" />
      <NumberInput source="prm_hip" />
      <NumberInput source="prm_thigh" />
      <NumberInput source="prm_waist" />
      <Typography variant="h6" gutterBottom>
      Diametro (cm)
      </Typography>
      <NumberInput source="dm_elbow" />
      <NumberInput source="dm_knee" />
      <NumberInput source="dm_wrist" />

      <Typography variant="h6" gutterBottom>
      Somatotipo de referencia
      </Typography>
      <NumberInput source="x" />
      <NumberInput source="y" />

      <DateInput source="creatinine" />
      <NumberInput source="fitness_level" />
      <TextInput source="id" />
      <TextInput source="t3_t4" />
      <TextInput source="triglycerides" />
      <TextInput source="uric_acid" />
      <ReferenceInput source="user_id" reference="user" />
    </SimpleForm>
  </Create>
);
