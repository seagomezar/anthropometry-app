
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
          {translate('myroot.mediciones')}
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
      <Typography variant="h6" gutterBottom>
              {translate(
                'resources.measurement.fields.plg_suprailiac'
              )}
            </Typography>
      </td>
      <td>
      <NumberField source="plg_suprailiac" fullWidth />
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
              {translate(
                'resources.measurement.fields.plg_supraspinal'
              )}
            </Typography>
      </td>
      <td>
      <NumberField source="plg_supraspinal" fullWidth />
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
              {translate(
                'resources.measurement.fields.plg_abdominal'
              )}
            </Typography>
      </td>
      <td>
      <NumberField source="plg_abdominal" fullWidth />
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.plg_thigh')}
            </Typography>
      </td>
      <td>
      <NumberField source="plg_thigh" fullWidth />
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.plg_calf')}
            </Typography>
      </td>
      <td>
      <NumberField source="plg_calf" fullWidth />
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.plg_chest')}
            </Typography>
      </td>
      <td>
      <NumberField source="plg_chest" fullWidth />
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.plg_armpit')}
            </Typography>
      </td>
      <td>
      <NumberField source="plg_armpit" fullWidth />
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
          {translate('myroot.perímetros')}
        </Typography>
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.prm_arm')}
            </Typography>
      </td>
      <td>
      <NumberField source="prm_arm" fullWidth />
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.prm_arm_contracted')}
            </Typography>
      </td>
      <td>
      <NumberField source="prm_arm_contracted" fullWidth />
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.prm_wrist')}
            </Typography>
      </td>
      <td>
      <NumberField source="prm_wrist" fullWidth />
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.prm_waist')}
            </Typography>
      </td>
      <td>
      <NumberField source="prm_waist" fullWidth />
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.prm_hip')}
            </Typography>
            <NumberField source="prm_hip" fullWidth />
      </td>
      <td>
      <NumberField source="prm_hip" fullWidth />
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.prm_calf')}
            </Typography>
      </td>
      <td>
      <NumberField source="prm_calf" fullWidth />
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.prm_chest')}
            </Typography>
      </td>
      <td>
      <NumberField source="prm_chest" fullWidth />
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
          {translate('myroot.diametro')}
        </Typography>
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.dm_elbow')}
            </Typography>
      </td>
      <td>
      <NumberField source="dm_elbow" fullWidth />
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.dm_knee')}
            </Typography>
      </td>
      <td>
      <NumberField source="dm_knee" fullWidth />
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.dm_wrist')}
            </Typography>
      </td>
      <td>
      <NumberField source="dm_wrist" fullWidth />
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
          {translate('myroot.somatotipo')}
        </Typography>
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.x')}
            </Typography>
      </td>
      <td>
      <NumberField source="x" fullWidth />
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.y')}
            </Typography>
      </td>
      <td>
      <NumberField source="y" fullWidth />
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
          {translate('myroot.informacion')}
        </Typography>
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.creatinine')}
            </Typography>
      </td>
      <td>
      <DateField source="creatinine" fullWidth />
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
              {translate(
                'resources.measurement.fields.fitness_level'
              )}
            </Typography>
      </td>
      <td>
      <NumberField source="fitness_level" fullWidth />
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.t3_t4')}
            </Typography>
      </td>
      <td>
      <TextField source="t3_t4" fullWidth />
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
              {translate(
                'resources.measurement.fields.triglycerides'
              )}
            </Typography>
      </td>
      <td>
      <TextField source="triglycerides" fullWidth />
      </td>
    </tr>

    <tr>
      <td>
      <Typography variant="h6" gutterBottom>
              {translate('resources.measurement.fields.uric_acid')}
            </Typography>
      </td>
      <td>
      <TextField source="uric_acid" fullWidth />
      </td>
    </tr>
  </table>
  </Show>
}
