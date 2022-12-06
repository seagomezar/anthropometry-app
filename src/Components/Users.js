import React from 'react';
import {
  Datagrid,
  DateField,
  EditButton,
  EmailField,
  List,
  TextField,
  DateInput,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  PasswordInput,
  useRecordContext,
  SimpleList,
  DeleteButton,
  ReferenceManyField,
  useTranslate,
  Show,
  SimpleShowLayout,
  NumberField,
  ReferenceField,
  Tab,
  TabbedShowLayout,
} from 'react-admin';
import { Typography, Box } from '@mui/material';
import { Empty } from './Empty';
import LineChartField from './LineChartField';
import { Separator } from './Separator';

const UserTitle = () => {
  const record = useRecordContext();

  return (
    <span>
      User {record ? `"${record.firstname} ${record.lastname}"` : ''}
    </span>
  );
};

export const UserEdit = () => {
  const translate = useTranslate();
  return (
    <Edit title={<UserTitle />}>
      <SimpleForm sx={{ maxWidth: 500 }}>
        <Typography variant="h6" gutterBottom>
          {translate('myroot.identity')}
        </Typography>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <TextInput source="firstname" isRequired fullWidth />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
            <TextInput source="lastname" isRequired fullWidth />
          </Box>
        </Box>
        <TextInput
          type="gender"
          source="gender"
          isRequired
          fullWidth
        />
        <TextInput type="email" source="email" isRequired fullWidth />
        <DateInput source="birthday" />
        <Separator />

        <Typography variant="h6" gutterBottom>
          {translate('myroot.addressAndPhone')}
        </Typography>
        <TextInput
          source="address"
          multiline
          fullWidth
          helperText={false}
        />
        <TextInput source="phone" fullWidth helperText={false} />
        <Separator />

        <Typography variant="h6" gutterBottom>
          {translate('myroot.password')}
        </Typography>
        <Box display={{ xs: 'block', sm: 'flex' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <PasswordInput source="password" fullWidth />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
            <PasswordInput source="confirm_password" fullWidth />
          </Box>
        </Box>
      </SimpleForm>
    </Edit>
  );
};

export const UserCreate = () => {
  const translate = useTranslate();
  return (
    <Create>
      <SimpleForm sx={{ maxWidth: 500 }}>
        <Typography variant="h6" gutterBottom>
          {translate('myroot.identity')}
        </Typography>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <TextInput source="firstname" isRequired fullWidth />
          </Box>
          <TextInput
            type="gender"
            source="gender"
            isRequired
            fullWidth
          />
          <TextInput
            type="email"
            source="email"
            isRequired
            fullWidth
          />
          <DateInput source="birthday" />
          <Separator />
          <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
            <TextInput source="lastname" isRequired fullWidth />
          </Box>
        </Box>
        <TextInput type="email" source="email" isRequired fullWidth />
        <DateInput source="birthday" />
        <Separator />
        <Typography variant="h6" gutterBottom>
          {translate('myroot.addressAndPhone')}
        </Typography>
        <TextInput
          source="address"
          multiline
          fullWidth
          helperText={false}
        />
        <TextInput source="phone" fullWidth helperText={false} />
        <Separator />

        <Typography variant="h6" gutterBottom>
          {translate('myroot.password')}
        </Typography>
        <Box display={{ xs: 'block', sm: 'flex' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <PasswordInput source="password" fullWidth />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
            <PasswordInput source="confirm_password" fullWidth />
          </Box>
        </Box>
      </SimpleForm>
    </Create>
  );
};

export const UserShow = () => {
  const translate = useTranslate();
  const record = useRecordContext();
  return (
    <Show>
      <SimpleShowLayout sx={{ maxWidth: 500 }}>
        <Typography variant="h6" gutterBottom>
          {translate('myroot.identity')}
        </Typography>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.user.fields.firstname')}
            </Typography>
            <TextField source="firstname" />
          </Box>
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
          <Typography variant="h6" gutterBottom>
            {translate('resources.user.fields.lastname')}
          </Typography>
          <TextField source="lastname" />
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.user.fields.email')}
            </Typography>
            <TextField source="email" />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.user.fields.gender')}
            </Typography>
            <TextField source="gender" />
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.user.fields.birthday')}
            </Typography>
            <DateField source="birthday" />
          </Box>
        </Box>
        <Separator />

        <Separator />
        <Typography variant="h6" gutterBottom>
          {translate('myroot.addressAndPhone')}
        </Typography>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.user.fields.address')}
            </Typography>
            <TextField source="address" />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('resources.user.fields.phone')}
            </Typography>
            <TextField source="phone" fullWidth />
          </Box>
        </Box>
        <Separator />

        <Box display={{ xs: 'block', sm: 'flex' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <Typography variant="h6" gutterBottom>
              {translate('myroot.password')}
            </Typography>
            <TextField source="password" fullWidth />
          </Box>
        </Box>
        <Separator />
        <TabbedShowLayout>
          <Tab label="Lista de Mediciones">
            <ReferenceManyField
              label={translate('resources.user.fields.measurements')}
              reference="measurement"
              target="user_id"
            >
              <Datagrid empty={<Empty />}>
                <NumberField source="control" />
                <ReferenceField
                  source="referenced_somatotype_id"
                  reference="referenced_somatotype"
                  fullWidth
                />
                <NumberField source="weight" />
                <NumberField source="height" />
                <DateField source="evaluation_date" />
              </Datagrid>
            </ReferenceManyField>
          </Tab>
          <Tab label="Comparar Medidas" path="body">
            <LineChartField source="id" />
          </Tab>
        </TabbedShowLayout>

        <Separator />
        <ReferenceManyField
          label={translate('resources.user.fields.plans')}
          reference="plan"
          target="user_id"
        >
          <Datagrid empty={<Empty />} rowClick="show">
            <NumberField source="id" />
            <TextField source="comments" />
            <ReferenceField
              source="goal_id"
              reference="goal"
              fullWidth
            />
            <DateField source="created_at" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};
