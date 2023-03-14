import React from "react";
import {
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
  useTranslate,
  ReferenceInput,
} from "react-admin";
import Box from "@mui/material/Box";

export const SkillTestEdit = () => {
  const translate = useTranslate();
  return (
    <Edit>
      <SimpleForm sx={{ maxWidth: 600 }}>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <NumberInput source="cod_sin" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <NumberInput source="cod_con_el" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <NumberInput source="diff_percentage" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <NumberInput source="d_der" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <NumberInput source="d_izq" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <NumberInput source="tl" fullWidth />
          </Box>
          </Box>
          <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <ReferenceInput
              source="athlete_id"
              reference="athlete"
              fullWidth
            />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <TextInput source="position" fullWidth />
          </Box>
        </Box>
      </SimpleForm>
    </Edit>
  );
};