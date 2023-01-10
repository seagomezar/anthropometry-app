import React from "react";
import { NumberInput, SimpleForm, TextInput, Create } from "react-admin";
import Box from "@mui/material/Box";

export const FoodCreate = () => (
  <Create>
    <SimpleForm sx={{ maxWidth: 600 }}>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <NumberInput source="calories" fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <NumberInput source="chos" fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <TextInput source="description" fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <NumberInput source="fat" fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <TextInput source="measure_unit" fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <NumberInput source="protein" fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <NumberInput source="quantity" fullWidth />
        </Box>
      </Box>
    </SimpleForm>
  </Create>
);
