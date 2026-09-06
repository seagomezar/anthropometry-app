import React from 'react';
import {
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  SaveButton,
  DeleteButton,
  useTranslate,
  useRecordContext,
} from 'react-admin';
import { useFormContext, useWatch } from 'react-hook-form';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Fab,
  LinearProgress,
  Divider,
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import HeightIcon from '@mui/icons-material/Height';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import InsightsIcon from '@mui/icons-material/Insights';

import { SomatocartaSVG } from './SomatocartaSVG';

const FormLivePreview = () => {
  const translate = useTranslate();
  const watchX = useWatch({ name: 'x' });
  const watchY = useWatch({ name: 'y' });
  const watchEndo = useWatch({ name: 'endomorph' });
  const watchMeso = useWatch({ name: 'mesomorph' });

  const numX = Number(watchX) || -0.85;
  const numY = Number(watchY) || 2.93;
  const endoVal = Number(watchEndo) || 1.9;
  const mesoVal = Number(watchMeso) || 3.8;

  const muscleBalance = Math.min(Math.max((mesoVal / 8) * 100, 15), 100);
  const adiposityLevel = Math.min(Math.max((endoVal / 8) * 100, 10), 100);

  return (
    <Grid container spacing={3} sx={{ mt: 1 }}>
      {/* Somatocarta Chart Live Preview */}
      <Grid item xs={12} md={6}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 4,
            border: '1px solid #e2e8f0',
            backgroundColor: '#ffffff',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 280,
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: '#64748b', fontWeight: 700, letterSpacing: 1, mb: 1, textTransform: 'uppercase' }}
          >
            {translate('somatotype.live_preview', { _: 'Previsualización del Gráfico Somatotipo' })}
          </Typography>
          <Box sx={{ width: '100%', maxWidth: 360 }}>
            <SomatocartaSVG x={numX} y={numY} />
          </Box>
        </Paper>
      </Grid>

      {/* Profile Analysis Card */}
      <Grid item xs={12} md={6}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 4,
            border: '1px solid #e2e8f0',
            backgroundColor: '#ffffff',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: '#64748b', fontWeight: 700, letterSpacing: 1, mb: 3, display: 'block', textTransform: 'uppercase' }}
          >
            {translate('somatotype.profile_analysis', { _: 'Análisis de Perfil' })}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                {translate('somatotype.muscle_balance', { _: 'Balance Muscular' })}
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#005ea4' }}>
                {muscleBalance > 60
                  ? translate('somatotype.high', { _: 'Alto' })
                  : translate('somatotype.moderate', { _: 'Moderado' })}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={muscleBalance}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: '#f1f5f9',
                '& .MuiLinearProgress-bar': { bgcolor: '#006874', borderRadius: 4 },
              }}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                {translate('somatotype.adiposity_level', { _: 'Nivel de Adiposidad' })}
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#005ea4' }}>
                {adiposityLevel > 50
                  ? translate('somatotype.moderate', { _: 'Moderado' })
                  : translate('somatotype.low', { _: 'Bajo' })}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={adiposityLevel}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: '#f1f5f9',
                '& .MuiLinearProgress-bar': { bgcolor: '#006874', borderRadius: 4 },
              }}
            />
          </Box>

          <InsightsIcon
            sx={{
              position: 'absolute',
              right: -10,
              bottom: -10,
              fontSize: 120,
              color: 'rgba(0, 94, 164, 0.05)',
              pointerEvents: 'none',
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

const CustomFormToolbar = () => {
  const translate = useTranslate();
  const record = useRecordContext();
  const isEdit = Boolean(record && record.id);

  return (
    <Box
      sx={{
        mt: 4,
        pt: 3,
        borderTop: '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      <SaveButton
        label={translate('somatotype.save', { _: 'GUARDAR' })}
        icon={<SaveIcon />}
        sx={{
          bgcolor: '#005ea4',
          color: '#ffffff',
          fontWeight: 800,
          px: 4,
          py: 1.2,
          borderRadius: 3,
          boxShadow: '0 4px 14px rgba(0, 94, 164, 0.3)',
          '&:hover': { bgcolor: '#004881' },
        }}
      />

      {isEdit && (
        <DeleteButton
          label={translate('somatotype.delete_measurement', { _: 'ELIMINAR MEDICIÓN' })}
          icon={<DeleteIcon />}
          sx={{
            color: '#ba1a1a',
            fontWeight: 700,
            borderRadius: 3,
            '&:hover': { bgcolor: 'rgba(186, 26, 26, 0.08)' },
          }}
        />
      )}

      {/* Floating Save Action Button on Mobile */}
      <Fab
        color="primary"
        aria-label="save"
        type="submit"
        sx={{
          position: 'fixed',
          bottom: 80,
          right: 24,
          display: { xs: 'flex', md: 'none' },
          bgcolor: '#005ea4',
          zIndex: 1000,
          boxShadow: '0 8px 24px rgba(0, 94, 164, 0.4)',
        }}
      >
        <SaveIcon />
      </Fab>
    </Box>
  );
};

export const ReferencedSomatotypeForm = (props) => {
  const translate = useTranslate();
  const record = useRecordContext();
  const isEdit = Boolean(record && record.id);

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 1, sm: 2 } }}>
      {/* Form Page Header */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="caption"
          sx={{ color: '#005ea4', fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', display: 'block', mb: 0.5 }}
        >
          {isEdit
            ? translate('somatotype.edit_record', { _: 'EDICIÓN DE REGISTRO' })
            : translate('somatotype.new_entry', { _: 'NUEVA ENTRADA' })}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#191c1e', mb: 0.5 }}>
          {isEdit
            ? translate('somatotype.data_record', { _: 'Registro de Datos' })
            : translate('somatotype.physiological_data', { _: 'Datos Fisiológicos' })}
        </Typography>
        <Typography variant="body2" sx={{ color: '#404752' }}>
          {translate('somatotype.enter_physiological', {
            _: 'Ingrese los parámetros fisiológicos para el análisis del somatotipo.',
          })}
        </Typography>
      </Box>

      <SimpleForm toolbar={<CustomFormToolbar />} {...props}>
        {/* Main Bento Form Card */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4 },
            borderRadius: 4,
            border: '1px solid #e2e8f0',
            backgroundColor: '#ffffff',
            width: '100%',
            boxShadow: '0 12px 24px -10px rgba(0, 0, 0, 0.04)',
          }}
        >
          <Grid container spacing={3}>
            {/* Sport Field */}
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="caption" sx={{ color: '#005ea4', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
                  {translate('resources.referenced_somatotype.fields.sport', { _: 'Deporte' })}
                </Typography>
                <FitnessCenterIcon sx={{ color: '#005ea4', fontSize: 20 }} />
              </Box>
              <TextInput
                source="sport"
                label={false}
                placeholder="ATLET fondo"
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#f2f4f6',
                    borderRadius: 2,
                    borderBottom: '2px solid rgba(0, 94, 164, 0.3)',
                    '& fieldset': { border: 'none' },
                  },
                }}
              />
            </Grid>

            {/* Gender Field */}
            <Grid item xs={12} md={4}>
              <Typography variant="caption" sx={{ color: '#005ea4', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', display: 'block', mb: 1 }}>
                {translate('resources.referenced_somatotype.fields.gender', { _: 'Género' })}
              </Typography>
              <SelectInput
                source="gender"
                label={false}
                fullWidth
                choices={[
                  { id: true, name: translate('myroot.male', { _: 'Masculino' }) },
                  { id: false, name: translate('myroot.female', { _: 'Femenino' }) },
                ]}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#f2f4f6',
                    borderRadius: 2,
                    borderBottom: '2px solid rgba(0, 94, 164, 0.3)',
                    '& fieldset': { border: 'none' },
                  },
                }}
              />
            </Grid>

            {/* Section Divider: Componentes del Somatotipo */}
            <Grid item xs={12}>
              <Typography variant="caption" sx={{ color: '#707783', fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', display: 'block', pt: 1 }}>
                {translate('somatotype.components', { _: 'COMPONENTES DEL SOMATOTIPO' })}
              </Typography>
              <Divider sx={{ mt: 1, borderColor: '#e2e8f0' }} />
            </Grid>

            {/* Endomorph */}
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: '1px solid #e2e8f0',
                  bgcolor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ color: '#707783', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', display: 'block' }}>
                    {translate('resources.referenced_somatotype.fields.endomorph', { _: 'Endomorfo' })}
                  </Typography>
                  <NumberInput
                    source="endomorph"
                    label={false}
                    step={0.1}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        '& fieldset': { border: 'none' },
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    bgcolor: '#ebdcff',
                    color: '#260058',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ml: 1,
                  }}
                >
                  <BloodtypeIcon />
                </Box>
              </Paper>
            </Grid>

            {/* Mesomorph */}
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: '1px solid #e2e8f0',
                  bgcolor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ color: '#707783', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', display: 'block' }}>
                    {translate('resources.referenced_somatotype.fields.mesomorph', { _: 'Mesomorfo' })}
                  </Typography>
                  <NumberInput
                    source="mesomorph"
                    label={false}
                    step={0.1}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        '& fieldset': { border: 'none' },
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    bgcolor: '#98f0ff',
                    color: '#001f24',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ml: 1,
                  }}
                >
                  <FitnessCenterIcon />
                </Box>
              </Paper>
            </Grid>

            {/* Ectomorph */}
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: '1px solid #e2e8f0',
                  bgcolor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ color: '#707783', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', display: 'block' }}>
                    {translate('resources.referenced_somatotype.fields.ectomorph', { _: 'Ectomorfo' })}
                  </Typography>
                  <NumberInput
                    source="ectomorph"
                    label={false}
                    step={0.1}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        '& fieldset': { border: 'none' },
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    bgcolor: '#d3e4ff',
                    color: '#001c38',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ml: 1,
                  }}
                >
                  <HeightIcon />
                </Box>
              </Paper>
            </Grid>

            {/* Section Divider: Coordenadas Cartesianas */}
            <Grid item xs={12}>
              <Typography variant="caption" sx={{ color: '#707783', fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', display: 'block', pt: 1 }}>
                {translate('somatotype.cartesian_coords', { _: 'COORDENADAS CARTESIANAS' })}
              </Typography>
              <Divider sx={{ mt: 1, borderColor: '#e2e8f0' }} />
            </Grid>

            {/* Eje X */}
            <Grid item xs={12} sm={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: '1px solid #e2e8f0',
                  bgcolor: '#ffffff',
                }}
              >
                <Typography variant="caption" sx={{ color: '#707783', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', display: 'block', mb: 0.5 }}>
                  {translate('resources.referenced_somatotype.fields.x', { _: 'Eje X' })}
                </Typography>
                <NumberInput
                  source="x"
                  label={false}
                  step={0.1}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      '& fieldset': { border: 'none' },
                    },
                  }}
                />
              </Paper>
            </Grid>

            {/* Eje Y */}
            <Grid item xs={12} sm={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: '1px solid #e2e8f0',
                  bgcolor: '#ffffff',
                }}
              >
                <Typography variant="caption" sx={{ color: '#707783', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', display: 'block', mb: 0.5 }}>
                  {translate('resources.referenced_somatotype.fields.y', { _: 'Eje Y' })}
                </Typography>
                <NumberInput
                  source="y"
                  label={false}
                  step={0.1}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      '& fieldset': { border: 'none' },
                    },
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Paper>

        {/* Live Data Preview Section */}
        <FormLivePreview />
      </SimpleForm>
    </Box>
  );
};
