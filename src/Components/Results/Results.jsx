import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ShieldIcon from '@mui/icons-material/Shield';

import { generateResults } from '../../Providers/retultsProvider';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  useGetOne,
  useDataProvider,
  useTranslate,
  usePermissions,
} from 'react-admin';
import PolarChart from '../PolarChart/PolarChart';
import BarChart from '../BarChart/BarChart';
import ScatterChart from '../ScatterChart/ScatterChart';
import ResultsChart from './ResultsChart';
import { useFeaturePreferences } from '../../config/features';

const TabulatedLedgerTable = ({ title, subtitle, rows, translate }) => {
  return (
    <Box sx={{ mb: 3.5, '&:last-child': { mb: 1 } }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          borderBottom: '2px solid rgba(27, 59, 43, 0.2)',
          pb: 0.8,
          mb: 1.5,
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontWeight: 700,
            color: '#032517',
            fontSize: '16px',
            letterSpacing: '0.02em',
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="caption"
            sx={{
              fontFamily: "'JetBrains Mono', monospace",
              color: '#775a00',
              fontSize: '11px',
              letterSpacing: '0.04em',
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: '2px double #1b3b2b',
          borderRadius: '2px',
          overflow: 'hidden',
          backgroundColor: '#fff',
          boxShadow: '0 2px 6px rgba(27, 59, 43, 0.05)',
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: '#1b3b2b !important',
                  color: '#fcf9f4 !important',
                  fontFamily: "'EB Garamond', Georgia, serif",
                  fontWeight: 700,
                  fontSize: '13px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  borderBottom: '2px solid #c29b38',
                  borderRight: '1px solid rgba(252, 249, 244, 0.15)',
                  py: 1.1,
                  px: 1.5,
                }}
              >
                {translate('results.col_parameter', { _: 'Variable / Parámetro' })}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  backgroundColor: '#1b3b2b !important',
                  color: '#fcf9f4 !important',
                  fontFamily: "'EB Garamond', Georgia, serif",
                  fontWeight: 700,
                  fontSize: '13px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  borderBottom: '2px solid #c29b38',
                  borderRight: '1px solid rgba(252, 249, 244, 0.15)',
                  py: 1.1,
                  px: 1.5,
                  width: { xs: '120px', sm: '170px' },
                }}
              >
                {translate('results.col_value', { _: 'Valor Calculado' })}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: '#1b3b2b !important',
                  color: '#fcf9f4 !important',
                  fontFamily: "'EB Garamond', Georgia, serif",
                  fontWeight: 700,
                  fontSize: '13px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  borderBottom: '2px solid #c29b38',
                  py: 1.1,
                  px: 1.5,
                  width: { xs: '90px', sm: '130px' },
                }}
              >
                {translate('results.col_unit', { _: 'Unidad' })}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow
                key={row.key || idx}
                sx={{
                  backgroundColor: idx % 2 === 0 ? '#ffffff' : '#faf7f2',
                  '&:hover': {
                    backgroundColor: 'rgba(245, 239, 230, 0.95) !important',
                    borderLeft: '4px solid #c29b38',
                  },
                }}
              >
                <TableCell
                  sx={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    color: '#1c1c19',
                    py: 0.8,
                    px: 1.5,
                    borderBottom: '1px solid rgba(27, 59, 43, 0.08)',
                    borderRight: '1px solid rgba(27, 59, 43, 0.05)',
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '13px' }}>
                    {row.label}
                  </Typography>
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700,
                    fontSize: '13.5px',
                    color: '#032517',
                    py: 0.8,
                    px: 1.5,
                    borderBottom: '1px solid rgba(27, 59, 43, 0.08)',
                    borderRight: '1px solid rgba(27, 59, 43, 0.05)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {row.value}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    py: 0.8,
                    px: 1.5,
                    borderBottom: '1px solid rgba(27, 59, 43, 0.08)',
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      color: '#775a00',
                      backgroundColor: 'rgba(194, 155, 56, 0.12)',
                      border: '1px solid rgba(194, 155, 56, 0.3)',
                      px: 0.8,
                      py: 0.2,
                      borderRadius: '2px',
                      display: 'inline-block',
                    }}
                  >
                    {row.unit}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export const Results = React.memo(() => {
  let { measurementId } = useParams();
  const translate = useTranslate();
  const { isFeatureEnabled } = useFeaturePreferences();
  const { data, isLoading } = useGetOne('measurement', {
    id: measurementId,
  });
  const { permissions } = usePermissions();
  const [user, setUser] = React.useState();
  const [result, setResult] = React.useState({
    activeMass: 0,
    complexion: 0,
    conicIndex: 0,
    desiredFat2MethodPercentage: 0,
    desiredWeight: 0,
    desiredIMC: 0,
    ectomorph: 0,
    endoFactor: 0,
    endomorph: 0,
    fatWeight: 0,
    faulknerFatPercentage: 0,
    freeFatWeight: 0,
    iaks: 0,
    imc: 0,
    mesomorph: 0,
    parizcovaFatPercentage: 0,
    ponderalIndex: 0,
    raizPT: 0,
    residualWeight: 0,
    resultX: 0,
    resultY: 0,
    sumOfPlgs: 0,
    sumaPlieguesEndo: 0,
    yhaszFatPercentage: 0,
  });
  const [referecedSomatotype, setReferencedSomatotype] =
    React.useState({
      x: 0,
      y: 0,
    });
  const dataProvider = useDataProvider();

  React.useEffect(() => {
    if (!data || !data.user_id) return;
    dataProvider.getOne('user', { id: data.user_id }).then((res) => {
      const userData = res.data || res;
      setResult(
        generateResults(
          data,
          data.height,
          data.weight,
          userData.gender === 'Femenino' ? false : true
        )
      );
      setUser(userData);
    }).catch((err) => console.warn('Error fetching user for results:', err));

    if (data.referenced_somatotype_id) {
      dataProvider
        .getOne('referenced_somatotype', {
          id: data.referenced_somatotype_id,
        })
        .then((r) => {
          setReferencedSomatotype(r.data || r);
        })
        .catch((err) => console.warn('Error fetching somatotype for results:', err));
    }
  }, [data, dataProvider]);

  if (isLoading || !data) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontFamily: "'EB Garamond', serif", color: '#1b3b2b' }}>
          {translate('results.loading', {
            _: 'Cargando informe biométrico y morfológico...',
          })}
        </Typography>
      </Box>
    );
  }

  const isNutritionist = permissions?.role === 'nutritionist';
  const isUnauthorized =
    isNutritionist &&
    (!data.nutritionist_id || Number(data.nutritionist_id) !== Number(permissions?.nutritionistId));

  if (isUnauthorized) {
    return (
      <Box sx={{ p: 4, maxWidth: 600, margin: '40px auto', textAlign: 'center' }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            border: '3px double #ba1a1a',
            borderRadius: '2px',
            backgroundColor: '#fffaf9',
          }}
        >
          <ShieldIcon sx={{ fontSize: 56, color: '#ba1a1a', mb: 1.5 }} />
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'EB Garamond', serif",
              fontWeight: 700,
              color: '#ba1a1a',
              mb: 1,
            }}
          >
            {translate('auth.restricted_title', { _: 'Acceso Restringido' })}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "'Inter', sans-serif",
              color: '#424843',
              mb: 3,
              lineHeight: 1.6,
            }}
          >
            {translate('auth.restricted_message', {
              _: 'Este expediente confidencial pertenece a otro especialista. No tiene permisos para consultar o modificar esta información.',
            })}
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/measurement"
            sx={{
              backgroundColor: '#1b3b2b',
              color: '#fcf9f4',
              fontFamily: "'EB Garamond', serif",
              fontSize: '15px',
              fontWeight: 700,
              '&:hover': { backgroundColor: '#032517' },
            }}
          >
            {translate('results.back_to_measurements', { _: 'Volver a Mediciones' })}
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1200, margin: '0 auto' }}>
      {/* Vintage Header matching Stitch Heritage Laboratory */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          backgroundColor: '#f6f3ee',
          border: '1px solid rgba(3, 37, 23, 0.2)',
          borderTop: '3px solid #1b3b2b',
          borderRadius: 1,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ bgcolor: 'rgba(3, 37, 23, 0.1)', p: 1, borderRadius: 1, color: '#1b3b2b', display: 'flex' }}>
              <AnalyticsIcon />
            </Box>
            <div>
              <Typography variant="h5" sx={{ fontFamily: "'EB Garamond', serif", fontWeight: 700, color: '#032517' }}>
                {translate('results.title', {
                  _: 'Informe Biométrico & Diagnóstico Morfológico',
                })}
              </Typography>
              <Typography variant="caption" sx={{ fontFamily: "'JetBrains Mono', monospace", color: '#775a00' }}>
                {translate('results.control_caption', {
                  control: data.control || data.id,
                  _: `CONTROL #${data.control || data.id} — EVALUACIÓN ANTROPOMÉTRICA`,
                })}
              </Typography>
            </div>
          </Box>

          <Button
            component={RouterLink}
            to="/measurement"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{
              borderColor: 'rgba(3, 37, 23, 0.3)',
              color: '#1b3b2b',
              backgroundColor: '#fff',
              fontSize: '13px',
              '&:hover': {
                backgroundColor: 'rgba(27, 59, 43, 0.05)',
              },
            }}
          >
            {translate('results.back_to_measurements', {
              _: 'Volver a Mediciones',
            })}
          </Button>
        </Box>

        {user && (
          <Box sx={{ display: 'flex', gap: 1.5, mt: 1.5, flexWrap: 'wrap' }}>
            <Chip
              label={`${translate('results.patient', { _: 'Paciente' })}: ${user.firstname || ''} ${user.lastname || ''}`}
              size="small"
              sx={{ backgroundColor: '#fff', border: '1px solid rgba(3, 37, 23, 0.15)', fontWeight: 600 }}
            />
            {data.height && (
              <Chip
                label={`${translate('results.height', { _: 'Talla' })}: ${data.height} cm`}
                size="small"
                sx={{ backgroundColor: '#fff', border: '1px solid rgba(3, 37, 23, 0.15)' }}
              />
            )}
            {data.weight && (
              <Chip
                label={`${translate('results.weight', { _: 'Peso' })}: ${data.weight} kg`}
                size="small"
                sx={{ backgroundColor: '#fff', border: '1px solid rgba(3, 37, 23, 0.15)' }}
              />
            )}
            {result.imc > 0 && (
              <Chip
                label={`${translate('results.bmi', { _: 'IMC' })}: ${parseFloat(result.imc).toFixed(1)} kg/m²`}
                size="small"
                sx={{ backgroundColor: 'rgba(194, 155, 56, 0.15)', color: '#775a00', fontWeight: 600 }}
              />
            )}
          </Box>
        )}
      </Paper>
      {/* Official Tabulated Data Ledger matching Stitch Heritage Laboratory */}
      <Accordion
        defaultExpanded
        sx={{
          border: '1px solid rgba(27, 59, 43, 0.2)',
          borderTop: '4px solid #1b3b2b',
          borderRadius: '2px !important',
          mb: 3,
          backgroundColor: '#fff',
          boxShadow: '0 2px 8px rgba(27, 59, 43, 0.08)',
          '&:before': { display: 'none' },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: '#1b3b2b' }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            backgroundColor: '#faf7f2',
            borderBottom: '1px solid rgba(27, 59, 43, 0.15)',
            px: { xs: 2, md: 3 },
            py: 1.2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              flexWrap: 'wrap',
              gap: 1.5,
              pr: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: '#1b3b2b',
                  color: '#fed269',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1.5px solid #c29b38',
                }}
              >
                <MenuBookIcon fontSize="small" />
              </Box>
              <div>
                <Typography
                  sx={{
                    fontFamily: "'EB Garamond', Georgia, serif",
                    fontWeight: 700,
                    fontSize: '18px',
                    color: '#032517',
                    lineHeight: 1.2,
                  }}
                >
                  {translate('results.tabulated_ledger', {
                    _: 'Cuaderno Oficial de Datos Tabulados',
                  })}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: "'Inter', sans-serif",
                    color: '#424843',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    fontSize: '11px',
                    display: 'block',
                    mt: 0.2,
                  }}
                >
                  {translate('results.tabulated_subtitle', {
                    _: 'Cálculos de Composición Corporal, Índices y Somatotipo Heath-Carter',
                  })}
                </Typography>
              </div>
            </Box>

            <Chip
              label={translate('resources.result.tabbed_data', { _: 'Datos Tabulados' })}
              size="small"
              sx={{
                backgroundColor: 'rgba(194, 155, 56, 0.15)',
                color: '#775a00',
                border: '1px solid rgba(194, 155, 56, 0.4)',
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: '11px',
                borderRadius: '2px',
              }}
            />
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ p: { xs: 2, md: 3 }, backgroundColor: '#fcf9f4' }}>
          <TabulatedLedgerTable
            title={translate('results.table_indices', {
              _: 'Tabla I: Índices Fisiológicos & Antropométricos',
            })}
            subtitle="PROTOCOLOS ISAK • NORMAS INTERNACIONALES"
            rows={[
              {
                key: 'imc',
                label: translate('resources.result.fields.imc'),
                value: parseFloat(result.imc || 0).toFixed(2),
                unit: 'kg/m²',
              },
              {
                key: 'ponderalIndex',
                label: translate('resources.result.fields.ponderalIndex'),
                value: parseFloat(result.ponderalIndex || 0).toFixed(2),
                unit: 'kg/m³',
              },
              {
                key: 'conicIndex',
                label: translate('resources.result.fields.conicIndex'),
                value: parseFloat(result.conicIndex || 0).toFixed(2),
                unit: translate('results.unit_adimensional', { _: 'Adimensional' }),
              },
              {
                key: 'complexion',
                label: translate('resources.result.fields.complexion'),
                value: parseFloat(result.complexion || 0).toFixed(2),
                unit: translate('results.unit_adimensional', { _: 'Adimensional' }),
              },
              {
                key: 'raizPT',
                label: translate('resources.result.fields.raizPT'),
                value: parseFloat(result.raizPT || 0).toFixed(2),
                unit: translate('results.unit_adimensional', { _: 'Adimensional' }),
              },
              {
                key: 'iaks',
                label: translate('resources.result.fields.iaks'),
                value: parseFloat(result.iaks || 0).toFixed(2),
                unit: translate('results.unit_adimensional', { _: 'Adimensional' }),
              },
            ]}
            translate={translate}
          />

          <TabulatedLedgerTable
            title={translate('results.table_fat_models', {
              _: 'Tabla II: Modelos de Grasa & Masas Corporales',
            })}
            subtitle="FAULKNER • YUHASZ • PARIZKOVA"
            rows={[
              {
                key: 'faulknerFatPercentage',
                label: translate('resources.result.fields.faulknerFatPercentage'),
                value: parseFloat(result.faulknerFatPercentage || 0).toFixed(2),
                unit: '%',
              },
              {
                key: 'parizcovaFatPercentage',
                label: translate('resources.result.fields.parizcovaFatPercentage'),
                value: parseFloat(result.parizcovaFatPercentage || 0).toFixed(2),
                unit: '%',
              },
              {
                key: 'yhaszFatPercentage',
                label: translate('resources.result.fields.yhaszFatPercentage'),
                value: parseFloat(result.yhaszFatPercentage || 0).toFixed(2),
                unit: '%',
              },
              {
                key: 'desiredFat2MethodPercentage',
                label: translate('resources.result.fields.desiredFat2MethodPercentage'),
                value: parseFloat(result.desiredFat2MethodPercentage || 0).toFixed(2),
                unit: '%',
              },
              {
                key: 'fatWeight',
                label: translate('resources.result.fields.fatWeight'),
                value: parseFloat(result.fatWeight || 0).toFixed(2),
                unit: 'kg',
              },
              {
                key: 'freeFatWeight',
                label: translate('resources.result.fields.freeFatWeight'),
                value: parseFloat(result.freeFatWeight || 0).toFixed(2),
                unit: 'kg',
              },
              {
                key: 'activeMass',
                label: translate('resources.result.fields.activeMass'),
                value: parseFloat(result.activeMass || 0).toFixed(2),
                unit: 'kg',
              },
              {
                key: 'residualWeight',
                label: translate('resources.result.fields.residualWeight'),
                value: parseFloat(result.residualWeight || 0).toFixed(2),
                unit: 'kg',
              },
              {
                key: 'desiredWeight',
                label: translate('resources.result.fields.desiredWeight'),
                value: parseFloat(result.desiredWeight || 0).toFixed(2),
                unit: 'kg',
              },
              {
                key: 'desiredIMC',
                label: translate('resources.result.fields.desiredIMC'),
                value: parseFloat(result.desiredIMC || 0).toFixed(2),
                unit: 'kg/m²',
              },
            ]}
            translate={translate}
          />

          <TabulatedLedgerTable
            title={translate('results.table_somatotype', {
              _: 'Tabla III: Parámetros del Somatotipo Heath-Carter',
            })}
            subtitle="ENDOMORFIA • MESOMORFIA • ECTOMORFIA • COORDENADAS"
            rows={[
              {
                key: 'endomorph',
                label: translate('resources.result.fields.endomorph'),
                value: parseFloat(result.endomorph || 0).toFixed(2),
                unit: 'Endo',
              },
              {
                key: 'mesomorph',
                label: translate('resources.result.fields.mesomorph'),
                value: parseFloat(result.mesomorph || 0).toFixed(2),
                unit: 'Meso',
              },
              {
                key: 'ectomorph',
                label: translate('resources.result.fields.ectomorph'),
                value: parseFloat(result.ectomorph || 0).toFixed(2),
                unit: 'Ecto',
              },
              {
                key: 'endoFactor',
                label: translate('resources.result.fields.endoFactor'),
                value: parseFloat(result.endoFactor || 0).toFixed(2),
                unit: 'Factor',
              },
              {
                key: 'sumaPlieguesEndo',
                label: translate('resources.result.fields.sumaPlieguesEndo'),
                value: parseFloat(result.sumaPlieguesEndo || 0).toFixed(2),
                unit: 'mm',
              },
              {
                key: 'sumOfPlgs',
                label: translate('resources.result.fields.sumOfPlgs'),
                value: parseFloat(result.sumOfPlgs || 0).toFixed(2),
                unit: 'mm',
              },
              {
                key: 'resultX',
                label: translate('resources.result.fields.resultX'),
                value: parseFloat(result.resultX || 0).toFixed(2),
                unit: 'Coord X',
              },
              {
                key: 'resultY',
                label: translate('resources.result.fields.resultY'),
                value: parseFloat(result.resultY || 0).toFixed(2),
                unit: 'Coord Y',
              },
            ]}
            translate={translate}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          border: '1px solid rgba(27, 59, 43, 0.18)',
          borderTop: '3px solid #c29b38',
          borderRadius: '2px !important',
          mb: 2.5,
          backgroundColor: '#fff',
          boxShadow: '0 2px 6px rgba(27, 59, 43, 0.05)',
          '&:before': { display: 'none' },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: '#1b3b2b' }} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          sx={{
            backgroundColor: '#faf7f2',
            borderBottom: '1px solid rgba(27, 59, 43, 0.12)',
            px: { xs: 2, md: 3 },
          }}
        >
          <Typography
            sx={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: '17px',
              color: '#032517',
            }}
          >
            {translate('resources.result.body_type')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
            <Box sx={{ flex: 1, minWidth: 280, maxWidth: 500 }}>
              <PolarChart
                x={[
                  translate('resources.result.fields.ectomorph'),
                  translate('resources.result.fields.endomorph'),
                  translate('resources.result.fields.mesomorph'),
                ]}
                y={[
                  result.ectomorph,
                  result.endomorph,
                  result.mesomorph,
                ]}
                title={translate('resources.result.body_type')}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: 280, maxWidth: 500 }}>
              <ScatterChart
                labels={[
                  translate('resources.result.x_y_actual'),
                  translate('resources.result.x_y_referenced'),
                ]}
                points={[
                  { x: result.resultX, y: result.resultY },
                  {
                    x: referecedSomatotype.x,
                    y: referecedSomatotype.y,
                  },
                ]}
                title={translate('resources.result.x_y_compairson')}
              />
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          border: '1px solid rgba(27, 59, 43, 0.18)',
          borderTop: '3px solid #1b3b2b',
          borderRadius: '2px !important',
          mb: 2.5,
          backgroundColor: '#fff',
          boxShadow: '0 2px 6px rgba(27, 59, 43, 0.05)',
          '&:before': { display: 'none' },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: '#1b3b2b' }} />}
          aria-controls="panel3a-content"
          id="panel3a-header"
          sx={{
            backgroundColor: '#faf7f2',
            borderBottom: '1px solid rgba(27, 59, 43, 0.12)',
            px: { xs: 2, md: 3 },
          }}
        >
          <Typography
            sx={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: '17px',
              color: '#032517',
            }}
          >
            {translate('resources.result.fat_percentages')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: { xs: 2, md: 3 } }}>
          <Box sx={{ maxWidth: 550, mx: 'auto' }}>
            <BarChart
              x={[
                translate(
                  'resources.result.fields.yhaszFatPercentage'
                ),
                translate(
                  'resources.result.fields.faulknerFatPercentage'
                ),
                translate(
                  'resources.result.fields.parizcovaFatPercentage'
                ),
              ]}
              y={[
                result.yhaszFatPercentage,
                result.faulknerFatPercentage,
                result.parizcovaFatPercentage,
              ]}
              title={translate('resources.result.fat_percentages')}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          border: '1px solid rgba(27, 59, 43, 0.18)',
          borderTop: '3px solid #c29b38',
          borderRadius: '2px !important',
          mb: 2.5,
          backgroundColor: '#fff',
          boxShadow: '0 2px 6px rgba(27, 59, 43, 0.05)',
          '&:before': { display: 'none' },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: '#1b3b2b' }} />}
          aria-controls="panel4a-content"
          id="panel4a-header"
          sx={{
            backgroundColor: '#faf7f2',
            borderBottom: '1px solid rgba(27, 59, 43, 0.12)',
            px: { xs: 2, md: 3 },
          }}
        >
          <Typography
            sx={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: '17px',
              color: '#032517',
            }}
          >
            {translate('resources.result.imc_analysis')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: { xs: 2, md: 3 } }}>
          <Box sx={{ maxWidth: 550, mx: 'auto' }}>
            <BarChart
              x={[
                translate('resources.result.fields.desiredIMC'),
                translate('resources.result.fields.imc'),
              ]}
              y={[result.desiredIMC, result.imc]}
              title={translate('resources.result.imc_analysis')}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          border: '1px solid rgba(27, 59, 43, 0.18)',
          borderTop: '3px solid #1b3b2b',
          borderRadius: '2px !important',
          mb: 2.5,
          backgroundColor: '#fff',
          boxShadow: '0 2px 6px rgba(27, 59, 43, 0.05)',
          '&:before': { display: 'none' },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: '#1b3b2b' }} />}
          aria-controls="panel5a-content"
          id="panel5a-header"
          sx={{
            backgroundColor: '#faf7f2',
            borderBottom: '1px solid rgba(27, 59, 43, 0.12)',
            px: { xs: 2, md: 3 },
          }}
        >
          <Typography
            sx={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: '17px',
              color: '#032517',
            }}
          >
            {translate('resources.result.historic')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: { xs: 2, md: 3 } }}>
          {user && <ResultsChart user={user.data || user} />}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
});
