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
  useTranslate,
  Show,
  SimpleShowLayout,
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
        <Datagrid rowClick="show">
          <TextField source="id" />
          <ReferenceField source="user_id" reference="user" />
          <ReferenceField source="referenced_somatotype_id" reference="referenced_somatotype" />
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

export const MeasurementEdit = () => {
  const translate = useTranslate();
  return (
    <Edit>
      <SimpleForm sx={{ maxWidth: 600 }}>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <ReferenceInput
              source="user_id"
              reference="user"
              fullWidth
            />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <ReferenceInput source="referenced_somatotype_id" reference="referenced_somatotype" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <NumberInput source="control" fullWidth />
          </Box>
        </Box>
        <Typography variant="h6" gutterBottom>
          {translate('myroot.mediciones')}
        </Typography>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="weight" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="height" fullWidth />
          </Box>
        </Box>

        <Typography variant="h6" gutterBottom>
          {translate('myroot.pliegues')}
        </Typography>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="plg_abdominal" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="plg_armpit" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="plg_calf" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="plg_chest" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="plg_subscapular" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="plg_suprailiac" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="plg_supraspinal" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="plg_thigh" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="plg_triceps" fullWidth />
          </Box>
        </Box>
        <Typography variant="h6" gutterBottom>
          {translate('myroot.perímetros')}
        </Typography>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="prm_arm" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="prm_calf" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="prm_chest" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="prm_hip" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="prm_thigh" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="prm_waist" fullWidth />
          </Box>
        </Box>
        <Typography variant="h6" gutterBottom>
          {translate('myroot.diametro')}
        </Typography>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="dm_elbow" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="dm_knee" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="dm_wrist" fullWidth />
          </Box>
        </Box>
        <Typography variant="h6" gutterBottom>
          {translate('myroot.somatotipo')}
        </Typography>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="x" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="y" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <DateInput source="creatinine" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="fitness_level" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <TextInput source="t3_t4" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <TextInput source="triglycerides" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <TextInput source="uric_acid" fullWidth />
          </Box>
        </Box>
      </SimpleForm>
    </Edit>
  );
};

export const MeasurementCreate = () => {
  const translate = useTranslate();
  return (
    <Create>
      <SimpleForm sx={{ maxWidth: 600 }}>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <ReferenceInput
              source="user_id"
              reference="user"
              fullWidth
            />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <ReferenceInput source="referenced_somatotype_id" reference="referenced_somatotype" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <NumberInput source="control" fullWidth />
          </Box>
        </Box>
        <Typography variant="h6" gutterBottom>
          {translate('myroot.mediciones')}
        </Typography>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="weight" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="height" fullWidth />
          </Box>
        </Box>

        <Typography variant="h6" gutterBottom>
          {translate('myroot.pliegues')}
        </Typography>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="plg_abdominal" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="plg_armpit" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="plg_calf" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="plg_chest" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="plg_subscapular" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="plg_suprailiac" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="plg_supraspinal" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="plg_thigh" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="plg_triceps" fullWidth />
          </Box>
        </Box>
        <Typography variant="h6" gutterBottom>
          {translate('myroot.perímetros')}
        </Typography>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="prm_arm" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="prm_calf" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="prm_chest" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="prm_hip" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="prm_thigh" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="prm_waist" fullWidth />
          </Box>
        </Box>
        <Typography variant="h6" gutterBottom>
          {translate('myroot.diametro ')}
        </Typography>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="dm_elbow" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="dm_knee" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="dm_wrist" fullWidth />
          </Box>
        </Box>
        <Typography variant="h6" gutterBottom>
          {translate('myroot.somatotipo')}
        </Typography>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="x" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="y" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <DateInput source="creatinine" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="fitness_level" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <TextInput source="t3_t4" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <TextInput source="triglycerides" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <TextInput source="uric_acid" fullWidth />
          </Box>
        </Box>
      </SimpleForm>
    </Create>
  );
};

export const MeasurementShow = () => {
  const translate = useTranslate();
  return (
    <Show>
      <SimpleShowLayout sx={{ maxWidth: 600 }}>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <ReferenceField
              source="user_id"
              reference="user"
              fullWidth
            />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <ReferenceField source="referenced_somatotype_id" reference="referenced_somatotype" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <NumberField source="control" fullWidth />
          </Box>
        </Box>
        <Typography variant="h6" gutterBottom>
          {translate('myroot.mediciones')}
        </Typography>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.weight')}
            </Typography>
            <NumberField source="weight" />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.height')}
            </Typography>
            <NumberField source="height" fullWidth />
          </Box>
        </Box>

        <Typography variant="h6" gutterBottom>
          {translate('myroot.pliegues')}
        </Typography>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.plg_abdominal')}
            </Typography>
            <NumberField source="plg_abdominal" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.plg_armpit')}
            </Typography>
            <NumberField source="plg_armpit" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.plg_calf')}
            </Typography>
            <NumberField source="plg_calf" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.plg_chest')}
            </Typography>
            <NumberField source="plg_chest" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.plg_subscapular')}
            </Typography>
            <NumberField source="plg_subscapular" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.plg_suprailiac')}
            </Typography>
            <NumberField source="plg_suprailiac" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.plg_supraspinal')}
            </Typography>
            <NumberField source="plg_supraspinal" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.plg_thigh')}
            </Typography>
            <NumberField source="plg_thigh" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.plg_triceps')}
            </Typography>
            <NumberField source="plg_triceps" fullWidth />
          </Box>
        </Box>
        <Typography variant="h6" gutterBottom>
          {translate('myroot.perímetros')}
        </Typography>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.prm_arm')}
            </Typography>
            <NumberField source="prm_arm" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.prm_calf')}
            </Typography>
            <NumberField source="prm_calf" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.prm_chest')}
            </Typography>
            <NumberField source="prm_chest" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.prm_hip')}
            </Typography>
            <NumberField source="prm_hip" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.prm_thigh')}
            </Typography>
            <NumberField source="prm_thigh" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.prm_waist')}
            </Typography>
            <NumberField source="prm_waist" fullWidth />
          </Box>
        </Box>
        <Typography variant="h6" gutterBottom>
          {translate('myroot.diametro ')}
        </Typography>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.dm_elbow')}
            </Typography>
            <NumberField source="dm_elbow" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.dm_knee')}
            </Typography>
            <NumberField source="dm_knee" />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.dm_wrist')}
            </Typography>
            <NumberField source="dm_wrist" fullWidth />
          </Box>
        </Box>
        <Typography variant="h6" gutterBottom>
          {translate('myroot.somatotipo')}
        </Typography>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.x')}
            </Typography>
            <NumberField source="x" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.y')}
            </Typography>
            <NumberField source="y" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.creatinine')}
            </Typography>
            <DateField source="creatinine" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.fitness_level')}
            </Typography>
            <NumberField source="fitness_level" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.t3_t4')}
            </Typography>
            <TextField source="t3_t4" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.triglycerides')}
            </Typography>
            <TextField source="triglycerides" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.uric_acid')}
            </Typography>
            <TextField source="uric_acid" fullWidth />
          </Box>
        </Box>
      </SimpleShowLayout>
    </Show>
  );
};
