import React from 'react';
import {
  Datagrid,
  DateField,
  List,
  ReferenceField,
  TextField,
  DateInput,
  Edit,
  ReferenceInput,
  SimpleForm,
  TextInput,
  useTranslate,
  Create,
  Show,
  SimpleShowLayout,
} from 'react-admin';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const Separator = () => <Box pt="1em" />;


export const PlanList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="comments" />
      <ReferenceField source="goal_id" reference="goal" />
      <ReferenceField source="user_id" reference="user" />
      <DateField source="created_at" /> 
      <DateField source="updated_at" />
    </Datagrid>
  </List>
);

export const PlanEdit = () => (
  <Edit>
    <SimpleForm sx={{ maxWidth: 600 }}>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <TextInput source="comments"fullWidth />
      </Box>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <ReferenceInput source="goal_id" reference="goal"fullWidth />
      </Box>
    </Box>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <ReferenceInput source="user_id" reference="user"fullWidth />
      </Box>
    </Box>
    </SimpleForm>
  </Edit>
);
export const PlanCreate = () => (
  <Create>
   <SimpleForm sx={{ maxWidth: 600 }}>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <TextInput source="comments"fullWidth />
      </Box>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <ReferenceInput source="goal_id" reference="goal"fullWidth />
      </Box>
    </Box>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <ReferenceInput source="user_id" reference="user"fullWidth />
      </Box>
    </Box>
    </SimpleForm>
  </Create>
);

export const PlanShow = () => {
  const translate = useTranslate();
  return (
  <Show>
    <SimpleShowLayout sx={{ maxWidth: 500 }}>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <Typography variant="h6" gutterBottom>
              {translate('resources.plan.fields.comments')}
            </Typography>
      <TextField source="comments"fullWidth />
      </Box>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <Typography variant="h6" gutterBottom>
              {translate('resources.plan.fields.goal_id')}
            </Typography>
      <TextField source="goal_id" reference="goal"fullWidth />
      </Box>
    </Box>
    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
      <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
      <Typography variant="h6" gutterBottom>
              {translate('resources.plan.fields.user_id')}
            </Typography>
      <TextField source="user_id" reference="user"fullWidth />
      </Box>
    </Box>
    </SimpleShowLayout>
  </Show>
  );
};
