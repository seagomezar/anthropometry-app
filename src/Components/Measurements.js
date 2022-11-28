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
          <DateField  source="created_at" />
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
    <SimpleForm sx={{ maxWidth: 600 }}>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <ReferenceInput source="user_id" reference="user"fullWidth />
     </Box>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <NumberInput source="sport"fullWidth />     
     </Box>
    </Box>
      <NumberInput source="control"fullWidth />
      <Typography variant="h6" gutterBottom>
        Mediciones
      </Typography>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
       <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
       <NumberInput source="weight"fullWidth />
       </Box>
       <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
       <NumberInput source="height" fullWidth/>
       </Box>
      </Box>

      <Typography variant="h6" gutterBottom>
        Pliegues (m.m)
      </Typography>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <NumberInput source="plg_abdominal"fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <NumberInput source="plg_armpit"fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
       <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <NumberInput source="plg_calf"fullWidth />
       </Box>
       <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <NumberInput source="plg_chest"fullWidth />
       </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <NumberInput source="plg_subscapular"fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <NumberInput source="plg_suprailiac"fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
       <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
       <NumberInput source="plg_supraspinal"fullWidth />
       </Box>
       <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
       <NumberInput source="plg_thigh"fullWidth />
       </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
       <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
       <NumberInput source="plg_triceps"fullWidth />
       </Box>
      </Box>
      <Typography variant="h6" gutterBottom>
        Perímetros (cm)
      </Typography>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
       <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
       <NumberInput source="prm_arm"fullWidth /> 
       </Box>
       <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
       <NumberInput source="prm_calf"fullWidth />
       </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
       <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <NumberInput source="prm_chest"fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <NumberInput source="prm_hip"fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
       <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
       <NumberInput source="prm_thigh" fullWidth/>
       </Box>
       <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
       <NumberInput source="prm_waist"fullWidth />
       </Box>
      </Box>
      <Typography variant="h6" gutterBottom>
      Diametro (cm)
      </Typography>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
       <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
       <NumberInput source="dm_elbow"fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <NumberInput source="dm_knee"fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <NumberInput source="dm_wrist"fullWidth />
      </Box>
      </Box>
      <Typography variant="h6" gutterBottom>
      Somatotipo de referencia
      </Typography>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <NumberInput source="x"fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <NumberInput source="y"fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <DateInput source="creatinine"fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <NumberInput source="fitness_level"fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <TextInput source="t3_t4"fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <TextInput source="triglycerides" fullWidth/>
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
       <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
       <TextInput source="uric_acid"fullWidth />
       </Box>
      </Box>
    </SimpleForm>
  </Edit>
);

export const MeasurementCreate = () => (
  <Create>
    <SimpleForm sx={{ maxWidth: 600 }}>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <ReferenceInput source="user_id" reference="user"fullWidth />
     </Box>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <NumberInput source="sport"fullWidth />     
     </Box>
    </Box>
      <NumberInput source="control"fullWidth />
      <Typography variant="h6" gutterBottom>
        Mediciones
      </Typography>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
       <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
       <NumberInput source="weight"fullWidth />
       </Box>
       <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
       <NumberInput source="height" fullWidth/>
       </Box>
      </Box>

      <Typography variant="h6" gutterBottom>
        Pliegues (m.m)
      </Typography>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <NumberInput source="plg_abdominal"fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <NumberInput source="plg_armpit"fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
       <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <NumberInput source="plg_calf"fullWidth />
       </Box>
       <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <NumberInput source="plg_chest"fullWidth />
       </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <NumberInput source="plg_subscapular"fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <NumberInput source="plg_suprailiac"fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
       <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
       <NumberInput source="plg_supraspinal"fullWidth />
       </Box>
       <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
       <NumberInput source="plg_thigh"fullWidth />
       </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
       <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
       <NumberInput source="plg_triceps"fullWidth />
       </Box>
      </Box>
      <Typography variant="h6" gutterBottom>
        Perímetros (cm)
      </Typography>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
       <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
       <NumberInput source="prm_arm"fullWidth /> 
       </Box>
       <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
       <NumberInput source="prm_calf"fullWidth />
       </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
       <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <NumberInput source="prm_chest"fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <NumberInput source="prm_hip"fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
       <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
       <NumberInput source="prm_thigh" fullWidth/>
       </Box>
       <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
       <NumberInput source="prm_waist"fullWidth />
       </Box>
      </Box>
      <Typography variant="h6" gutterBottom>
      Diametro (cm)
      </Typography>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
       <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
       <NumberInput source="dm_elbow"fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <NumberInput source="dm_knee"fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <NumberInput source="dm_wrist"fullWidth />
      </Box>
      </Box>
      <Typography variant="h6" gutterBottom>
      Somatotipo de referencia
      </Typography>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <NumberInput source="x"fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <NumberInput source="y"fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <DateInput source="creatinine"fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <NumberInput source="fitness_level"fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <TextInput source="t3_t4"fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
        <TextInput source="triglycerides" fullWidth/>
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
       <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
       <TextInput source="uric_acid"fullWidth />
       </Box>
      </Box>
    </SimpleForm>
  </Create>
);
