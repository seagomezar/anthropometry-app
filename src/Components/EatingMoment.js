import React from 'react';
import {
  Datagrid,
  DateField,
  List,
  TextField,
  DateInput,
  Edit,
  SimpleForm,
  TextInput,
  Create,
} from 'react-admin';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';

const Separator = () => <Box pt="1em" />;


export const EatingMomentList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <DateField source="created_at" />
      <TextField source="name" />
      <TextField source="time" />
      <DateField source="updated_at" />
      <DateField source="created_at" />
    </Datagrid>
  </List>
);

export const EatingMomentEdit = () => (
  <Edit>
    <SimpleForm sx={{ maxWidth: 600 }}>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <TextInput source="name"fullWidth />
      </Box>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <TextInput source="time"fullWidth />
      </Box>
    </Box>
    </SimpleForm>
  </Edit>
);

export const EatingMomentCreate = () => (
  <Create>
    <SimpleForm sx={{ maxWidth: 600 }}>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <TextInput source="name"fullWidth />
      </Box>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <TextInput source="time"fullWidth />
      </Box>
    </Box>
    </SimpleForm>
  </Create>
);
