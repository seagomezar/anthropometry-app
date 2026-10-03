import React from "react";
import {
  DateInput,
  NumberInput,
  ReferenceInput,
  TextInput,
  useTranslate,
  AutocompleteInput,
  usePermissions,
} from "react-admin";
import { Box, Typography, Paper, Grid } from "@mui/material";
import StraightenIcon from "@mui/icons-material/Straighten";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ScienceIcon from "@mui/icons-material/Science";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";

const filterToQuery = (searchText) => ({
  sport: `%${searchText}%`,
});

const userToQuery = (searchText) => ({
  firstname: `%${searchText}%`,
});

const SectionCard = ({ title, icon: Icon, children }) => (
  <Paper
    elevation={0}
    sx={{
      p: { xs: 2, sm: 2.5 },
      mb: 2.5,
      backgroundColor: "#fff",
      border: "1px solid rgba(3, 37, 23, 0.16)",
      borderLeft: "4px solid #1b3b2b",
      borderRadius: "2px",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2, pb: 1, borderBottom: "1px solid rgba(3, 37, 23, 0.1)" }}>
      {Icon && <Icon sx={{ color: "#c29b38", fontSize: "20px" }} />}
      <Typography
        variant="subtitle1"
        sx={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontWeight: 700,
          color: "#032517",
          fontSize: "17px",
          letterSpacing: "0.02em",
        }}
      >
        {title}
      </Typography>
    </Box>
    {children}
  </Paper>
);

