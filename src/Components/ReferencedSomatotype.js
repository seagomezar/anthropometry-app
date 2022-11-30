import React from 'react';
import {
  Datagrid,
  DateField,
  List,
  NumberField,
  TextField,
  DateInput,
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
  Create,
} from 'react-admin';
import Box from '@mui/material/Box';


const Separator = () => <Box pt="1em" />;

export const ReferencedSomatotypeList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="sport" />
      <TextField source="gender" />
      <NumberField source="endomorph" />
      <NumberField source="mesomorph" />
      <NumberField source="ectomorph" />
      <NumberField source="x" />
      <NumberField source="y" />
      <DateField source="updated_at" />
      <DateField source="created_at" />
    </Datagrid>
  </List>
);

export const ReferencedSomatotypeEdit = () => (
  <Edit>
    <SimpleForm sx={{ maxWidth: 600 }}>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <TextField source="sport"fullWidth />
     </Box>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <TextField source="gender"fullWidth />
     </Box>
    </Box>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <NumberField source="endomorph"fullWidth />
      </Box>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <NumberField source="mesomorph"fullWidth />
      </Box>
    </Box>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
    <NumberField source="ectomorph"fullWidth />
    </Box>
    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
    <NumberField source="x"fullWidth />
    </Box>
    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
    <NumberField source="y"fullWidth />
    </Box>
    </Box>
    </SimpleForm>
  </Edit>
);
export const ReferencedSomatotypeCreate= () => (
  <Create>
   <SimpleForm sx={{ maxWidth: 600 }}>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <TextField source="sport"fullWidth />
     </Box>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <TextField source="gender"fullWidth />
     </Box>
    </Box>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <NumberField source="endomorph"fullWidth />
      </Box>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <NumberField source="mesomorph"fullWidth />
      </Box>
    </Box>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
    <NumberField source="ectomorph"fullWidth />
    </Box>
    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
    <NumberField source="x"fullWidth />
    </Box>
    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
    <NumberField source="y"fullWidth />
    </Box>
    </Box>
    </SimpleForm>
  </Create>
);
