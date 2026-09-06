import React from "react";
import {
  SimpleForm,
  TextInput,
  PasswordInput,
  Create,
  useTranslate,
  required,
} from "react-admin";
import { Box, Typography, Paper } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Separator } from "../Separator/Separator";

export const NutritionistCreate = (props) => {
  const translate = useTranslate();

  return (
    <Box sx={{ p: { xs: 1.5, sm: 3 }, maxWidth: 800, margin: "0 auto" }}>
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
          <PersonAddAlt1Icon fontSize="medium" />
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
            {translate("auth.create_specialist", {
              _: "Registrar Nuevo Especialista",
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
            {translate("nutritionist_list.subtitle", {
              _: "Colegio de Antropometristas & Nutricionistas del Laboratorio",
            })}
          </Typography>
        </Box>
      </Paper>

      <Create component="div" {...props}>
        <SimpleForm
          sx={{
            backgroundColor: "#fff",
            border: "1px solid rgba(3, 37, 23, 0.16)",
            borderLeft: "4px solid #1b3b2b",
            borderRadius: "2px",
            p: { xs: 2, sm: 3 },
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontWeight: 700,
              color: "#032517",
              fontSize: "17px",
              mb: 1.5,
            }}
          >
            {translate("myroot.identity", { _: "Identidad del Profesional" })}
          </Typography>

          <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <TextInput
                source="firstname"
                validate={required()}
                fullWidth
                label="Nombre(s)"
              />
            </Box>
            <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
              <TextInput
                source="lastname"
                validate={required()}
                fullWidth
                label="Apellido(s)"
              />
            </Box>
          </Box>

          <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <TextInput
                type="email"
                source="email"
                validate={required()}
                fullWidth
                label="Correo Electrónico Oficial"
              />
            </Box>
            <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
              <TextInput
                source="phone"
                fullWidth
                label="Teléfono / Contacto"
              />
            </Box>
          </Box>

          <TextInput
            source="address"
            multiline
            fullWidth
            label="Dirección de Consulta o Despacho"
          />

          <Separator />

          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontWeight: 700,
              color: "#032517",
              fontSize: "17px",
              mb: 1.5,
            }}
          >
            {translate("myroot.password", { _: "Credenciales de Acceso" })}
          </Typography>

          <Box sx={{ maxWidth: 400 }}>
            <PasswordInput
              source="password"
              validate={required()}
              fullWidth
              label="Contraseña Inicial"
              helperText="El especialista utilizará esta contraseña para ingresar a su cuaderno de pacientes."
            />
          </Box>
        </SimpleForm>
      </Create>
    </Box>
  );
};