export const MeasurementFormFields = () => {
  const translate = useTranslate();
  const { permissions } = usePermissions();
  const isNutritionist = permissions?.role === "nutritionist";
  const userFilter =
    isNutritionist && permissions?.nutritionistId
      ? { nutritionist_id: permissions.nutritionistId }
      : undefined;

  return (
    <Box sx={{ width: "100%", maxWidth: 860, margin: "0 auto" }}>
      {/* Section A: Administrative & Baseline Ledger */}
      <SectionCard
        title={translate("measurement_form.section_a", {
          _: "Sección A: Datos Administrativos & Generales",
        })}
        icon={AssignmentIcon}
      >
        <Box display={{ xs: "block", sm: "flex" }} gap={2} mb={1.5}>
          <Box flex={1}>
            <ReferenceInput
              source="user_id"
              reference="user"
              filter={userFilter}
              fullWidth
            >
              <AutocompleteInput
                filterToQuery={userToQuery}
                optionText={(r) =>
                  r ? `${r.firstname || ""} ${r.lastname || ""}`.trim() : ""
                }
              />
            </ReferenceInput>
          </Box>
          <Box flex={1}>
            <ReferenceInput
              source="referenced_somatotype_id"
              reference="referenced_somatotype"
              fullWidth
            >
              <AutocompleteInput filterToQuery={filterToQuery} />
            </ReferenceInput>
          </Box>
        </Box>

        <Box display={{ xs: "block", sm: "flex" }} gap={2} mb={1.5}>
          <Box flex={1}>
            <NumberInput source="control" fullWidth />
          </Box>
          {!isNutritionist && (
            <Box flex={1}>
              <ReferenceInput
                source="nutritionist_id"
                reference="nutritionist"
                fullWidth
              />
            </Box>
          )}
        </Box>

        <Box display={{ xs: "block", sm: "flex" }} gap={2} mb={1.5}>
          <Box flex={1}>
            <TextInput source="training_period" fullWidth />
          </Box>
          <Box flex={1}>
            <DateInput source="evaluation_date" fullWidth />
          </Box>
        </Box>

        <Box mb={1.5}>
          <TextInput source="notes" fullWidth multiline rows={2} />
        </Box>

        <Box display={{ xs: "block", sm: "flex" }} gap={2}>
          <Box flex={1}>
            <NumberInput source="weight" fullWidth />
          </Box>
          <Box flex={1}>
            <NumberInput source="height" fullWidth />
          </Box>
        </Box>
      </SectionCard>

      {/* Section B: Skinfolds */}
      <SectionCard
        title={translate("measurement_form.section_b", {
          _: "Sección B: Pliegues Cutáneos Caliper (mm)",
        })}
        icon={StraightenIcon}
      >
        <Box display={{ xs: "block", sm: "flex" }} gap={2} mb={1.5}>
          <Box flex={1}>
            <NumberInput source="plg_triceps" fullWidth />
          </Box>
          <Box flex={1}>
            <NumberInput source="plg_bicep" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex" }} gap={2} mb={1.5}>
          <Box flex={1}>
            <NumberInput source="plg_subscapular" fullWidth />
          </Box>
          <Box flex={1}>
            <NumberInput source="plg_suprailiac" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex" }} gap={2} mb={1.5}>
          <Box flex={1}>
            <NumberInput source="plg_supraspinal" fullWidth />
          </Box>
          <Box flex={1}>
            <NumberInput source="plg_abdominal" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex" }} gap={2} mb={1.5}>
          <Box flex={1}>
            <NumberInput source="plg_thigh" fullWidth />
          </Box>
          <Box flex={1}>
            <NumberInput source="plg_calf" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex" }} gap={2}>
          <Box flex={1}>
            <NumberInput source="plg_chest" fullWidth />
          </Box>
          <Box flex={1}>
            <NumberInput source="plg_armpit" fullWidth />
          </Box>
        </Box>
      </SectionCard>

      {/* Section C: Perimeters */}
      <SectionCard
        title={translate("measurement_form.section_c", {
          _: "Sección C: Perímetros Corporales (cm)",
        })}
        icon={FitnessCenterIcon}
      >
        <Box display={{ xs: "block", sm: "flex" }} gap={2} mb={1.5}>
          <Box flex={1}>
            <NumberInput source="prm_arm" fullWidth />
          </Box>
          <Box flex={1}>
            <NumberInput source="prm_arm_contracted" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex" }} gap={2} mb={1.5}>
          <Box flex={1}>
            <NumberInput source="prm_wrist" fullWidth />
          </Box>
          <Box flex={1}>
            <NumberInput source="prm_waist" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex" }} gap={2} mb={1.5}>
          <Box flex={1}>
            <NumberInput source="prm_hip" fullWidth />
          </Box>
          <Box flex={1}>
            <NumberInput source="prm_calf" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex" }} gap={2}>
          <Box flex={1}>
            <NumberInput source="prm_chest" fullWidth />
          </Box>
          <Box flex={1}>
            <NumberInput source="prm_thigh" fullWidth />
          </Box>
        </Box>
      </SectionCard>

      {/* Section D: Diameters */}
      <SectionCard
        title={translate("measurement_form.section_d", {
          _: "Sección D: Diámetros Óseos (cm)",
        })}
        icon={StraightenIcon}
      >
        <Box display={{ xs: "block", sm: "flex" }} gap={2} mb={1.5}>
          <Box flex={1}>
            <NumberInput source="dm_elbow" fullWidth />
          </Box>
          <Box flex={1}>
            <NumberInput source="dm_knee" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex" }} gap={2}>
          <Box flex={1}>
            <NumberInput source="dm_wrist" fullWidth />
          </Box>
          <Box flex={1} />
        </Box>
      </SectionCard>

      {/* Section E: Somatotype & Coordenadas */}
      <SectionCard
        title={translate("measurement_form.section_e", {
          _: "Sección E: Coordenadas & Condición Física",
        })}
        icon={ScienceIcon}
      >
        <Box display={{ xs: "block", sm: "flex" }} gap={2} mb={1.5}>
          <Box flex={1}>
            <NumberInput source="x" fullWidth helperText="Coordenada X Somatotipo (opcional si calcula automático)" />
          </Box>
          <Box flex={1}>
            <NumberInput source="y" fullWidth helperText="Coordenada Y Somatotipo (opcional si calcula automático)" />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex" }} gap={2}>
          <Box flex={1}>
            <NumberInput source="fitness_level" fullWidth />
          </Box>
          <Box flex={1} />
        </Box>
      </SectionCard>

      {/* Section F: Exámenes Paraclínicos (Opcionales) */}
      <SectionCard
        title={translate("measurement_form.section_f", {
          _: "Sección F: Exámenes Paraclínicos & Laboratorio (Opcionales)",
        })}
        icon={LocalPharmacyIcon}
      >
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mb: 2,
            p: 1.2,
            backgroundColor: "#faf7f2",
            border: "1px dashed rgba(194, 155, 56, 0.6)",
            borderRadius: "2px",
            color: "#775a00",
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
          }}
        >
          {translate("measurement_form.paraclinicals_notice", {
            _: "Nota clínica: Todos los exámenes paraclínicos son opcionales. Diligencie únicamente aquellos disponibles si el paciente cuenta con análisis de laboratorio recientes.",
          })}
        </Typography>

        <Box display={{ xs: "block", sm: "flex" }} gap={2} mb={1.5}>
          <Box flex={1}>
            <TextInput source="blood_pressure" fullWidth helperText="Presión Arterial (Ej: 120/80 mmHg)" />
          </Box>
          <Box flex={1}>
            <TextInput source="glucose" fullWidth helperText="Glucosa en ayunas (mg/dL)" />
          </Box>
        </Box>

        <Box display={{ xs: "block", sm: "flex" }} gap={2} mb={1.5}>
          <Box flex={1}>
            <TextInput source="hba1c" fullWidth helperText="Hemoglobina Glicosilada (%)" />
          </Box>
          <Box flex={1}>
            <TextInput source="hemoglobin" fullWidth helperText="Hemoglobina / Hematocrito (g/dL)" />
          </Box>
        </Box>

        <Box display={{ xs: "block", sm: "flex" }} gap={2} mb={1.5}>
          <Box flex={1}>
            <TextInput source="cholesterol_total" fullWidth helperText="Colesterol Total (mg/dL)" />
          </Box>
          <Box flex={1}>
            <TextInput source="cholesterol_hdl" fullWidth helperText="Colesterol HDL (mg/dL)" />
          </Box>
        </Box>

        <Box display={{ xs: "block", sm: "flex" }} gap={2} mb={1.5}>
          <Box flex={1}>
            <TextInput source="cholesterol_ldl" fullWidth helperText="Colesterol LDL (mg/dL)" />
          </Box>
          <Box flex={1}>
            <TextInput source="triglycerides" fullWidth helperText="Triglicéridos (mg/dL)" />
          </Box>
        </Box>

        <Box display={{ xs: "block", sm: "flex" }} gap={2} mb={1.5}>
          <Box flex={1}>
            <TextInput source="creatinine" fullWidth helperText="Creatinina Sérica (mg/dL)" />
          </Box>
          <Box flex={1}>
            <TextInput source="uric_acid" fullWidth helperText="Ácido Úrico (mg/dL)" />
          </Box>
        </Box>

        <Box display={{ xs: "block", sm: "flex" }} gap={2} mb={1.5}>
          <Box flex={1}>
            <TextInput source="t3_t4" fullWidth helperText="Perfil Tiroideo T3 / T4" />
          </Box>
          <Box flex={1} />
        </Box>

        <Box>
          <TextInput
            source="paraclinicals_notes"
            fullWidth
            multiline
            rows={2}
            helperText="Observaciones e interpretaciones paraclínicas adicionales"
          />
        </Box>
      </SectionCard>
    </Box>
  );
};
