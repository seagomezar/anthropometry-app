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
  useTranslate,
  Create,
  Show,
  SimpleShowLayout,
} from 'react-admin';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';

const Separator = () => <Box pt="1em" />;


export const EatingMomentList = () => (
  <List>
    <Datagrid rowClick="show">
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

export const EatingMomentShow = () => {
  const translate = useTranslate();
  return (
 <Show>
   <SimpleShowLayout sx={{ maxWidth: 500 }}>
   <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <Typography variant="h6" gutterBottom>
              {translate('resources.eating_moment.fields.name')}
            </Typography>
      <TextField source="name"fullWidth />
      </Box>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <Typography variant="h6" gutterBottom>
              {translate('resources.eating_moment.fields.time')}
            </Typography>
      <TextField source="time"fullWidth />
      </Box>
    </Box>
   </SimpleShowLayout>
 </Show>
  );
};