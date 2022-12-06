import React from 'react';
import {
  Datagrid,
  DateField,
  List,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  useTranslate,
  Create,
  Show,
  SimpleShowLayout,
  EditButton,
  DeleteButton,
} from 'react-admin';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const GoalList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
      <DateField source="updated_at" />
      <DateField source="created_at" />
      <EditButton />
          <DeleteButton />
    </Datagrid>
  </List>
);

export const GoalEdit = () => (
  <Edit>
    <SimpleForm sx={{ maxWidth: 600 }}>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="name" fullWidth />
        </Box>
      </Box>
    </SimpleForm>
  </Edit>
);
export const GoalCreate = () => (
  <Create>
    <SimpleForm sx={{ maxWidth: 600 }}>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="name" fullWidth />
        </Box>
      </Box>
    </SimpleForm>
  </Create>
);

export const GoalShow = () => {
  const translate = useTranslate();
  return (
    <Show>
      <SimpleShowLayout sx={{ maxWidth: 500 }}>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.goal.fields.name')}
            </Typography>
            <TextField source="name" fullWidth />
          </Box>
        </Box>
      </SimpleShowLayout>
    </Show>
  );
};
