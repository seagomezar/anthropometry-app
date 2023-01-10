import React from "react";
import { Edit, ReferenceInput, SimpleForm } from "react-admin";
import Box from "@mui/material/Box";

export const FoodHasEatingMomentEdit = () => (
  <Edit>
    <SimpleForm sx={{ maxWidth: 600 }}>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <ReferenceInput source="eating_moment_id" reference="eating_moment" />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <ReferenceInput source="food_id" reference="food" fullWidth />
        </Box>
      </Box>
    </SimpleForm>
  </Edit>
);
