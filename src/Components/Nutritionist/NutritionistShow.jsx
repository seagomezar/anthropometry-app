import React from "react";
import {
  TextField,
  DateField,
  useTranslate,
  Show,
  SimpleShowLayout,
  useRecordContext,
} from "react-admin";
import { Box, Typography, Paper, Chip, Avatar } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";

const NutritionistHeader = () => {
  const record = useRecordContext();
  const translate = useTranslate();
  if (!record) return null;

  return (
    <Paper
      sx={{
        p: 3,
        mb: 3,
        backgroundColor: "#f6f3ee",
        border: "1px solid rgba(3, 37, 23, 0.2)",
        borderTop: "4px solid #c29b38",
        borderRadius: 1,
        display: "flex",
        alignItems: "center",
        gap: 2.5,
        flexWrap: "wrap",
      }}
    >
      <Avatar
        sx={{
          width: 64,
          height: 64,
          bgcolor: "#1b3b2b",
          color: "#fed269",
          fontWeight: 700,
          fontSize: "1.5rem",
          fontFamily: "'EB Garamond', serif",
          border: "2px solid #c29b38",
        }}
      >
        {record.firstname ? record.firstname[0] : <GroupsIcon />}
      </Avatar>

      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontWeight: 700,
            color: "#032517",
          }}
        >
          {record.firstname} {record.lastname}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontFamily: "'JetBrains Mono', monospace",
            color: "#775a00",
            letterSpacing: "0.1em",
            display: "block",
            mt: 0.2,
          }}
        >
          {translate("nutritionist_show.specialist", {
            _: "ESPECIALISTA EN NUTRICIÓN & ANTROPOMETRÍA",
          })}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mt: 1, flexWrap: "wrap" }}>
          {record.email && (
            <Typography
              variant="body2"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                color: "#424843",
                fontSize: "13px",
              }}
            >
              <EmailIcon fontSize="small" sx={{ color: "#775a00" }} />{" "}
              {record.email}
            </Typography>
          )}
          {record.phone && (
            <Typography
              variant="body2"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                color: "#424843",
                fontSize: "13px",
              }}
            >
              <PhoneIcon fontSize="small" sx={{ color: "#775a00" }} />{" "}
              {record.phone}
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export const NutritionistShowLayout = () => {
  const translate = useTranslate();

  return (
    <Box sx={{ p: { xs: 1.5, md: 3 }, maxWidth: 800, margin: "0 auto" }}>
      <NutritionistHeader />

      <Paper
        sx={{
          p: 3,
          border: "1px solid rgba(3, 37, 23, 0.15)",
          borderRadius: 1,
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'EB Garamond', serif",
            fontWeight: 700,
            color: "#032517",
            mb: 2,
            pb: 0.5,
            borderBottom: "1px solid rgba(3, 37, 23, 0.12)",
          }}
        >
          {translate("nutritionist_show.dossier_title", {
            _: "Ficha de Registro Profesional",
          })}
        </Typography>

        <SimpleShowLayout sx={{ p: 0 }}>
          <Box display={{ xs: "block", sm: "flex", width: "100%" }} sx={{ mb: 1.5 }}>
            <Box flex={1} mr={{ xs: 0, sm: 2 }}>
              <Typography variant="caption" sx={{ color: "#727973", fontWeight: 600 }}>
                {translate("resources.nutritionist.fields.firstname")}
              </Typography>
              <TextField source="firstname" fullWidth />
            </Box>
            <Box flex={1}>
              <Typography variant="caption" sx={{ color: "#727973", fontWeight: 600 }}>
                {translate("resources.nutritionist.fields.lastname")}
              </Typography>
              <TextField source="lastname" fullWidth />
            </Box>
          </Box>

          <Box display={{ xs: "block", sm: "flex", width: "100%" }} sx={{ mb: 1.5 }}>
            <Box flex={1} mr={{ xs: 0, sm: 2 }}>
              <Typography variant="caption" sx={{ color: "#727973", fontWeight: 600 }}>
                {translate("resources.nutritionist.fields.email")}
              </Typography>
              <TextField source="email" fullWidth />
            </Box>
            <Box flex={1}>
              <Typography variant="caption" sx={{ color: "#727973", fontWeight: 600 }}>
                {translate("resources.nutritionist.fields.phone")}
              </Typography>
              <TextField source="phone" fullWidth />
            </Box>
          </Box>

          <Box sx={{ mb: 1.5 }}>
            <Typography variant="caption" sx={{ color: "#727973", fontWeight: 600 }}>
              {translate("resources.nutritionist.fields.address")}
            </Typography>
            <TextField source="address" fullWidth />
          </Box>

          <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
            <Box flex={1} mr={{ xs: 0, sm: 2 }}>
              <Typography variant="caption" sx={{ color: "#727973", fontWeight: 600 }}>
                {translate("nutritionist_show.created_at", {
                  _: "Fecha de Alta",
                })}
              </Typography>
              <DateField source="created_at" />
            </Box>
            <Box flex={1}>
              <Typography variant="caption" sx={{ color: "#727973", fontWeight: 600 }}>
                {translate("nutritionist_show.updated_at", {
                  _: "Última Actualización",
                })}
              </Typography>
              <DateField source="updated_at" />
            </Box>
          </Box>
        </SimpleShowLayout>
      </Paper>
    </Box>
  );
};

export const NutritionistShow = () => {
  return (
    <Show component="div">
      <NutritionistShowLayout />
    </Show>
  );
};
