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
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="firstname" />
          <TextField source="lastname" />
          <EmailField source="email" />
          <TextField source="phone" />
          <TextField source="address" />
          <TextField source="birthday" />
          <TextField source="genre" />
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
export const UserEdit = () => (
  <Edit title={<UserTitle />}>
    <SimpleForm sx={{ maxWidth: 500 }}>
      <Typography variant="h6" gutterBottom>
        Identity
      </Typography>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="firstname" isRequired fullWidth />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="lastname" isRequired fullWidth />
        </Box>
      </Box>
      <TextInput type="genre" source="genre" isRequired fullWidth />
      <TextInput type="email" source="email" isRequired fullWidth />
      <DateInput source="birthday" />
      <Separator />

      <Typography variant="h6" gutterBottom>
        Address & Phone
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
        Password
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

// TODO: Para los usuarios eliminar el campo image y anadir el campo birthday, Recuerda actualizar las tablas y formularios

export const UserCreate = () => (
  <Create>
    <SimpleForm sx={{ maxWidth: 500 }}>
      <Typography variant="h6" gutterBottom>
        Identity
      </Typography>
      <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="firstname" isRequired fullWidth />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
          <TextInput source="lastname" isRequired fullWidth />
        </Box>
      </Box>
      <TextInput type="genre" source="genre" isRequired fullWidth />
      <TextInput type="email" source="email" isRequired fullWidth />
      <DateInput source="birthday" />
      <Separator />

      <Typography variant="h6" gutterBottom>
        Address & Phone
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
        Password
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
