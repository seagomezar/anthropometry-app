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

export const SkillTestShow = () => {
  const translate = useTranslate();
  return (
    <Show>
      <SimpleShowLayout sx={{ maxWidth: 600 }}>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.skill_test.fields.cod_sin")}
            </Typography>
            <NumberField source="cod_sin" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.skill_test.fields.cod_con_el")}
            </Typography>
            <NumberField source="cod_con_el" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.skill_test.fields.diff_percentage")}
            </Typography>
            <NumberField source="diff_percentage" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.skill_test.fields.d_der")}
            </Typography>
            <NumberField source="d_der" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.skill_test.fields.d_izq")}
            </Typography>
            <NumberField source="d_izq" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.skill_test.fields.tl")}
            </Typography>
            <NumberField source="tl" fullWidth />
          </Box>
          </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.skill_test.fields.athlete_id")}
            </Typography>
            <NumberField source="athlete_id" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <Typography variant="h6" gutterBottom>
              {translate("resources.skill_test.fields.position")}
            </Typography>
            <TextField source="position" fullWidth />
          </Box>
        </Box>
      </SimpleShowLayout>
    </Show>
  );
};
