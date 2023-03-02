import React from 'react';
import {
  DateField,
  NumberField,
  TextField,
  useTranslate,
  Show,
  SimpleShowLayout,
  ReferenceField,
  Button,
  Link,
  useGetRecordId,
} from 'react-admin';
import { Box, Typography } from '@mui/material';

export const MeasurementShow = () => {
  const translate = useTranslate();
  const recordId = useGetRecordId();

  return (
    <Show>
      <SimpleShowLayout sx={{ maxWidth: 500 }}>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.user_id')}
            </Typography>
            <ReferenceField
              source="user_id"
              reference="user"
              fullWidth
            />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate(
                'resources.measurement.fields.referenced_somatotype_id'
              )}
            </Typography>
            <ReferenceField
              source="referenced_somatotype_id"
              reference="referenced_somatotype"
              fullWidth
            ></ReferenceField>
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.control')}
            </Typography>
            <NumberField source="control" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate(
                'resources.measurement.fields.nutritionist_id'
              )}
            </Typography>
            <ReferenceField
              source="nutritionist_id"
              reference="nutritionist"
            />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate(
                'resources.measurement.fields.training_period'
              )}
            </Typography>
            <DateField source="training_period" />
            </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate(
                'resources.measurement.fields.evaluation_date'
              )}
            </Typography>
            <DateField source="evaluation_date" />
          </Box>
          </Box>
          <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.notes')}
            </Typography>
            <TextField source="notes" />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Link to={`/results/${recordId}`}>
              <Button label={translate('myroot.simulate_results')} />
            </Link>
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
            <Typography variant="h6" gutterBottom>
              {translate(
                'resources.measurement.fields.plg_abdominal'
              )}
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
              {translate(
                'resources.measurement.fields.plg_subscapular'
              )}
            </Typography>
            <NumberField source="plg_subscapular" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate(
                'resources.measurement.fields.plg_suprailiac'
              )}
            </Typography>
            <NumberField source="plg_suprailiac" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate(
                'resources.measurement.fields.plg_supraspinal'
              )}
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
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.plg_bicep')}
            </Typography>
            <NumberField source="plg_bicep" fullWidth />
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
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.prm_wrist')}
            </Typography>
            <NumberField source="prm_wrist" fullWidth />
          </Box>
        </Box>
        <Typography variant="h6" gutterBottom>
          {translate('myroot.diametro')}
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
            <NumberField source="dm_knee" fullWidth />
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
              {translate(
                'resources.measurement.fields.fitness_level'
              )}
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
              {translate(
                'resources.measurement.fields.triglycerides'
              )}
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
