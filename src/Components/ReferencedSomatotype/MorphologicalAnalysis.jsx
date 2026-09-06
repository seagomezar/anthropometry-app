import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Paper, Divider } from '@mui/material';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import PoolIcon from '@mui/icons-material/Pool';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { useTranslate } from 'react-admin';

export const MorphologicalAnalysis = ({ sport = 'Subacuática', endomorph = 4.33, mesomorph = 5.08, ectomorph = 2.15 }) => {
  const translate = useTranslate();
  // Determine dominant profile description
  const endo = Number(endomorph) || 0;
  const meso = Number(mesomorph) || 0;
  const ecto = Number(ectomorph) || 0;

  let profileName = 'Meso-Endomórfica';
  if (meso > endo && meso > ecto) {
    profileName = 'Mesomorfo Predominante';
  } else if (endo > meso && endo > ecto) {
    profileName = 'Endomorfo Predominante';
  } else if (ecto > meso && ecto > endo) {
    profileName = 'Ectomorfo Predominante';
  }

  const sportTitle = sport.toLowerCase().includes('subacuat') ? 'Subacuática' : sport;

  return (
    <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 4, border: '1px solid #e2e8f0' }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5, color: '#0f172a' }}>
        {translate('somatotype.morphological_analysis', { _: 'Análisis Morfológico' })}
      </Typography>

      <Grid container spacing={3}>
        {/* Card 1: Perfil Dominante */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: '1px solid #f1f5f9',
              backgroundColor: '#fafafa',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  bgcolor: '#dbeafe',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FitScreenIcon />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a' }}>
                {translate('somatotype.dominant_profile', { _: 'Perfil Dominante' })}
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.6 }}>
              {translate('somatotype.dominant_prefix', { _: 'Predominancia' })}{' '}
              <strong style={{ color: '#0284c7' }}>{profileName}</strong>. {translate('somatotype.dominant_suffix', { _: 'La robustez muscular es el factor determinante, con una presencia moderada de tejido adiposo que facilita la flotabilidad neutra y resistencia física general.' })}
            </Typography>
          </Box>
        </Grid>

        {/* Card 2: Aptitud Sport */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: '1px solid #f1f5f9',
              backgroundColor: '#fafafa',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  bgcolor: '#ccfbf1',
                  color: '#0d9488',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PoolIcon />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a' }}>
                {translate('somatotype.sport_aptitude', { _: 'Aptitud' })} {sportTitle}
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.6 }}>
              {translate('somatotype.aptitude_desc', { _: 'Alta capacidad de reserva energética. Ideal para inmersiones prolongadas de baja intensidad. Estabilidad hidrodinámica excelente debido al centro de masa bajo.' })}
            </Typography>
          </Box>
        </Grid>

        {/* Card 3: Recomendación */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: '1px solid #f1f5f9',
              backgroundColor: '#fafafa',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  bgcolor: '#f3e8ff',
                  color: '#9333ea',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AssignmentIcon />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a' }}>
                {translate('somatotype.recommendation', { _: 'Recomendación' })}
              </Typography>
            </Box>

            <Box component="ul" sx={{ pl: 2, m: 0, color: '#475569', fontSize: '0.875rem', lineHeight: 1.6 }}>
              <li style={{ marginBottom: '8px' }}>{translate('somatotype.rec_item_1', { _: 'Focalizar en entrenamiento hipertrófico específico.' })}</li>
              <li style={{ marginBottom: '8px' }}>{translate('somatotype.rec_item_2', { _: 'Control glucémico estricto previo a sesión.' })}</li>
              <li>{translate('somatotype.rec_item_3', { _: 'Optimizar ratio potencia/peso (W/kg).' })}</li>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
