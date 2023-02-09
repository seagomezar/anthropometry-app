
import React from 'react';
import {
  DateField,
  FunctionField,
  NumberField,
  TextField,
  useTranslate,
  Show,
  SimpleShowLayout,
  ReferenceField,
  Button,
  Link,
  useGetRecordId,
  useShowContext
} from 'react-admin';
import { Typography } from '@mui/material';
import './tablas.css';
import { generateResults } from '../../Providers/retultsProvider';


const MeasurementShowLayout = () => {
  const translate = useTranslate();
  const {
    defaultTitle, // the translated title based on the resource, e.g. 'Post #123'
    error,  // error returned by dataProvider when it failed to fetch the record. Useful if you want to adapt the view instead of just showing a notification using the `onError` side effect.
    isFetching, // boolean that is true while the record is being fetched, and false once the record is fetched
    isLoading, // boolean that is true until the record is available for the first time
    record, // record fetched via dataProvider.getOne() based on the id from the location
    refetch, // callback to refetch the record via dataProvider.getOne()
    resource, // the resource name, deduced from the location. e.g. 'posts'
  } = useShowContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error!</div>;
  } else {
  const results = generateResults(record, record.height, record.weight, true)
  return (
      <table border="2">
        <tr class='n'>
          <td>WILSON ANDRES RAVE CIFUENTES</td>
        </tr>

        <tr>
          <td><Typography variant="h6" gutterBottom>
          <b>{translate('resources.measurement.fields.user_id')}</b>
          </Typography>
          </td>
          <td class='n'> <b><ReferenceField
            source="user_id"
            reference="user"
            fullWidth
          /></b>
          </td>
        </tr>

        <tr>
          <td className='t'>
            <Typography variant="h6" gutterBottom>
             <b>{translate(
                'resources.measurement.fields.referenced_somatotype_id'
              )}</b> 
            </Typography>
          </td>
          <td className='n'>
            <ReferenceField
              source="referenced_somatotype_id"
              reference="referenced_somatotype"
              fullWidth
            ></ReferenceField>
          </td>
        </tr>

        <tr>
          <td><Typography variant="h6" gutterBottom>
           <b>{translate('resources.measurement.fields.modality')}</b> 
          </Typography>
          </td>
          <td class='n'> <ReferenceField
            source="referenced_somatotype_id"
            reference="referenced_somatotype"
            fullWidth
          ></ReferenceField>
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.trainingPeriod')}</b>
            </Typography>
          </td>
          <td class='n'><DateField source="trainingPeriod" /></td>
        </tr>

        <tr>
          <td><Typography variant="h6" gutterBottom>
          <b>{translate(
              'resources.measurement.fields.evaluation_date'
            )}</b>
          </Typography>
          </td>
          <td class='n'>
            <DateField source="evaluation_date" />
          </td>
        </tr>

        <tr>
          <td><Typography variant="h6" gutterBottom>
          <b>{translate('resources.measurement.fields.birthdayDate')}</b>
          </Typography>
          </td>
          <td class='n'>
            <DateField source="birthdayDate" />
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.gender')}</b>
            </Typography>
          </td>
          <td class='n'>
            <FunctionField
              source="gender"
              render={(record) =>
                record.gender
                  ? translate('myroot.male')
                  : translate('myroot.female')
              }
            />
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.age')}</b>
            </Typography>
          </td>
          <td class='n'>
            <DateField source="age" />
          </td>
        </tr>

        <tr class='med'>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('myroot.mediciones')}</b>
            </Typography>
          </td>
        </tr>

        <tr>
          <td><Typography variant="h6" gutterBottom>
          <b>{translate('resources.measurement.fields.weight')}</b>
          </Typography>
          </td>
          <td class='n'>
            <NumberField source="weight" fullWidth />
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.height')}</b>
            </Typography>
          </td>
          <td class='n'>
            <NumberField source="height" fullWidth />
          </td>
        </tr>

        <tr class='pli' >
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('myroot.pliegues')}</b>
            </Typography>
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.plg_triceps')}</b>
            </Typography>
          </td>
          <td class='n'>
            <NumberField source="plg_triceps" fullWidth />
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.plg_bicep')}</b>
            </Typography>
          </td>
          <td class='n'>
            <NumberField source="plg_bicep" fullWidth />
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate(
                'resources.measurement.fields.plg_subscapular'
              )}</b>
            </Typography>
          </td>
          <td class='n'>
            <NumberField source="plg_subscapular" fullWidth />
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate(
                'resources.measurement.fields.plg_suprailiac'
              )}</b>
            </Typography>
          </td>
          <td class='n'>
            <NumberField source="plg_suprailiac" fullWidth />
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate(
                'resources.measurement.fields.plg_supraspinal'
              )}</b>
            </Typography>
          </td>
          <td class='n'>
            <NumberField source="plg_supraspinal" fullWidth />
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate(
                'resources.measurement.fields.plg_abdominal'
              )}</b>
            </Typography>
          </td>
          <td class='n'>
            <NumberField source="plg_abdominal" fullWidth />
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.plg_thigh')}</b>
            </Typography>
          </td>
          <td class='n'>
            <NumberField source="plg_thigh" fullWidth />
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.plg_calf')}</b>
            </Typography>
          </td>
          <td class='n'>
            <NumberField source="plg_calf" fullWidth />
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.plg_chest')}</b>
            </Typography>
          </td>
          <td class='n'>
            <NumberField source="plg_chest" fullWidth />
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.plg_armpit')}</b>
            </Typography>
          </td>
          <td class='n'>
            <NumberField source="plg_armpit" fullWidth />
          </td>
        </tr>

        <tr class='pli'>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('myroot.perímetros')}</b>
            </Typography>
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.prm_arm')}</b>
            </Typography>
          </td>
          <td class='n'>
            <NumberField source="prm_arm" fullWidth />
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.prm_arm_contracted')}</b>
            </Typography>
          </td>
          <td class='n'>
            <NumberField source="prm_arm_contracted" fullWidth />
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.prm_wrist')}</b>
            </Typography>
          </td>
          <td class='n'>
            <NumberField source="prm_wrist" fullWidth />
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.prm_waist')}</b>
            </Typography>
          </td>
          <td class='n'>
            <NumberField source="prm_waist" fullWidth />
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.prm_hip')}</b>
            </Typography>
          </td>
          <td class='n'>
            <NumberField source="prm_hip" fullWidth />
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.prm_calf')}</b>
            </Typography>
          </td>
          <td class='n'>
            <NumberField source="prm_calf" fullWidth />
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.prm_chest')}</b>
            </Typography>
          </td>
          <td class='n'>
            <NumberField source="prm_chest" fullWidth />
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.plg_triceps')}</b>
            </Typography>
          </td>
          <td class='n'>
            <NumberField source="plg_triceps" fullWidth />
          </td>
        </tr>

        <tr class='pli'>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('myroot.diametro')}</b>
            </Typography>
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.dm_elbow')}</b>
            </Typography>
          </td>
          <td class='n'>
            <NumberField source="dm_elbow" fullWidth />
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.dm_knee')}</b>
            </Typography>
          </td>
          <td class='n'>
            <NumberField source="dm_knee" fullWidth />
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.dm_wrist')}</b>
            </Typography>
          </td>
          <td class='n'>
            <NumberField source="dm_wrist" fullWidth />
          </td>
        </tr>

        <tr class='pli'>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('myroot.somatotipo actual')}</b>
            </Typography>
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.endomorph')}</b>
            </Typography>
          </td>
          <td class='n'>
          {results.endomorph.toFixed(2)}
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.mesomorph')}</b>
            </Typography>
          </td>
          <td class='n'>
            {results.mesomorph.toFixed(2)}
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.ectomorph')}</b>
            </Typography>
          </td>
          <td class='n'>
          {results.ectomorph.toFixed(2)}
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.x')}</b>
            </Typography>
          </td>
          <td class='n'>
            <NumberField source="x" fullWidth />
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.y')}</b>
            </Typography>
          </td>
          <td class='n'>
            <NumberField source="y" fullWidth />
          </td>
        </tr>

        <tr class='pli'>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('myroot.somatotipo de referencia')}</b>
            </Typography>
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.resultX')}</b>
            </Typography>
          </td>
          <td class='n'>
          {results.resultX.toFixed(2)}
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.resultY')}</b>
            </Typography>
          </td>
          <td class='n'>
          {results.resultY.toFixed(2)}
          </td>
        </tr>

        <tr class='pli'>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('myroot.fatPercentageIndices')}</b>
            </Typography>
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.imc')}</b>
            </Typography>
          </td>
          <td class='n'>
                {results.imc.toFixed(2)}
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.iaks')}</b>
            </Typography>
          </td>
          <td class='n'>
          {results.iaks.toFixed(2)}
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.complexion')}</b>
            </Typography>
          </td>
          <td class='n'>
          {results.complexion.toFixed(2)}
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.conicIndex')}</b>
            </Typography>
          </td>
          <td class='n'>
          {results.conicIndex.toFixed(2)}
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.sumOfPlgs')}</b>
            </Typography>
          </td>
          <td class='n'>
          {results.sumOfPlgs.toFixed(2)}
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.yhaszFatPercentage')}</b>
            </Typography>
          </td>
          <td class='n'>
          {results.yhaszFatPercentage.toFixed(2)}
          </td>
        </tr>

        <tr class='pli'>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('myroot.bodyComposition')}</b>
            </Typography>
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.fatWeight')}</b>
            </Typography>
          </td>
          <td class='n'>
          {results.fatWeight.toFixed(2)}
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.freeFatWeight')}</b>
            </Typography>
          </td>
          <td class='n'>
          {results.freeFatWeight.toFixed(2)}
          </td>
        </tr>

        <tr class='pli'>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('myroot.ExpectedValues')}</b>
            </Typography>
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.sumaPlieguesEndo')}</b>
            </Typography>
          </td>
          <td class='n'>
          {results.sumaPlieguesEndo.toFixed(2)}
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.yhaszFatPercentageSumaPliegues')}</b>
            </Typography>
          </td>
          <td class='n'>
            {results.faulknerFatPercentage.toFixed(2)}
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.fatPercentageForPerformance')}</b>
            </Typography>
          </td>
          <td class='n'>
          {results.parizcovaFatPercentage.toFixed(2)}
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.desiredIMC')}</b>
            </Typography>
          </td>
          <td class='n'>
          {results.desiredIMC.toFixed(2)}
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.desiredWeight')}</b>
            </Typography>
          </td>
          <td class='n'>
          {results.desiredWeight.toFixed(2)}
          </td>
        </tr>

        <tr>
          <td>
            <Typography variant="h6" gutterBottom>
            <b>{translate('resources.measurement.fields.desiredFat2MethodPercentage')}</b>
            </Typography>
          </td>
          <td class='n'>
          {results.desiredFat2MethodPercentage.toFixed(2)}
          </td>
        </tr>
      </table>
  );
}
};


export const HelloWorld = () => {




  return <Show>
    <MeasurementShowLayout/>
  </Show>
}

