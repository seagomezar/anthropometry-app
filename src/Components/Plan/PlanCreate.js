import React from 'react';
import {
  ReferenceInput,
  SimpleForm,
  TextInput,
  Create,
} from 'react-admin';
import { Box, } from '@mui/material';

export const PlanCreate = () => (
  <Create>
    <SimpleForm sx={{ maxWidth: 600 }}>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="comments" fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <ReferenceInput
            source="goal_id"
            reference="goal"
            fullWidth
          />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <ReferenceInput
            source="user_id"
            reference="user"
            fullWidth
          />
        </Box>
      </Box>
    </SimpleForm>
  </Create>
);
