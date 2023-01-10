import React from "react";
import { ReferenceInput, SimpleForm, Create } from "react-admin";
import Box from "@mui/material/Box";

export const FoodHasFoodCategoryCreate = () => (
  <Create>
    <SimpleForm sx={{ maxWidth: 600 }}>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <ReferenceInput
            source="food_category_id"
            reference="food_category"
            fullWidth
          />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <ReferenceInput source="food_id" reference="food" fullWidth />
        </Box>
      </Box>
    </SimpleForm>
  </Create>
);
