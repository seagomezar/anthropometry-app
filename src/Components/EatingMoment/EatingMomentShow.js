import React from "react";
import { TextField, useTranslate, Show, SimpleShowLayout } from "react-admin";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const EatingMomentShow = () => {
  const translate = useTranslate();
  return (
    <Show>
      <SimpleShowLayout sx={{ maxWidth: 500 }}>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.eating_moment.fields.name")}
            </Typography>
            <TextField source="name" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.eating_moment.fields.time")}
            </Typography>
            <TextField source="time" fullWidth />
          </Box>
        </Box>
      </SimpleShowLayout>
    </Show>
  );
};
