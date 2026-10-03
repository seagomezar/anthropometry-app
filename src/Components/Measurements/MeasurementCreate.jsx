import React from "react";
import { Create, SimpleForm, useTranslate, usePermissions } from "react-admin";
import { Box, Typography, Paper, Chip, Button } from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { MeasurementFormFields } from "./MeasurementFormFields";

export const MeasurementCreate = (props) => {
  const translate = useTranslate();
  const location = useLocation();
  const { permissions } = usePermissions();
  const isNutritionist = permissions?.role === "nutritionist";

  // Parse user_id from query search string, router state, or window hash
  let paramUserId = new URLSearchParams(location.search).get("user_id") || location.state?.user_id;
  if (!paramUserId && window.location.hash.includes("?")) {
    const hashSearch = window.location.hash.split("?")[1];
    paramUserId = new URLSearchParams(hashSearch).get("user_id");
  }
  const numericUserId = paramUserId ? parseInt(paramUserId, 10) : undefined;

  const defaultValues = {
    ...(isNutritionist && permissions?.nutritionistId ? { nutritionist_id: permissions.nutritionistId } : {}),
    ...(numericUserId ? { user_id: numericUserId } : {}),
  };

  const transform = (data) => {
    if (isNutritionist && permissions?.nutritionistId) {
      return {
        ...data,
        nutritionist_id: permissions.nutritionistId,
      };
    }
    return data;
  };

  return (
    <Box sx={{ p: { xs: 1.5, sm: 3 }, maxWidth: 920, margin: "0 auto" }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 2.5 },
          mb: 3,
          backgroundColor: "#faf7f2",
          border: "1px solid rgba(3, 37, 23, 0.18)",
          borderTop: "4px solid #1b3b2b",
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
          <PostAddIcon fontSize="medium" />
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
            {translate("measurement_form.create_title", {
              _: "Nuevo Protocolo de Evaluación ISAK",
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
          {numericUserId && (
            <Box sx={{ mt: 1.2, display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
              <Chip
                icon={<PersonIcon fontSize="small" sx={{ color: "#1b3b2b !important" }} />}
                label={`Paciente Seleccionado: ID #${numericUserId}`}
                size="small"
                sx={{
                  backgroundColor: "rgba(27, 59, 43, 0.08)",
                  border: "1px solid rgba(27, 59, 43, 0.3)",
                  color: "#1b3b2b",
                  fontWeight: 600,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              />
              <Button
                component={RouterLink}
                to={`/user/${numericUserId}/show`}
                variant="text"
                size="small"
                startIcon={<ArrowBackIcon fontSize="small" />}
                sx={{
                  color: "#775a00",
                  fontSize: "12px",
                  fontFamily: "'Inter', sans-serif",
                  textTransform: "none",
                  py: 0,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Volver al expediente
              </Button>
            </Box>
          )}
        </Box>
      </Paper>

      <Create component="div" transform={transform} {...props}>
        <SimpleForm
          defaultValues={defaultValues}
          sx={{
            "& .MuiCardContent-root": { p: 0 },
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
        >
          <MeasurementFormFields />
        </SimpleForm>
      </Create>
    </Box>
  );
};

