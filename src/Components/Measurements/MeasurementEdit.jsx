import React from "react";
import { Edit, SimpleForm, useTranslate } from "react-admin";
import { Box, Typography, Paper } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MeasurementFormFields } from "./MeasurementFormFields";

export const MeasurementEdit = (props) => {
  const translate = useTranslate();

  return (
    <Box sx={{ p: { xs: 1.5, sm: 3 }, maxWidth: 920, margin: "0 auto" }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 2.5 },
          mb: 3,
          backgroundColor: "#faf7f2",
          border: "1px solid rgba(3, 37, 23, 0.18)",
          borderTop: "4px solid #c29b38",
          borderRadius: "2px",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            backgroundColor: "#1b3b2b",
            color: "#fed269",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #c29b38",
          }}
        >
          <EditNoteIcon fontSize="medium" />
        </Box>
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontWeight: 700,
              color: "#032517",
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
            }}
          >
            {translate("measurement_form.edit_title", {
              _: "Edición de Evaluación Antropométrica",
            })}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontFamily: "'Inter', sans-serif",
              color: "#424843",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontSize: "11px",
              display: "block",
              mt: 0.3,
            }}
          >
            {translate("measurement_form.subtitle", {
              _: "Cuaderno Oficial de Registro Antropométrico & Biometría",
            })}
          </Typography>
        </Box>
      </Paper>

      <Edit component="div" {...props}>
        <SimpleForm
          sx={{
            "& .MuiCardContent-root": { p: 0 },
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
        >
          <MeasurementFormFields />
        </SimpleForm>
      </Edit>
    </Box>
  );
};

