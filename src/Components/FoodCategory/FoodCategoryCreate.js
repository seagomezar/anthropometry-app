import React from "react";
import { SimpleForm, TextInput, Create } from "react-admin";
import Box from "@mui/material/Box";

export const FoodCategoryCreate = () => (
  <Create>
    <SimpleForm sx={{ maxWidth: 600 }}>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <TextInput source="name" fullWidth />
        </Box>
      </Box>
    </SimpleForm>
  </Create>
);
