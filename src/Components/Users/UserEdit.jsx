import React from "react";
import {
  DateInput,
  Edit,
  SimpleForm,
  ReferenceInput,
  TextInput,
  PasswordInput,
  useTranslate,
  useRecordContext,
  SelectInput,
  usePermissions,
} from "react-admin";
import { Typography, Box, Paper, Button } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ShieldIcon from "@mui/icons-material/Shield";
import { Separator } from "../Separator/Separator";

const UserTitle = () => {
  const record = useRecordContext();
  return (
    <span>{record ? `${record.firstname || ""} ${record.lastname || ""}` : ""}</span>
  );
};

const UserEditView = ({ isNutritionist, permissions }) => {
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
            href="#/user"
            sx={{
              backgroundColor: "#1b3b2b",
              color: "#fcf9f4",
              fontFamily: "'EB Garamond', serif",
              fontSize: "15px",
              fontWeight: 700,
              "&:hover": { backgroundColor: "#032517" },
            }}
          >
            {translate("auth.return_to_list", { _: "Volver a Mis Pacientes" })}
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <SimpleForm
      sx={{
        backgroundColor: "#fff",
        border: "1px solid rgba(3, 37, 23, 0.16)",
        borderLeft: "4px solid #c29b38",
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
        {translate("myroot.identity")}
      </Typography>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <TextInput source="firstname" isRequired fullWidth />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
          <TextInput source="lastname" isRequired fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <SelectInput
            source="gender"
            fullWidth
            choices={[
              { id: true, name: translate("myroot.male") },
              { id: false, name: translate("myroot.female") },
            ]}
          />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
          <TextInput type="email" source="email" isRequired fullWidth />
        </Box>
      </Box>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <DateInput source="birthday" fullWidth />
        </Box>
        {!isNutritionist && (
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <ReferenceInput
              source="nutritionist_id"
              reference="nutritionist"
              fullWidth
            />
          </Box>
        )}
      </Box>
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
        {translate("myroot.addressAndPhone")}
      </Typography>
      <TextInput source="address" multiline fullWidth helperText={false} />
      <TextInput source="phone" fullWidth helperText={false} />
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
        {translate("myroot.password")}
      </Typography>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <PasswordInput source="password" fullWidth />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
          <PasswordInput source="confirm_password" fullWidth />
        </Box>
      </Box>
    </SimpleForm>
  );
};

export const UserEdit = (props) => {
  const translate = useTranslate();
  const { permissions } = usePermissions();
  const isNutritionist = permissions?.role === "nutritionist";

  return (
    <Box sx={{ p: { xs: 1.5, sm: 3 }, maxWidth: 800, margin: "0 auto" }}>
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
          <ManageAccountsIcon fontSize="medium" />
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
            {translate("user_show.title", { _: "Expediente del Atleta" })}
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
            {translate("user_list.subtitle", {
              _: "Catálogo Oficial de Expedientes Biométricos & Atletas",
            })}
          </Typography>
        </Box>
      </Paper>

      <Edit title={<UserTitle />} component="div" {...props}>
        <UserEditView isNutritionist={isNutritionist} permissions={permissions} />
      </Edit>
    </Box>
  );
};

