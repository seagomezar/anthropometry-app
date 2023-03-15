import React from "react";
import { TextField, useTranslate, Show, SimpleShowLayout } from "react-admin";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const AthleteShow = () => {
  const translate = useTranslate();
  return (
    <Show>
      <SimpleShowLayout sx={{ maxWidth: 500 }}>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.Athlete.fields.name")}
            </Typography>
            <TextField source="name" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.Athlete.fields.document")}
            </Typography>
            <TextField source="document" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.Athlete.fields.birth_date")}
            </Typography>
            <TextField source="birth_date" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.Athlete.fields.email")}
            </Typography>
            <TextField source="email" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.Athlete.fields.phone")}
            </Typography>
            <TextField source="phone" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.Athlete.fields.club")}
            </Typography>
            <TextField source="club" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.Athlete.fields.position")}
            </Typography>
            <TextField source="position" fullWidth />
          </Box>
        </Box>
      </SimpleShowLayout>
    </Show>
  );
};
