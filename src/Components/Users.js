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
  ReferenceInput,
  SimpleList,
  Filter,
  DeleteButton,
  ImageField,
  useTranslate,
  Show,
  SimpleShowLayout,
} from 'react-admin';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';

const UserTitle = () => {
  const record = useRecordContext();

  return (
    <span>
      User {record ? `"${record.firstname} ${record.lastname}"` : ''}
    </span>
  );
};

const userFilters = [
  <TextInput label="Search" source="firstname@_like" alwaysOn />,
];

const Separator = () => <Box pt="1em" />;

export const UserList = () => {
  const isSmall = useMediaQuery((theme) =>
    theme.breakpoints.down('sm')
  );
  return (
    <List filters={userFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) =>
            record.firstname + ' ' + record.lastname
          }
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField source="id" />
          <TextField source="firstname" />
          <TextField source="lastname" />
          <EmailField source="email" />
          <TextField source="phone" />
          <TextField source="address" />
          <TextField source="birthday" />
          <TextField source="gender" />
          <DateField source="created_at" />
          <DateField source="updated_at" />
          <EditButton />
          <DeleteButton />
        </Datagrid>
      )}
    </List>
  );
};

// TODO: Añadir el id a todos los formularios de edicion
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
  return (
    <Show>
      <SimpleShowLayout sx={{ maxWidth: 500 }}>
      <Typography variant="h6" gutterBottom>
          {translate('myroot.identity')}
        </Typography>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <TextField source="firstname" />
          </Box>     
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
            <TextField source="lastname" />
          </Box>
        <TextField type="email" source="email" />
        <TextField
            type="gender"
            source="gender"
          />
          <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
            <DateField source="birthday" />
          </Box>
          
          <Separator />
          
        <Separator />
        <Typography variant="h6" gutterBottom>
          {translate('myroot.addressAndPhone')}
        </Typography>
        <TextField
          source="address"
          helperText={false}
        />
        <TextField source="phone" fullWidth helperText={false} />
        <Separator />

        <Typography variant="h6" gutterBottom>
          {translate('myroot.password')}
        </Typography>
        <Box display={{ xs: 'block', sm: 'flex' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <TextField source="password" fullWidth />
          </Box>
        </Box>
      </SimpleShowLayout>
    </Show>
  );
};