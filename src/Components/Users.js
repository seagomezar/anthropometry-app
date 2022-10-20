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
          {/*<ImageField source="image" title="firstname" />*/}
          <TextField source="phone" />
          <TextField source="address" />
          <DateField source="created_at" />
          <DateField source="updated_at" />
          <EditButton />
          <DeleteButton />
        </Datagrid>
      )}
    </List>
  );
};

export const UserEdit = () => (
  <Edit title={<UserTitle />}>
    <SimpleForm>
      <TextInput source="address" />
      <TextInput source="email" />
      <TextInput source="firstname" />
      {/*<TextInput source="image" />*/}
      <TextInput source="lastname" />
      <TextInput source="password" />
      <TextInput source="phone" />
    </SimpleForm>
  </Edit>
);

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="address" />
      <TextInput source="email" />
      <TextInput source="firstname" />
      <TextInput source="image" />
      <TextInput source="lastname" />
      <PasswordInput source="password" />
      <TextInput source="phone" />
    </SimpleForm>
  </Create>
);
