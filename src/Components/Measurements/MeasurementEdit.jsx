import React from "react";
import { Edit, SimpleForm, useTranslate, usePermissions, useRecordContext } from "react-admin";
import { Box, Typography, Paper, Button } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ShieldIcon from "@mui/icons-material/Shield";
import { MeasurementFormFields } from "./MeasurementFormFields";

const MeasurementEditView = ({ isNutritionist, permissions }) => {
  const translate = useTranslate();
  const record = useRecordContext();

  if (!record) return null;

  const isUnauthorized =
    isNutritionist &&
    (!record.nutritionist_id || Number(record.nutritionist_id) !== Number(permissions?.nutritionistId));

  if (isUnauthorized) {
    return (
      <Box sx={{ p: 4, maxWidth: 600, margin: "40px auto", textAlign: "center" }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            border: "3px double #ba1a1a",
            borderRadius: "2px",
            backgroundColor: "#fffaf9",
          }}
        >
          <ShieldIcon sx={{ fontSize: 56, color: "#ba1a1a", mb: 1.5 }} />
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'EB Garamond', serif",
              fontWeight: 700,
              color: "#ba1a1a",
              mb: 1,
            }}
          >
            {translate("auth.restricted_title", { _: "Acceso Restringido" })}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "'Inter', sans-serif",
              color: "#424843",
              mb: 3,
              lineHeight: 1.6,
            }}
          >
            {translate("auth.restricted_message", {
              _: "Este expediente confidencial pertenece a otro especialista. No tiene permisos para consultar o modificar esta información.",
            })}
          </Typography>
          <Button
            variant="contained"
            href="#/measurement"
            sx={{
              backgroundColor: "#1b3b2b",
              color: "#fcf9f4",
              fontFamily: "'EB Garamond', serif",
              fontSize: "15px",
              fontWeight: 700,
              "&:hover": { backgroundColor: "#032517" },
            }}
          >
            {translate("results.back_to_measurements", { _: "Volver a Mediciones" })}
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <SimpleForm
      sx={{
        "& .MuiCardContent-root": { p: 0 },
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
    >
      <MeasurementFormFields />
    </SimpleForm>
  );
};

export const MeasurementEdit = (props) => {
  const translate = useTranslate();
  const { permissions } = usePermissions();
  const isNutritionist = permissions?.role === "nutritionist";

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
        <MeasurementEditView isNutritionist={isNutritionist} permissions={permissions} />
      </Edit>
    </Box>
  );
};

