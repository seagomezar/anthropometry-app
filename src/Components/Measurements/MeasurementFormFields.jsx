import React from "react";
import {
  DateInput,
  NumberInput,
  ReferenceInput,
  TextInput,
  useTranslate,
  AutocompleteInput,
} from "react-admin";
import { Box, Typography, Paper, Grid } from "@mui/material";
import StraightenIcon from "@mui/icons-material/Straighten";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ScienceIcon from "@mui/icons-material/Science";
import AssignmentIcon from "@mui/icons-material/Assignment";

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
            <ReferenceInput source="user_id" reference="user" fullWidth>
              <AutocompleteInput filterToQuery={userToQuery} />
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
          <Box flex={1}>
            <ReferenceInput
              source="nutritionist_id"
              reference="nutritionist"
              fullWidth
            />
          </Box>
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

      {/* Section E: Somatotype & Bioquímicos */}
      <SectionCard
        title={translate("measurement_form.section_e", {
          _: "Sección E: Marcadores Bioquímicos & Coordenadas",
        })}
        icon={ScienceIcon}
      >
        <Box display={{ xs: "block", sm: "flex" }} gap={2} mb={1.5}>
          <Box flex={1}>
            <NumberInput source="x" fullWidth />
          </Box>
          <Box flex={1}>
            <NumberInput source="y" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex" }} gap={2} mb={1.5}>
          <Box flex={1}>
            <TextInput source="creatinine" fullWidth />
          </Box>
          <Box flex={1}>
            <NumberInput source="fitness_level" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex" }} gap={2} mb={1.5}>
          <Box flex={1}>
            <TextInput source="t3_t4" fullWidth />
          </Box>
          <Box flex={1}>
            <TextInput source="triglycerides" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex" }} gap={2}>
          <Box flex={1}>
            <TextInput source="uric_acid" fullWidth />
          </Box>
          <Box flex={1} />
        </Box>
      </SectionCard>
    </Box>
  );
};
