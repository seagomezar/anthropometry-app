import React from 'react';
import {
  Datagrid,
  DateField,
  List,
  NumberField,
  TextField,
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
  EditButton,
  DeleteButton,
} from 'react-admin';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
        <EditButton />
        <DeleteButton />
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

export const ReferencedSomatotypeShow = () => {
  const translate = useTranslate();
  return (
    <Show>
      <SimpleShowLayout sx={{ maxWidth: 600 }}>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate(
                'resources.referenced_somatotype.fields.sport'
              )}
            </Typography>
            <TextField source="sport" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate(
                'resources.referenced_somatotype.fields.gender'
              )}
            </Typography>
            <TextField source="gender" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate(
                'resources.referenced_somatotype.fields.endomorph'
              )}
            </Typography>
            <NumberField source="endomorph" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate(
                'resources.referenced_somatotype.fields.mesomorph'
              )}
            </Typography>
            <NumberField source="mesomorph" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate(
                'resources.referenced_somatotype.fields.ectomortph'
              )}
            </Typography>
            <NumberField source="ectomortph" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.referenced_somatotype.fields.x')}
            </Typography>
            <NumberField source="x" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.referenced_somatotype.fields.y')}
            </Typography>
            <NumberField source="y" fullWidth />
          </Box>
        </Box>
      </SimpleShowLayout>
    </Show>
  );
};
