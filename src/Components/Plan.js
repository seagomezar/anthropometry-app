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
  Create,
} from 'react-admin';

export const PlanList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="comments" />
      <DateField source="created_at" />
      <ReferenceField source="goal_id" reference="goals" />
      <DateField source="updated_at" />
      <ReferenceField source="user_id" reference="users" />
    </Datagrid>
  </List>
);

export const PlanEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="comments" />
      <ReferenceInput source="goal_id" reference="goals" />
      <ReferenceInput source="user_id" reference="users" />
    </SimpleForm>
  </Edit>
);
export const PlanCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="comments" />
      <ReferenceInput source="goal_id" reference="goals" />
      <ReferenceInput source="user_id" reference="users" />
    </SimpleForm>
  </Create>
);
