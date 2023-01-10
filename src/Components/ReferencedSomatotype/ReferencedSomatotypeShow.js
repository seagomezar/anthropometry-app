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

export const ReferencedSomatotypeShow = () => {
  const translate = useTranslate();
  return (
    <Show>
      <SimpleShowLayout sx={{ maxWidth: 600 }}>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.referenced_somatotype.fields.sport")}
            </Typography>
            <TextField source="sport" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.referenced_somatotype.fields.gender")}
            </Typography>
            <TextField source="gender" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.referenced_somatotype.fields.endomorph")}
            </Typography>
            <NumberField source="endomorph" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.referenced_somatotype.fields.mesomorph")}
            </Typography>
            <NumberField source="mesomorph" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.referenced_somatotype.fields.ectomortph")}
            </Typography>
            <NumberField source="ectomortph" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.referenced_somatotype.fields.x")}
            </Typography>
            <NumberField source="x" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.referenced_somatotype.fields.y")}
            </Typography>
            <NumberField source="y" fullWidth />
          </Box>
        </Box>
      </SimpleShowLayout>
    </Show>
  );
};
