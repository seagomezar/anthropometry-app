import React from "react";
import {
  SimpleForm,
  Create,
  ReferenceInput,
  NumberInput,
  TimeInput,
  AutocompleteInput,
} from "react-admin";
import Box from "@mui/material/Box";

const filterToQuery = (searchText) => ({
  description: `%${searchText}%`,
});
export const PrescribedFoodCreate = () => (
  <Create>
    <SimpleForm sx={{ maxWidth: 600 }}>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <ReferenceInput source="plan_id" reference="plan" fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <ReferenceInput source="food_id" reference="food" fullWidth>
            <AutocompleteInput filterToQuery={filterToQuery} />
          </ReferenceInput>
        </Box>
      </Box>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <TimeInput source="eating_moment_time" fullWidth />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <ReferenceInput
            source="eating_moment_name"
            reference="eating_moment"
            fullWidth
          />
        </Box>
      </Box>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <NumberInput source="prescribed_quantity" fullWidth />
        </Box>
      </Box>
    </SimpleForm>
  </Create>
);
