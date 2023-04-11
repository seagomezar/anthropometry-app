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
  SimpleList
} from 'react-admin';
import { Typography, Grid, useMediaQuery } from '@mui/material';
import { Empty } from '../Empty';
import LineChartField from '../LineChartField';
import ResultsFieldChart from '../Results/ResultsFieldChart';
import { Separator } from '../Separator';

export const UserShow = () => {
  const translate = useTranslate();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const MeasurementList = isSmallScreen ? (
    <ReferenceManyField
      label={translate('resources.user.fields.measurements')}
      reference="measurement"
      target="user_id"
    >
      <SimpleList
          primaryText={(record) => `${record.weight} kg, ${record.height} cm`}
          linkType="show"
          secondaryText={(record) => `Control: #${record.control} - ${record.evaluation_date}`}
          rowStyle={(record) => ({ backgroundColor: record.gender ? "lightblue" : "pink" })}
        />
    </ReferenceManyField>
  ) : (
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
        />
        <NumberField source="weight" />
        <NumberField source="height" />
        <DateField source="evaluation_date" />
      </Datagrid>
    </ReferenceManyField>
  );

  return (
    <Show>
      <SimpleShowLayout>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>
              {translate('resources.user.fields.firstname')}
            </Typography>
            <TextField source="firstname" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>
              {translate('resources.user.fields.lastname')}
            </Typography>
            <TextField source="lastname" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>
              {translate('resources.user.fields.email')}
            </Typography>
            <TextField source="email" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>
              {translate('resources.user.fields.birthday')}
            </Typography>
            <DateField source="birthday" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>
              {translate('resources.user.fields.nutritionist')}
            </Typography>
            <ReferenceField
              source="nutritionist_id"
              reference="nutritionist"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>
              {translate('resources.user.fields.address')}
            </Typography>
            <TextField source="address" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>
              {translate('resources.user.fields.phone')}
            </Typography>
            <TextField source="phone" />
            </Grid>
        </Grid>
        <Separator />

        {MeasurementList}

        <Separator />
        <LineChartField source="id" label="" />

        <Separator />
        <ResultsFieldChart source="id" label="" />
      </SimpleShowLayout>
    </Show>
  );
};

         
