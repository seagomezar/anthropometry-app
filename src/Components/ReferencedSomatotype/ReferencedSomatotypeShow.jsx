import React from 'react';
import {
  Show,
  SimpleShowLayout,
  useRecordContext,
  useTranslate,
  EditButton,
} from 'react-admin';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { SomatocartaSVG } from './SomatocartaSVG';
import { SomatotypeMetricCard } from './SomatotypeMetricCard';
import { MorphologicalAnalysis } from './MorphologicalAnalysis';

const SomatotypeHeader = ({ record: propRecord }) => {
  const contextRecord = useRecordContext();
  const record = propRecord || contextRecord;
  const translate = useTranslate();

  if (!record) return null;

  const isMale = record.gender === 'male' || record.gender === true || record.gender === 'MASCULINO';
  const sportName = record.sport ? record.sport.toUpperCase() : 'SUBACUÁTICAS';
  const displayId = `2024-X${record.id || '17'}`;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 4,
        border: '1px solid #e2e8f0',
        backgroundColor: '#ffffff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
      }}
    >
      <Box>
        <Typography
          variant="caption"
          sx={{
            color: '#0284c7',
            fontWeight: 800,
            letterSpacing: 1.5,
            display: 'block',
            mb: 0.5,
            fontSize: '0.75rem',
          }}
        >
          {translate('somatotype.main_activity', { _: 'ACTIVIDAD PRINCIPAL' })}
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: '#0f172a',
            fontSize: { xs: '1.75rem', sm: '2.25rem' },
            letterSpacing: '-0.5px',
            mb: 1,
          }}
        >
          {sportName.startsWith('ACT.') ? sportName : `Act. ${sportName}`}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          <Chip
            size="small"
            label={
              isMale
                ? translate('somatotype.male', { _: 'MASCULINO' })
                : translate('somatotype.female', { _: 'FEMENINO' })
            }
            sx={{
              bgcolor: isMale ? 'rgba(56, 189, 248, 0.12)' : 'rgba(236, 72, 153, 0.12)',
              color: isMale ? '#0284c7' : '#db2777',
              fontWeight: 800,
              fontSize: '0.7rem',
              letterSpacing: 0.5,
              borderRadius: 1.5,
            }}
          />
          <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>
            • ID: {displayId}
          </Typography>
        </Box>
      </Box>

      <Box>
        <EditButton
          label={translate('somatotype.edit', { _: 'EDITAR' })}
          icon={<EditIcon fontSize="small" />}
          sx={{
            bgcolor: '#0284c7',
            color: '#ffffff',
            fontWeight: 700,
            px: 3,
            py: 1,
            borderRadius: 2.5,
            textTransform: 'uppercase',
            letterSpacing: 1,
            boxShadow: '0 4px 12px rgba(2, 132, 199, 0.25)',
            '&:hover': {
              bgcolor: '#0369a1',
            },
          }}
        />
      </Box>
    </Paper>
  );
};

const SomatotypeDashboardContent = ({ record: propRecord }) => {
  const contextRecord = useRecordContext();
  const record = propRecord || contextRecord;
  const translate = useTranslate();
  if (!record) return null;

  const endo = record.endomorph || 4.33;
  const meso = record.mesomorph || 5.08;
  const ecto = record.ectomortph || record.ectomorph || 2.15;
  const x = record.x || -0.85;
  const y = record.y || 2.93;

  return (
    <Box>
      <SomatotypeHeader record={record} />

      {/* Main Grid Row: Somatocarta Chart (Left) + Metric Cards (Right) */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Left Column: Somatocarta Chart */}
        <Grid item xs={12} lg={8}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: '1px solid #e2e8f0',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: 0.5 }}>
                {translate('somatotype.chart_title', { _: 'GRÁFICO DE SOMATOCARTA' })}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Typography variant="caption" sx={{ color: '#0f172a', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#0284c7', display: 'inline-block' }}></span> {translate('somatotype.current_profile', { _: 'Perfil Actual' })}
                </Typography>
                <Typography variant="caption" sx={{ color: '#0f172a', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#8b5cf6', display: 'inline-block' }}></span> {translate('somatotype.projected_ideal', { _: 'Ideal Proyectado' })}
                </Typography>
              </Box>
            </Box>

            <SomatocartaSVG x={x} y={y} />
          </Paper>
        </Grid>

        {/* Right Column: 3 Metric Cards */}
        <Grid item xs={12} lg={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <SomatotypeMetricCard
              title={translate('resources.result.fields.endomorph', { _: 'Endomorfo' })}
              value={endo}
              type="endo"
              targetText={translate('somatotype.target_min', { _: 'MÍN: 1.0' })}
              detailRight={translate('somatotype.target_max', { _: 'MÁX: 10.0' })}
            />
            <SomatotypeMetricCard
              title={translate('resources.result.fields.mesomorph', { _: 'Mesomorfo' })}
              value={meso}
              type="meso"
              targetText={translate('somatotype.target_goal', { _: 'OBJETIVO: 5.5' })}
              detailRight={translate('somatotype.to_goal', { _: '+0.42 PARA META' })}
            />
            <SomatotypeMetricCard
              title={translate('resources.result.fields.ectomorph', { _: 'Ectomorfo' })}
              value={ecto}
              type="ecto"
              targetText={translate('somatotype.lean_mass_opt', { _: 'OPTIMIZACIÓN DE MASA MAGRA' })}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Morphological Analysis Section */}
      <MorphologicalAnalysis
        sport={record.sport}
        endomorph={endo}
        mesomorph={meso}
        ectomorph={ecto}
      />

      {/* High Performance Sports Center Facility Banner */}
      <Paper
        elevation={0}
        sx={{
          position: 'relative',
          borderRadius: 4,
          overflow: 'hidden',
          minHeight: 220,
          backgroundImage: 'linear-gradient(180deg, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.85) 100%), url(https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: '#ffffff',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Chip
            label={translate('somatotype.certification', { _: 'CERTIFICACIÓN VITALITY' })}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.7rem',
              letterSpacing: 1.2,
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          />
        </Box>

        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#ffffff', mb: 0.5, letterSpacing: '-0.5px' }}>
            {translate('somatotype.center_title', { _: 'Centro de Alto Rendimiento' })}
          </Typography>
          <Typography variant="body2" sx={{ color: '#cbd5e1', fontWeight: 500 }}>
            {translate('somatotype.center_subtitle', { _: 'Sede Central - Departamento de Biomecánica & Nutrición' })}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export const ReferencedSomatotypeShow = (props) => {
  const outerRecord = useRecordContext();
  if (outerRecord) {
    return <SomatotypeDashboardContent record={outerRecord} />;
  }

  return (
    <Show component="div" {...props} sx={{ '& .RaShow-card': { boxShadow: 'none', backgroundColor: 'transparent' } }}>
      <SimpleShowLayout sx={{ p: 0 }}>
        <SomatotypeDashboardContent />
      </SimpleShowLayout>
    </Show>
  );
};
