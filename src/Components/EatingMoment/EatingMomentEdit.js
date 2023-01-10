import React from "react";
import { Edit, SimpleForm, TextInput } from "react-admin";
import Box from "@mui/material/Box";

export const EatingMomentEdit = () => (
  <Edit>
    <SimpleForm sx={{ maxWidth: 600 }}>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <TextInput source="name" fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <TextInput source="time" fullWidth />
        </Box>
      </Box>
    </SimpleForm>
  </Edit>
);
