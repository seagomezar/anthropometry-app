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
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const Separator = () => <Box pt="1em" />;

export const FoodList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <NumberField source="calories" />
      <NumberField source="chos" />
      <TextField source="description" />
      <NumberField source="fat" />
      <TextField source="measure_unit" />
      <NumberField source="protein" />
      <NumberField source="quantity" />
      <DateField source="updated_at" />
      <DateField source="created_at" />
    </Datagrid>
  </List>
);

export const FoodEdit = () => (
  <Edit>
    <SimpleForm sx={{ maxWidth: 600 }}>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <NumberInput source="calories"fullWidth />
      </Box>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <NumberInput source="chos"fullWidth />
      </Box>
     </Box>
     <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <TextInput source="description"fullWidth />
      </Box>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <NumberInput source="fat"fullWidth />
      </Box>
     </Box>
     <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <TextInput source="measure_unit"fullWidth />
      </Box>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <NumberInput source="protein"fullWidth />
      </Box>
     </Box>
     <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <NumberInput source="quantity"fullWidth />
     </Box>
     </Box>
    </SimpleForm>
  </Edit>
);
export const FoodCreate = () => (
  <Create>
    <SimpleForm sx={{ maxWidth: 600 }}>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <NumberInput source="calories"fullWidth />
      </Box>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <NumberInput source="chos"fullWidth />
      </Box>
     </Box>
     <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <TextInput source="description"fullWidth />
      </Box>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <NumberInput source="fat"fullWidth />
      </Box>
     </Box>
     <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <TextInput source="measure_unit"fullWidth />
      </Box>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <NumberInput source="protein"fullWidth />
      </Box>
     </Box>
     <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
     <NumberInput source="quantity"fullWidth />
     </Box>
     </Box>
    </SimpleForm>
  </Create>
);
