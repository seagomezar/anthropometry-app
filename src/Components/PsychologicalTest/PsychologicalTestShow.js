import React from "react";
import {
  NumberField,
  TextField,
  useTranslate,
  Show,
  SimpleShowLayout,
} from "react-admin";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const PsychologicalTestShow = () => {
  const translate = useTranslate();
  return (
    <Show>
      <SimpleShowLayout sx={{ maxWidth: 600 }}>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <Typography variant="h6" gutterBottom>
              {translate("resources.physical_test.fields.position")}
            </Typography>
            <TextField source="min_5_no_pert" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.physical_test.fields.weight")}
            </Typography>
            <NumberField source="min_5_with_pert" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.physical_test.fields.athlete_id")}
            </Typography>
            <NumberField source="athlete_id" fullWidth />
          </Box>
        </Box>
      </SimpleShowLayout>
    </Show>
  );
};
