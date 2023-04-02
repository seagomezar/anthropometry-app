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

export const PhysicalTestCreate = () => {
  const translate = useTranslate();
  return (
    <Create>
      <SimpleForm sx={{ maxWidth: 600 }}>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <TextInput source="position" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <NumberInput source="weight" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <NumberInput source="height" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <NumberInput source="wingspan" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <NumberInput source="five_mt" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <NumberInput source="ten_mt" fullWidth />
          </Box>
          </Box>
          {/*<Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <NumberInput source="t_test_left" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <NumberInput source="t_test_right" fullWidth />
          </Box>
  </Box>*/}
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <NumberInput source="cmj" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <NumberInput source="legger" fullWidth />
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
