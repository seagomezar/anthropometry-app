import {
  Datagrid,
  DateField,
  List,
  TextField,
  DateInput,
  Edit,
  SimpleForm,
  TextInput,
} from 'react-admin';

export const FoodCategoryList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <DateField source="created_at" />
      <TextField source="name" />
      <DateField source="updated_at" />
    </Datagrid>
  </List>
);

export const FoodCategoryEdit = () => (
  <Edit>
    <SimpleForm>
      <DateInput source="created_at" />
      <TextInput source="name" />
      <DateInput source="updated_at" />
    </SimpleForm>
  </Edit>
);
