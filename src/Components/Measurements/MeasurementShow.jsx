import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import {
  DateField,
  useTranslate,
  Show,
  ReferenceField,
  useShowContext,
  useDataProvider,
  usePermissions,
} from "react-admin";
import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  Grid,
  Divider,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import StraightenIcon from "@mui/icons-material/Straighten";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import HeightIcon from "@mui/icons-material/Height";
import ShieldIcon from "@mui/icons-material/Shield";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import ScienceIcon from "@mui/icons-material/Science";
import PersonIcon from "@mui/icons-material/Person";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { Link as RouterLink } from "react-router-dom";

import { generateResults } from "../../Providers/retultsProvider";
import { ExportablePDF } from "./ExportablePDF";
import { useFeaturePreferences } from "../../config/features";
import "./MeasurementShow.css";

const MetricItem = ({ label, value, unit = "" }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      py: 1,
      px: 1.5,
      borderBottom: "1px solid rgba(27, 59, 43, 0.08)",
      "&:last-child": { borderBottom: "none" },
      "&:nth-of-type(even)": { backgroundColor: "#faf7f2" },
      "&:hover": {
        backgroundColor: "rgba(245, 239, 230, 0.95) !important",
        borderLeft: "3px solid #c29b38",
      },
      transition: "all 0.15s ease",
    }}
  >
    <Typography
      variant="body2"
      sx={{
        color: "#424843",
        fontSize: "13px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {label}
    </Typography>
    <Typography
      variant="body2"
      sx={{
        fontWeight: 600,
        fontFamily: "'JetBrains Mono', monospace",
        color: "#1c1c19",
        fontSize: "13.5px",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {value !== undefined && value !== null ? `${value} ${unit}`.trim() : "—"}
    </Typography>
  </Box>
);

export const MeasurementShowLayout = React.memo(() => {
  const translate = useTranslate();
  const { error, record, isLoading } = useShowContext();
  const { permissions } = usePermissions();
  const { isFeatureEnabled } = useFeaturePreferences();

  const [user, setUser] = React.useState({});
  const [referencedSomatotype, setReferencedSomatotype] = React.useState({});
  const [loadingRel, setLoadingRel] = React.useState(true);
  const [nutritionist, setNutritionist] = React.useState({});
  const dataProvider = useDataProvider();

  React.useEffect(() => {
    if (!record) return;

    const promises = [];

    if (record.user_id) {
      promises.push(
        dataProvider
          .getOne("user", { id: record.user_id })
          .then((res) => setUser(res.data || res))
          .catch((e) => console.warn(e))
      );
    }

    if (record.nutritionist_id) {
      promises.push(
        dataProvider
          .getOne("nutritionist", { id: record.nutritionist_id })
          .then((res) => setNutritionist(res.data || res))
          .catch((e) => console.warn(e))
      );
    }

    if (record.referenced_somatotype_id) {
      promises.push(
        dataProvider
          .getOne("referenced_somatotype", {
            id: record.referenced_somatotype_id,
          })
          .then((res) => setReferencedSomatotype(res.data || res))
          .catch((e) => console.warn(e))
      );
    }

    Promise.allSettled(promises).finally(() => {
      setLoadingRel(false);
    });
  }, [record, dataProvider]);

  if (isLoading || !record) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography
          variant="h6"
          sx={{ fontFamily: "'EB Garamond', serif", color: "#1b3b2b" }}
        >
          {translate("measurement_show.loading", {
            _: "Cargando ficha de medición...",
          })}
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: "center", color: "#ba1a1a" }}>
        <Typography variant="h6">
          {translate("measurement_show.error", {
            _: "Error al cargar la evaluación.",
          })}
        </Typography>
      </Box>
    );
  }

  const isNutritionist = permissions?.role === "nutritionist";
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
              _: "Esta evaluación confidencial pertenece a otro especialista. No tiene permisos para consultar o modificar esta información.",
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
            {translate("auth.return_to_list", { _: "Volver a Evaluaciones" })}
          </Button>
        </Paper>
      </Box>
    );
  }

  const results = generateResults(record, record.height, record.weight, true);

  return (
    <Box sx={{ p: { xs: 1.5, md: 3 }, maxWidth: 1280, margin: "0 auto" }}>
      {/* Header Ledger Banner matching Stitch Heritage Laboratory */}
      <Paper
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
          backgroundColor: "#f6f3ee",
          border: "1px solid rgba(3, 37, 23, 0.2)",
          borderTop: "4px solid #1b3b2b",
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 2,
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                bgcolor: "rgba(3, 37, 23, 0.1)",
                p: 1.2,
                borderRadius: 1,
                color: "#1b3b2b",
                display: "flex",
              }}
            >
              <StraightenIcon sx={{ fontSize: 32 }} />
            </Box>
            <div>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'EB Garamond', Georgia, serif",
                  fontWeight: 700,
                  color: "#032517",
                  fontSize: { xs: "20px", sm: "24px" },
                }}
              >
                {translate("measurement_show.title", {
                  _: "Ficha de Evaluación Antropométrica",
                })}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#775a00",
                  letterSpacing: "0.1em",
                }}
              >
                {translate("measurement_show.protocol", {
                  control: record.control || record.id,
                  _: `PROTOCOLO ISAK — CONTROL #${record.control || record.id}`,
                })}
              </Typography>
            </div>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
            {isFeatureEnabled("pdf_export") && (
              <PDFDownloadLink
                document={
                  <ExportablePDF
                    record={record}
                    results={results}
                    translate={translate}
                    user={user}
                    nutritionist={nutritionist}
                    referencedSomatotype={referencedSomatotype}
                  />
                }
                fileName={`${user.firstname || "Atleta"} ${
                  user.lastname || ""
                } - Control ${record.control || record.id}`}
                style={{ textDecoration: "none" }}
              >
                {({ loading }) => (
                  <Button
                    variant="contained"
                    disabled={loading || loadingRel}
                    startIcon={<DownloadIcon />}
                    sx={{
                      backgroundColor: "#1b3b2b",
                      color: "#fcf9f4",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      "&:hover": { backgroundColor: "#032517" },
                    }}
                  >
                    {loading
                      ? translate("measurement_show.generating_pdf", {
                          _: "Generando...",
                        })
                      : translate("measurement_show.download_pdf", {
                          _: "Descargar Ficha PDF",
                        })}
                  </Button>
                )}
              </PDFDownloadLink>
            )}

            {isFeatureEnabled("results_analytics") && (
              <Button
                component={RouterLink}
                to={`/results/${record.id}`}
                variant="contained"
                startIcon={<AnalyticsIcon />}
                sx={{
                  backgroundColor: "#c29b38",
                  color: "#032517",
                  fontFamily: "'EB Garamond', serif",
                  fontSize: "14.5px",
                  fontWeight: 700,
                  border: "1px solid #775a00",
                  boxShadow: "0 2px 6px rgba(194, 155, 56, 0.4)",
                  "&:hover": {
                    backgroundColor: "#b38a2e",
                    color: "#000",
                  },
                }}
              >
                {translate("measurement_show.view_analytics", {
                  _: "Ver Somatocarta & Gráficos",
                })}
              </Button>
            )}
          </Box>
        </Box>

        {/* Metadata Badges */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
          <Chip
            label={
              user.firstname
                ? `${translate("measurement_show.athlete", { _: "Atleta" })}: ${user.firstname} ${user.lastname}`
                : translate("measurement_show.registered_athlete", {
                    _: "Atleta registrado",
                  })
            }
            size="small"
            sx={{
              backgroundColor: "#fff",
              border: "1px solid rgba(3, 37, 23, 0.2)",
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
            }}
          />
          {record.height && (
            <Chip
              icon={<HeightIcon />}
              label={`${record.height} cm`}
              size="small"
              sx={{
                backgroundColor: "#fff",
                border: "1px solid rgba(3, 37, 23, 0.15)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            />
          )}
          {record.weight && (
            <Chip
              icon={<MonitorWeightIcon />}
              label={`${record.weight} kg`}
              size="small"
              sx={{
                backgroundColor: "#fff",
                border: "1px solid rgba(3, 37, 23, 0.15)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            />
          )}
          {nutritionist.firstname && (
            <Chip
              label={`${translate("measurement_show.nutritionist", { _: "Nutricionista" })}: ${nutritionist.firstname} ${nutritionist.lastname}`}
              size="small"
              sx={{
                backgroundColor: "rgba(194, 155, 56, 0.15)",
                color: "#775a00",
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
              }}
            />
          )}
        </Box>
      </Paper>

      {/* Categorized Ledger Cards Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(2, 1fr)",
          },
          gap: 2.5,
        }}
      >
        {/* Card 1: Datos Básicos & Generales */}
        <Paper
          sx={{
            p: 2.5,
            border: "1px solid rgba(3, 37, 23, 0.15)",
            borderTop: "3px solid #1b3b2b",
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
              mb: 1.5,
              pb: 0.5,
              borderBottom: "1px solid rgba(3, 37, 23, 0.12)",
            }}
          >
            {translate("measurement_show.section_a", {
              _: "Sección A: Datos Básicos & Evaluación",
            })}
          </Typography>
          <MetricItem
            label={translate("measurement_show.control_number", {
              _: "Número de Control",
            })}
            value={record.control}
          />
          <MetricItem
            label={translate("measurement_show.height", { _: "Talla" })}
            value={record.height}
            unit="cm"
          />
          <MetricItem
            label={translate("measurement_show.weight", { _: "Peso" })}
            value={record.weight}
            unit="kg"
          />
          <MetricItem
            label={translate("measurement_show.wingspan", { _: "Envergadura" })}
            value={record.wingspan}
            unit="cm"
          />
          <MetricItem
            label={translate("measurement_show.training_period", {
              _: "Período de Entrenamiento",
            })}
            value={record.training_period}
          />
          <MetricItem
            label={translate("measurement_show.notes", {
              _: "Notas de Evaluación",
            })}
            value={record.notes}
          />
        </Paper>

        {/* Card 2: Pliegues Cutáneos (ISAK) */}
        <Paper
          sx={{
            p: 2.5,
            border: "1px solid rgba(3, 37, 23, 0.15)",
            borderTop: "3px solid #c29b38",
            borderRadius: 1,
            backgroundColor: "#fff",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'EB Garamond', serif",
              fontWeight: 700,
              color: "#775a00",
              mb: 1.5,
              pb: 0.5,
              borderBottom: "1px solid rgba(194, 155, 56, 0.2)",
            }}
          >
            {translate("measurement_show.section_b", {
              _: "Sección B: Pliegues Cutáneos (mm)",
            })}
          </Typography>
          <MetricItem
            label={translate("measurement_show.triceps", { _: "Tríceps" })}
            value={record.plg_triceps ?? record.triceps}
            unit="mm"
          />
          <MetricItem
            label={translate("measurement_show.biceps", { _: "Bíceps" })}
            value={record.plg_bicep ?? record.biceps}
            unit="mm"
          />
          <MetricItem
            label={translate("measurement_show.subscapular", {
              _: "Subescapular",
            })}
            value={record.plg_subscapular ?? record.subscapular}
            unit="mm"
          />
          <MetricItem
            label={translate("measurement_show.iliac_crest", {
              _: "Cresta Ilíaca",
            })}
            value={record.plg_suprailiac ?? record.iliac_crest}
            unit="mm"
          />
          <MetricItem
            label={translate("measurement_show.supraspinale", {
              _: "Supraespinal",
            })}
            value={record.plg_supraspinal ?? record.supraspinale}
            unit="mm"
          />
          <MetricItem
            label={translate("measurement_show.abdominal", { _: "Abdominal" })}
            value={record.plg_abdominal ?? record.abdominal}
            unit="mm"
          />
          <MetricItem
            label={translate("measurement_show.front_thigh", {
              _: "Muslo Anterior",
            })}
            value={record.plg_thigh ?? record.front_thigh}
            unit="mm"
          />
          <MetricItem
            label={translate("measurement_show.medial_calf", {
              _: "Pantorrilla Medial",
            })}
            value={record.plg_calf ?? record.medial_calf}
            unit="mm"
          />
          <MetricItem
            label="Pectoral / Pecho"
            value={record.plg_chest}
            unit="mm"
          />
          <MetricItem
            label="Axilar Medio"
            value={record.plg_armpit}
            unit="mm"
          />
        </Paper>

        {/* Card 3: Perímetros Corporales */}
        <Paper
          sx={{
            p: 2.5,
            border: "1px solid rgba(3, 37, 23, 0.15)",
            borderTop: "3px solid #1b3b2b",
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
              mb: 1.5,
              pb: 0.5,
              borderBottom: "1px solid rgba(3, 37, 23, 0.12)",
            }}
          >
            {translate("measurement_show.section_c", {
              _: "Sección C: Perímetros Corporales (cm)",
            })}
          </Typography>
          <MetricItem
            label={translate("measurement_show.arm_relaxed", {
              _: "Brazo Relajado",
            })}
            value={record.prm_arm ?? record.arm_relaxed}
            unit="cm"
          />
          <MetricItem
            label={translate("measurement_show.arm_flexed", {
              _: "Brazo Flexionado",
            })}
            value={record.prm_arm_contracted ?? record.arm_flexed}
            unit="cm"
          />
          <MetricItem
            label={translate("measurement_show.wrist", { _: "Muñeca" })}
            value={record.prm_wrist ?? record.wrist}
            unit="cm"
          />
          <MetricItem
            label={translate("measurement_show.waist", { _: "Cintura" })}
            value={record.prm_waist ?? record.waist}
            unit="cm"
          />
          <MetricItem
            label={translate("measurement_show.hip", { _: "Cadera" })}
            value={record.prm_hip ?? record.hip}
            unit="cm"
          />
          <MetricItem
            label={translate("measurement_show.thigh", {
              _: "Muslo Superior",
            })}
            value={record.prm_thigh ?? record.thigh}
            unit="cm"
          />
          <MetricItem
            label={translate("measurement_show.calf", { _: "Pantorrilla" })}
            value={record.prm_calf ?? record.calf}
            unit="cm"
          />
          <MetricItem
            label={translate("measurement_show.chest", { _: "Tórax" })}
            value={record.prm_chest ?? record.chest}
            unit="cm"
          />
        </Paper>

        {/* Card 4: Diámetros Óseos & Somatotipo de Referencia */}
        <Paper
          sx={{
            p: 2.5,
            border: "1px solid rgba(3, 37, 23, 0.15)",
            borderTop: "3px solid #c29b38",
            borderRadius: 1,
            backgroundColor: "#fff",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'EB Garamond', serif",
              fontWeight: 700,
              color: "#775a00",
              mb: 1.5,
              pb: 0.5,
              borderBottom: "1px solid rgba(194, 155, 56, 0.2)",
            }}
          >
            {translate("measurement_show.section_d", {
              _: "Sección D: Diámetros Óseos (cm)",
            })}
          </Typography>
          <MetricItem
            label="Biepicondilar Húmero / Codo"
            value={record.dm_elbow}
            unit="cm"
          />
          <MetricItem
            label="Biepicondilar Fémur / Rodilla"
            value={record.dm_knee}
            unit="cm"
          />
          <MetricItem
            label="Biestiloideo Muñeca"
            value={record.dm_wrist}
            unit="cm"
          />

          {referencedSomatotype.sport && (
            <>
              <Divider sx={{ my: 1.5, borderColor: "rgba(3, 37, 23, 0.1)" }} />
              <MetricItem
                label={translate("measurement_show.ref_somatotype", {
                  _: "Deporte de Referencia",
                })}
                value={referencedSomatotype.sport}
              />
              <MetricItem
                label={translate("measurement_show.xy_coords", {
                  _: "Coordenadas Referencia (X, Y)",
                })}
                value={`X: ${referencedSomatotype.x}, Y: ${referencedSomatotype.y}`}
              />
            </>
          )}
        </Paper>

        {/* Card 5: Coordenadas, Somatotipo & Indicadores Calculados */}
        <Paper
          sx={{
            p: 2.5,
            border: "1px solid rgba(3, 37, 23, 0.15)",
            borderTop: "3px solid #1b3b2b",
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
              mb: 1.5,
              pb: 0.5,
              borderBottom: "1px solid rgba(3, 37, 23, 0.12)",
            }}
          >
            {translate("measurement_show.section_e", {
              _: "Sección E: Somatotipo & Composición Corporal",
            })}
          </Typography>
          {results && (
            <>
              <MetricItem
                label="IMC Calculado"
                value={results.imc ? results.imc.toFixed(2) : null}
                unit="kg/m²"
              />
              <MetricItem
                label="Endomorfia"
                value={results.endomorph ? results.endomorph.toFixed(2) : null}
              />
              <MetricItem
                label="Mesomorfia"
                value={results.mesomorph ? results.mesomorph.toFixed(2) : null}
              />
              <MetricItem
                label="Ectomorfia"
                value={results.ectomorph ? results.ectomorph.toFixed(2) : null}
              />
              <MetricItem
                label="Coordenada X (Somatocarta)"
                value={results.resultX ? results.resultX.toFixed(2) : (record.x ?? null)}
              />
              <MetricItem
                label="Coordenada Y (Somatocarta)"
                value={results.resultY ? results.resultY.toFixed(2) : (record.y ?? null)}
              />
              <MetricItem
                label="Masa Grasa Estimada (Yhasz)"
                value={results.yhaszFatPercentage ? results.yhaszFatPercentage.toFixed(1) : null}
                unit="%"
              />
              <MetricItem
                label="Masa Grasa Estimada (Faulkner)"
                value={results.faulknerFatPercentage ? results.faulknerFatPercentage.toFixed(1) : null}
                unit="%"
              />
              <MetricItem
                label="Suma de 6 Pliegues"
                value={results.sumOfPlgs ? results.sumOfPlgs.toFixed(1) : null}
                unit="mm"
              />
            </>
          )}
          <MetricItem
            label="Nivel de Condición Física"
            value={record.fitness_level}
          />
        </Paper>

        {/* Card 6: Exámenes Paraclínicos & Laboratorio */}
        <Paper
          sx={{
            p: 2.5,
            border: "1px solid rgba(3, 37, 23, 0.15)",
            borderTop: "3px solid #c29b38",
            borderRadius: 1,
            backgroundColor: "#fff",
            gridColumn: { xs: "1", md: "span 2" },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5, pb: 0.5, borderBottom: "1px solid rgba(194, 155, 56, 0.2)", flexWrap: "wrap", gap: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'EB Garamond', serif",
                fontWeight: 700,
                color: "#775a00",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <LocalPharmacyIcon sx={{ color: "#775a00", fontSize: 20 }} />
              {translate("measurement_show.section_f", {
                _: "Sección F: Exámenes Paraclínicos & Laboratorio (Opcionales)",
              })}
            </Typography>
            <Chip
              label="Valores Registrados"
              size="small"
              sx={{
                backgroundColor: "rgba(194, 155, 56, 0.12)",
                color: "#775a00",
                fontSize: "11px",
                fontWeight: 600,
              }}
            />
          </Box>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <MetricItem label="Presión Arterial" value={record.blood_pressure} />
              <MetricItem label="Glucosa en Ayunas" value={record.glucose} unit="mg/dL" />
              <MetricItem label="Hemoglobina Glicosilada (HbA1c)" value={record.hba1c} unit="%" />
              <MetricItem label="Hemoglobina / Hto" value={record.hemoglobin} unit="g/dL" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <MetricItem label="Colesterol Total" value={record.cholesterol_total} unit="mg/dL" />
              <MetricItem label="Colesterol HDL" value={record.cholesterol_hdl} unit="mg/dL" />
              <MetricItem label="Colesterol LDL" value={record.cholesterol_ldl} unit="mg/dL" />
              <MetricItem label="Triglicéridos" value={record.triglycerides} unit="mg/dL" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <MetricItem label="Creatinina Sérica" value={record.creatinine} unit="mg/dL" />
              <MetricItem label="Ácido Úrico" value={record.uric_acid} unit="mg/dL" />
              <MetricItem label="Perfil Tiroideo (T3 / T4)" value={record.t3_t4} />
              <MetricItem label="Notas Paraclínicas" value={record.paraclinicals_notes} />
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Prominent Bottom Action Bar for Quick Navigation */}
      <Paper
        sx={{
          mt: 3.5,
          p: 2.5,
          backgroundColor: "#faf7f2",
          border: "2px solid #1b3b2b",
          borderRadius: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: "'EB Garamond', serif",
              fontWeight: 700,
              color: "#032517",
            }}
          >
            Diagnóstico Morfológico & Análisis de Resultados
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#424843",
              fontSize: "13px",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Consulte la Somatocarta interactiva, distribución de masas corporales y gráficos comparativos.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
          {isFeatureEnabled("results_analytics") && (
            <Button
              component={RouterLink}
              to={`/results/${record.id}`}
              variant="contained"
              startIcon={<AnalyticsIcon />}
              sx={{
                backgroundColor: "#1b3b2b",
                color: "#fed269",
                fontFamily: "'EB Garamond', serif",
                fontSize: "15px",
                fontWeight: 700,
                border: "1px solid #c29b38",
                px: 2.5,
                py: 1,
                "&:hover": { backgroundColor: "#032517", color: "#fff" },
              }}
            >
              Consultar Diagnóstico & Somatocarta
            </Button>
          )}
          {record.user_id && (
            <Button
              component={RouterLink}
              to={`/measurement/create?user_id=${record.user_id}`}
              variant="outlined"
              startIcon={<PostAddIcon />}
              sx={{
                borderColor: "#1b3b2b",
                color: "#1b3b2b",
                backgroundColor: "#fff",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                "&:hover": { backgroundColor: "rgba(27, 59, 43, 0.05)" },
              }}
            >
              Nueva Medición
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
});

export const MeasurementShowPageTable = React.memo(() => {
  return (
    <Show>
      <MeasurementShowLayout />
    </Show>
  );
});
