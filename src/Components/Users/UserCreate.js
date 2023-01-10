import React from "react";
import {
  DateInput,
  SimpleForm,
  ReferenceInput,
  TextInput,
  Create,
  PasswordInput,
  useTranslate,
  SelectInput,
} from "react-admin";
import { Typography, Box } from "@mui/material";
import { Separator } from "../Separator";

export const UserCreate = () => {
  const translate = useTranslate();
  return (
    <Create>
      <SimpleForm sx={{ maxWidth: 500 }}>
        <Typography variant="h6" gutterBottom>
          {translate("myroot.identity")}
        </Typography>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="firstname" isRequired fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <SelectInput
                source="gender"
                choices={[
                  { id: true, name: translate("myroot.male") },
                  { id: false, name: translate("myroot.female") },
                ]}
              />
            </Box>
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="lastname" isRequired fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <ReferenceInput
              source="nutritionist_id"
              reference="nutritionist"
              fullWidth
            />
          </Box>
        </Box>
        <Separator />
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput type="email" source="email" isRequired fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <DateInput source="birthday" />
          </Box>
        </Box>
        <Separator />
        <Typography variant="h6" gutterBottom>
          {translate("myroot.addressAndPhone")}
        </Typography>
        <TextInput source="address" multiline fullWidth helperText={false} />
        <TextInput source="phone" fullWidth helperText={false} />
        <Separator />

        <Typography variant="h6" gutterBottom>
          {translate("myroot.password")}
        </Typography>
        <Box display={{ xs: "block", sm: "flex" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <PasswordInput source="password" fullWidth />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <PasswordInput source="confirm_password" fullWidth />
          </Box>
        </Box>
      </SimpleForm>
    </Create>
  );
};
