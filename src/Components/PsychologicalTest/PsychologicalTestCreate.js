import React from "react";
import {
  NumberInput,
  SimpleForm,
  TextInput,
  Create,
  useTranslate,
  ReferenceInput,
  AutocompleteInput
} from "react-admin";
import Box from "@mui/material/Box";

export const PsychologicalTestCreate = () => {
  const translate = useTranslate();
  return (
    <Create>
      <SimpleForm sx={{ maxWidth: 600 }}>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="min_5_no_pert" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <NumberInput source="min_5_with_pert" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <ReferenceInput
              source="athlete_id"
              reference="athlete"
              fullWidth
            >
              <AutocompleteInput optionText="name" optionValue="id" filterToQuery={searchText => ({name: searchText})} />
            </ReferenceInput>
          </Box>
        </Box>
      </SimpleForm>
    </Create>
  );
};
