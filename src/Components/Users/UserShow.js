import React from 'react';
import {
  Datagrid,
  DateField,
  TextField,
  ReferenceManyField,
  useTranslate,
  Show,
  SimpleShowLayout,
  NumberField,
  ReferenceField,
  FunctionField,
} from 'react-admin';
import { Typography, Box } from '@mui/material';
import { Empty } from '../Empty';
import LineChartField from '../LineChartField';
import ResultsFieldChart from '../Results/ResultsFieldChart';
import { Separator } from '../Separator';

export const UserShow = () => {
  const translate = useTranslate();
  return (
    <Show>
      <SimpleShowLayout>
        <Typography variant="h6" gutterBottom>
          {translate('myroot.identity')}
        </Typography>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.user.fields.firstname')}
            </Typography>
            <TextField source="firstname" />
          </Box>
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
          <Typography variant="h6" gutterBottom>
            {translate('resources.user.fields.lastname')}
          </Typography>
          <TextField source="lastname" />
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.user.fields.email')}
            </Typography>
            <TextField source="email" />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.user.fields.gender')}
            </Typography>
            <FunctionField
              source="gender"
              render={(record) =>
                record.gender
                  ? translate('myroot.male')
                  : translate('myroot.female')
              }
            />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.user.fields.birthday')}
            </Typography>
            <DateField source="birthday" />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.user.fields.nutritionist')}
            </Typography>
            <ReferenceField
              source="nutritionist_id"
              reference="nutritionist"
              fullWidth
            />
          </Box>
        </Box>
        <Separator />

        <Separator />
        <Typography variant="h6" gutterBottom>
          {translate('myroot.addressAndPhone')}
        </Typography>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.user.fields.address')}
            </Typography>
            <TextField source="address" />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.user.fields.phone')}
            </Typography>
            <TextField source="phone" fullWidth />
          </Box>
        </Box>
        <Separator />

        <Box display={{ xs: 'block', sm: 'flex' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('myroot.password')}
            </Typography>
            <TextField source="password" fullWidth />
          </Box>
        </Box>
        <Separator />
        <ReferenceManyField
          label={translate('resources.user.fields.measurements')}
          reference="measurement"
          target="user_id"
        >
          <Datagrid empty={<Empty />} rowClick="show">
            <NumberField source="control" />
            <ReferenceField
              source="referenced_somatotype_id"
              reference="referenced_somatotype"
              fullWidth
            />
            <NumberField source="weight" />
            <NumberField source="height" />
            <DateField source="evaluation_date" />
          </Datagrid>
        </ReferenceManyField>

        <Separator />
        <LineChartField source="id" label="" />

        <Separator />
        <ResultsFieldChart source="id" label="" />

        <Separator />
        <ReferenceManyField
          label={translate('resources.user.fields.plans')}
          reference="plan"
          target="user_id"
        >
          <Datagrid empty={<Empty />} rowClick="show">
            <NumberField source="id" />
            <TextField source="comments" />
            <ReferenceField
              source="goal_id"
              reference="goal"
              fullWidth
            />
            <DateField source="created_at" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};
