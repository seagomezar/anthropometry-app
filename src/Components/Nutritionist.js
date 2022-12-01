import React from 'react';
import {
  Datagrid,
  DateField,
  EmailField,
  List,
  TextField,
  DateInput,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  Show,
  SimpleShowLayout,
} from 'react-admin';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const Separator = () => <Box pt="1em" />;
export const NutritionistList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="address" />
      <EmailField source="email" />
      <TextField source="firstname" />
      <TextField source="lastname" />
      <TextField source="phone" />
      <DateField source="updated_at" />
      <DateField source="created_at" />
    </Datagrid>
  </List>
);

export const NutritionistEdit = () => (
  <Edit>
    <SimpleForm sx={{ maxWidth: 600 }}>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <TextInput source="firstname"fullWidth />
    </Box>
    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <TextInput source="lastname"fullWidth />
      </Box>
    </Box>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <TextInput source="address"fullWidth />
      </Box>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <TextInput source="email"fullWidth />
      </Box>
    </Box>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}> 
     <TextInput source="phone"fullWidth />
     </Box>
    </Box>
    </SimpleForm>
  </Edit>
);
export const NutritionistCreate = () => (
  <Create>
      <SimpleForm sx={{ maxWidth: 600 }}>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <TextInput source="firstname"fullWidth />
    </Box>
    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <TextInput source="lastname"fullWidth />
      </Box>
    </Box>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <TextInput source="address"fullWidth />
      </Box>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <TextInput source="email"fullWidth />
      </Box>
    </Box>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}> 
     <TextInput source="phone"fullWidth />
     </Box>
    </Box>
    </SimpleForm>
  </Create>
);

export const NutritionistShow = () => (
  <Show>
     <SimpleShowLayout sx={{ maxWidth: 500 }}>
     <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <TextField source="firstname"fullWidth />
    </Box>
    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <TextField source="lastname"fullWidth />
      </Box>
    </Box>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <TextField source="address"fullWidth />
      </Box>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <TextField source="email"fullWidth />
      </Box>
    </Box>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}> 
     <TextField source="phone"fullWidth />
     </Box>
    </Box>
    </SimpleShowLayout>
  </Show>
)