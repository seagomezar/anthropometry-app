import React from "react";
import {
  TextInput,
  List,
  SimpleList,
  ReferenceField,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  EditButton,
  DeleteButton,
} from "react-admin";
import { useMediaQuery, Card, CardContent, Typography, Box } from "@mui/material";

const userFilters = [
  <TextInput label="Search" source="firstname@_like" alwaysOn />,
];

const UserRow = ({ record }) => {
  return (
    <Card>
      <CardContent>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" padding={2}>
          <Typography variant="h6">
            {record.firstname} {record.lastname}
          </Typography>
          <Typography>Email: {record.email}</Typography>
          <Typography>Phone: {record.phone}</Typography>
          <Typography>Address: {record.address}</Typography>
          <Typography>Birthday: {record.birthday}</Typography>
          <Typography>Gender: {record.gender}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export const UserList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <List filters={userFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.firstname + " " + record.lastname}
          linkType="show"
          secondaryText={(record) => record.email}
          rowStyle={(record) => ({ backgroundColor: record.gender ? "lightblue" : "pink" })}
          row={<UserRow />}
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
          <ReferenceField source="nutritionist_id" reference="nutritionist" />
          <DateField source="created_at" />
          <DateField source="updated_at" />
          <EditButton />
          <DeleteButton />
        </Datagrid>
      )}
    </List>
  );
};
