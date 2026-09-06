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

  const { permissions } = usePermissions();
  const isNutritionist = permissions?.role === "nutritionist";
  const isUnauthorized =
    isNutritionist &&
    permissions?.nutritionistId &&
    record.nutritionist_id &&
    Number(record.nutritionist_id) !== Number(permissions.nutritionistId);

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
                variant="outlined"
                startIcon={<RemoveRedEyeIcon />}
                sx={{
                  borderColor: "#c29b38",
                  color: "#775a00",
                  backgroundColor: "#fff",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "#775a00",
                    backgroundColor: "rgba(194, 155, 56, 0.1)",
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
            value={record.triceps}
            unit="mm"
          />
          <MetricItem
            label={translate("measurement_show.subscapular", {
              _: "Subescapular",
            })}
            value={record.subscapular}
            unit="mm"
          />
          <MetricItem
            label={translate("measurement_show.biceps", { _: "Bíceps" })}
            value={record.biceps}
            unit="mm"
          />
          <MetricItem
            label={translate("measurement_show.iliac_crest", {
              _: "Cresta Ilíaca",
            })}
            value={record.iliac_crest}
            unit="mm"
          />
          <MetricItem
            label={translate("measurement_show.supraspinale", {
              _: "Supraespinal",
            })}
            value={record.supraspinale}
            unit="mm"
          />
          <MetricItem
            label={translate("measurement_show.abdominal", { _: "Abdominal" })}
            value={record.abdominal}
            unit="mm"
          />
          <MetricItem
            label={translate("measurement_show.front_thigh", {
              _: "Muslo Anterior",
            })}
            value={record.front_thigh}
            unit="mm"
          />
          <MetricItem
            label={translate("measurement_show.medial_calf", {
              _: "Pantorrilla Medial",
            })}
            value={record.medial_calf}
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
            value={record.arm_relaxed}
            unit="cm"
          />
          <MetricItem
            label={translate("measurement_show.arm_flexed", {
              _: "Brazo Flexionado",
            })}
            value={record.arm_flexed}
            unit="cm"
          />
          <MetricItem
            label={translate("measurement_show.forearm", { _: "Antebrazo" })}
            value={record.forearm}
            unit="cm"
          />
          <MetricItem
            label={translate("measurement_show.wrist", { _: "Muñeca" })}
            value={record.wrist}
            unit="cm"
          />
          <MetricItem
            label={translate("measurement_show.chest", { _: "Tórax" })}
            value={record.chest}
            unit="cm"
          />
          <MetricItem
            label={translate("measurement_show.waist", { _: "Cintura" })}
            value={record.waist}
            unit="cm"
          />
          <MetricItem
            label={translate("measurement_show.hip", { _: "Cadera" })}
            value={record.hip}
            unit="cm"
          />
          <MetricItem
            label={translate("measurement_show.thigh", {
              _: "Muslo Superior",
            })}
            value={record.thigh}
            unit="cm"
          />
          <MetricItem
            label={translate("measurement_show.thigh_mid", {
              _: "Muslo Medio",
            })}
            value={record.mid_thigh}
            unit="cm"
          />
          <MetricItem
            label={translate("measurement_show.calf", { _: "Pantorrilla" })}
            value={record.calf}
            unit="cm"
          />
          <MetricItem
            label={translate("measurement_show.ankle", { _: "Tobillo" })}
            value={record.ankle}
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
              _: "Sección D: Diámetros Óseos & Somatotipo (cm)",
            })}
          </Typography>
          <MetricItem
            label={translate("measurement_show.biacromial", {
              _: "Biacromial",
            })}
            value={record.biacromial}
            unit="cm"
          />
          <MetricItem
            label={translate("measurement_show.transverse_chest", {
              _: "Tórax Transverso",
            })}
            value={record.transverse_chest}
            unit="cm"
          />
          <MetricItem
            label={translate("measurement_show.anterior_posterior_chest", {
              _: "Tórax Anteroposterior",
            })}
            value={record.antero_posterior_chest_depth}
            unit="cm"
          />
          <MetricItem
            label={translate("measurement_show.biiliocristal", {
              _: "Bi-iliocrestal",
            })}
            value={record.bi_iliocristal}
            unit="cm"
          />
          <MetricItem
            label={translate("measurement_show.humerus", {
              _: "Humeral (Húmero)",
            })}
            value={record.humerus}
            unit="cm"
          />
          <MetricItem
            label={translate("measurement_show.femur", {
              _: "Femoral (Fémur)",
            })}
            value={record.femur}
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

          {results && (
            <>
              <Divider sx={{ my: 1.5, borderColor: "rgba(3, 37, 23, 0.1)" }} />
              <MetricItem
                label={translate("measurement_show.calculated_bmi", {
                  _: "IMC Calculado",
                })}
                value={results.imc ? results.imc.toFixed(2) : null}
                unit="kg/m²"
              />
              <MetricItem
                label={translate("measurement_show.estimated_fat_mass", {
                  _: "Masa Grasa Estimada",
                })}
                value={
                  results.yhaszFatPercentage
                    ? results.yhaszFatPercentage.toFixed(1)
                    : null
                }
                unit="%"
              />
            </>
          )}
        </Paper>
      </Box>
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
