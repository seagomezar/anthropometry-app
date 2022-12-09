import React from 'react';
import {
  DateField,
  NumberField,
  ReferenceInput,
  TextField,
  useTranslate,
  Show,
  SimpleShowLayout,
  ReferenceField,
  AutocompleteInput,
} from 'react-admin';
import { Box, Typography } from '@mui/material';

const measurementFilters = [
    <ReferenceInput source="user_id" label="User" reference="user" />,
  ];

  const filterToQuery = (searchText) => ({
    sport: `%${searchText}%`,
  });

export const MeasurementShow = () => {
    const translate = useTranslate();
    return (
      <Show>
         <SimpleShowLayout sx={{ maxWidth: 500 }}>
          <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <ReferenceField
                source="user_id"
                reference="user"
                fullWidth
              />
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <ReferenceField
                source="referenced_somatotype_id"
                reference="referenced_somatotype"
                fullWidth
              >
              </ReferenceField>
            </Box>
          </Box>
          <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <NumberField source="control" fullWidth />
            </Box>
          </Box>
          <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
                {translate('resources.measurement.fields.evaluation_date')}
              </Typography>
              <DateField source="evaluation_date" />
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
              <NumberField source="weight" fullWidth />
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
              <NumberField source="plg_abdominal" fullWidth />
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <NumberField source="plg_armpit" fullWidth />
            </Box>
          </Box>
          <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <NumberField source="plg_calf" fullWidth />
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <NumberField source="plg_chest" fullWidth />
            </Box>
          </Box>
          <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <NumberField source="plg_subscapular" fullWidth />
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <NumberField source="plg_suprailiac" fullWidth />
            </Box>
          </Box>
          <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <NumberField source="plg_supraspinal" fullWidth />
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <NumberField source="plg_thigh" fullWidth />
            </Box>
          </Box>
          <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <NumberField source="plg_triceps" fullWidth />
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberField source="plg_bicep" fullWidth />
            </Box>
          </Box>
          <Typography variant="h6" gutterBottom>
            {translate('myroot.perímetros')}
          </Typography>
          <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <NumberField source="prm_arm" fullWidth />
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <NumberField source="prm_calf" fullWidth />
            </Box>
          </Box>
          <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <NumberField source="prm_chest" fullWidth />
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <NumberField source="prm_hip" fullWidth />
            </Box>
          </Box>
          <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <NumberField source="prm_thigh" fullWidth />
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <NumberField source="prm_waist" fullWidth />
            </Box>
          </Box>
          <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <NumberField source="prm_wrist" fullWidth />
            </Box>
          </Box>
          <Typography variant="h6" gutterBottom>
            {translate('myroot.diametro')}
          </Typography>
          <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <NumberField source="dm_elbow" fullWidth />
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <NumberField source="dm_knee" fullWidth />
            </Box>
          </Box>
          <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <NumberField source="dm_wrist" fullWidth />
            </Box>
          </Box>
          <Typography variant="h6" gutterBottom>
            {translate('myroot.somatotipo')}
          </Typography>
          <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <NumberField source="x" fullWidth />
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <NumberField source="y" fullWidth />
            </Box>
          </Box>
          <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <DateField source="creatinine" fullWidth />
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <NumberField source="fitness_level" fullWidth />
            </Box>
          </Box>
          <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <TextField source="t3_t4" fullWidth />
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <TextField source="triglycerides" fullWidth />
            </Box>
          </Box>
          <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <TextField source="uric_acid" fullWidth />
            </Box>
          </Box>
          </SimpleShowLayout>
      </Show>
    );
  };