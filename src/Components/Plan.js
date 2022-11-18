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
      <ReferenceField source="goal_id" reference="goal" />
      <ReferenceField source="user_id" reference="user" />
      <DateField source="created_at" /> 
      <DateField source="updated_at" />
    </Datagrid>
  </List>
);

export const PlanEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="comments" />
      <ReferenceInput source="goal_id" reference="goal" />
      <ReferenceInput source="user_id" reference="user" />
    </SimpleForm>
  </Edit>
);
export const PlanCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="comments" />
      <ReferenceInput source="goal_id" reference="goal" />
      <ReferenceInput source="user_id" reference="user" />
    </SimpleForm>
  </Create>
);
