
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
      </td>
      <td>
      <ReferenceField
              source="referenced_somatotype_id"
              reference="referenced_somatotype"
              fullWidth
            ></ReferenceField>
      </td>
    </tr>

    <tr>
      <td><Typography variant="h6" gutterBottom>
      {translate('resources.measurement.fields.modalidad')}
        </Typography>
        </td>
      <td> <ReferenceField
              source="referenced_somatotype_id"
              reference="referenced_somatotype"
              fullWidth
            ></ReferenceField>
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
      {translate('resources.measurement.fields.periodo_de_entrenamiento')}
        </Typography>
        </td>
      <td><DateField source="periodo_de_entrenamiento" /></td>
    </tr>

    <tr>
      <td><Typography variant="h6" gutterBottom>
              {translate(
                'resources.measurement.fields.evaluation_date'
              )}
              </Typography>
      </td>
      <td>
            <DateField source="evaluation_date" />
      </td>
    </tr>

    <tr>
      <td><Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.birthday')}
            </Typography>
      </td>
      <td>
      <DateField source="birthday" />
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.gender')}
            </Typography>
            </td>
      <td>
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
              {translate('resources.measurement.fields.edad')}
            </Typography>
      </td>
      <td>
      <DateField source="edad" />
      </td>
    </tr>

    <tr>
      <td>
        <Typography variant="h6" gutterBottom>
          {translate('')}
        </Typography>
      </td>
    </tr>

    <tr>
      <td><Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.weight')}
            </Typography>
      </td>
      <td>
            <NumberField source="weight" fullWidth />
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.height')}
            </Typography>
      </td>
      <td>
      <NumberField source="height" fullWidth />
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
          {translate('myroot.pliegues')}
        </Typography>
      </td>
    </tr>

    <tr>
      <td>
            <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.plg_triceps')}
            </Typography>
      </td>
      <td>
      <NumberField source="plg_triceps" fullWidth />
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.plg_bicep')}
            </Typography>
      </td>
      <td>
      <NumberField source="plg_bicep" fullWidth />
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
              {translate(
                'resources.measurement.fields.plg_subscapular'
              )}
            </Typography>
      </td>
      <td>
      <NumberField source="plg_subscapular" fullWidth />
      </td>
    </tr>

    <tr>
      <td>

      </td>
      <td>
        
      </td>
    </tr>
  </table>
  </Show>
}
