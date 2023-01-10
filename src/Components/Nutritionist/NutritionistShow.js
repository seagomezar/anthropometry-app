import React from "react";
import { TextField, useTranslate, Show, SimpleShowLayout } from "react-admin";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const NutritionistShow = () => {
  const translate = useTranslate();
  return (
    <Show>
      <SimpleShowLayout sx={{ maxWidth: 500 }}>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.nutritionist.fields.firstname")}
            </Typography>
            <TextField source="firstname" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.nutritionist.fields.lastname")}
            </Typography>
            <TextField source="lastname" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.nutritionist.fields.address")}
            </Typography>
            <TextField source="address" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.nutritionist.fields.email")}
            </Typography>
            <TextField source="email" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.nutritionist.fields.phone")}
            </Typography>
            <TextField source="phone" fullWidth />
          </Box>
        </Box>
      </SimpleShowLayout>
    </Show>
  );
};
