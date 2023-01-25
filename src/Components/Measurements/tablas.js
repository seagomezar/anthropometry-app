
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
import { Typography } from '@mui/material';

export const HelloWorld = () => {
  const translate = useTranslate();

  return <Show> <table border="2">
    <tr>
    <td>WILSON ANDRES RAVE CIFUENTES</td>
    </tr>
    <tr>
      <td><Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.user_id')}
            </Typography>
      </td>
      <td> <ReferenceField
              source="user_id"
              reference="user"
              fullWidth
            />
      </td>
    </tr>
    <tr>
      <td>
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
      </td>
    </tr>
    <tr>
      <td>fecha de evalucion</td>
    </tr>
    <tr>
      <td>fecha de nacimiento</td>
    </tr>
    <tr>
      <td>
        <Typography variant="h6" gutterBottom>
          {translate('myroot.perímetros')}
        </Typography>
      </td>
    </tr>
    <tr>
      <td>edad</td>
    </tr>
    <tr>
      <td> </td>
    </tr>
    <tr>
      <td>peso </td>
    </tr>
  </table>
  </Show>
}
