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
  SelectField,
  SelectInput,
  useTranslate,
  Show,
  SimpleShowLayout,
} from 'react-admin';
import Box from '@mui/material/Box';

const Separator = () => <Box pt="1em" />;

export const ReferencedSomatotypeList = () => {
  const translate = useTranslate();
  return (
    <List>
      <Datagrid rowClick="show">
        <TextField source="id" />
        <TextField source="sport" />
        <SelectField
          source="gender"
          choices={[
            { id: true, name: translate('myroot.male') },
            { id: false, name: translate('myroot.female') },
          ]}
        />
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
};

export const ReferencedSomatotypeEdit = () => {
  const translate = useTranslate();
  return (
    <Edit>
      <SimpleForm sx={{ maxWidth: 600 }}>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <TextInput source="sport" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <SelectInput
              source="gender"
              choices={[
                { id: true, name: translate('myroot.male') },
                { id: false, name: translate('myroot.female') },
              ]}
            />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="endomorph" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="mesomorph" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="ectomorph" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="x" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="y" fullWidth />
          </Box>
        </Box>
      </SimpleForm>
    </Edit>
  );
};
export const ReferencedSomatotypeCreate = () => {
  const translate = useTranslate();
  return (
  <Create>
    <SimpleForm sx={{ maxWidth: 600 }}>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <TextInput source="sport" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <SelectInput
              source="gender"
              choices={[
                { id: true, name: translate('myroot.male') },
                { id: false, name: translate('myroot.female') },
              ]}
            />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="endomorph" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="mesomorph" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="ectomorph" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="x" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <NumberInput source="y" fullWidth />
          </Box>
        </Box>
      </SimpleForm>
  </Create>
 );
};

export const ReferencedSomatotypeShow = () => (
  <Show>
    <SimpleShowLayout sx={{ maxWidth: 600 }}>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <TextField source="sport" fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <TextField source="gender" fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <NumberField source="endomorph" fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <NumberField source="mesomorph" fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <NumberField source="ectomorph" fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <NumberField source="x" fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <NumberField source="y" fullWidth />
        </Box>
      </Box>
    </SimpleShowLayout>
  </Show>
);
