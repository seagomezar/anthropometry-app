import React from 'react';
import { useTranslate } from 'react-admin';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Grid,
  Chip,
  IconButton,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import StraightenIcon from '@mui/icons-material/Straighten';
import GroupsIcon from '@mui/icons-material/Groups';
import BiotechIcon from '@mui/icons-material/Biotech';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TuneIcon from '@mui/icons-material/Tune';

import { useFeaturePreferences } from '../../config/features';

const ICON_MAP = {
  folder_shared: <FolderSharedIcon />,
  straighten: <StraightenIcon />,
  groups: <GroupsIcon />,
  biotech: <BiotechIcon />,
  analytics: <AnalyticsIcon />,
  picture_as_pdf: <PictureAsPdfIcon />,
};

export const FeatureSettingsModal = ({ open, onClose }) => {
  const translate = useTranslate();
  const {
    preferences,
    isFeatureEnabled,
    toggleFeature,
    applyPreset,
    reset,
    definitions,
    presets,
  } = useFeaturePreferences();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            backgroundColor: '#fcf9f4',
            border: '1px solid rgba(3, 37, 23, 0.25)',
            borderRadius: 2,
            p: { xs: 1, sm: 2 },
            boxShadow: '0 20px 50px rgba(3, 37, 23, 0.2)',
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          pb: 1,
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                bgcolor: 'rgba(3, 37, 23, 0.1)',
                p: 0.8,
                borderRadius: 1,
                color: '#1b3b2b',
                display: 'flex',
              }}
            >
              <TuneIcon />
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontWeight: 700,
                color: '#032517',
              }}
            >
              {translate('features.title', { _: 'Configuración de Módulos & Funcionalidades' })}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: '#424843',
              mt: 0.8,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {translate('features.description', {
              _: 'Habilite o deshabilite módulos para personalizar la interfaz del laboratorio según su flujo de trabajo. Los cambios se aplican instantáneamente en el menú y las vistas.',
            })}
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          aria-label={translate('ra.action.close', { _: 'Cerrar' })}
          sx={{ color: '#424843' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ borderColor: 'rgba(3, 37, 23, 0.15)' }}>
        {/* Presets Row */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="caption"
            sx={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#775a00',
              display: 'block',
              mb: 1,
            }}
          >
            {translate('features.presets_title', { _: 'PRESETS RÁPIDOS' })}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {Object.entries(presets).map(([key, preset]) => (
              <Button
                key={key}
                variant="outlined"
                size="small"
                onClick={() => applyPreset(key)}
                sx={{
                  borderColor: 'rgba(3, 37, 23, 0.3)',
                  color: '#1b3b2b',
                  backgroundColor: '#f6f3ee',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'rgba(194, 155, 56, 0.15)',
                    borderColor: '#c29b38',
                  },
                }}
              >
                {translate(`features.preset_${key}`, { _: preset.name })}
              </Button>
            ))}
          </Box>
        </Box>

        <Divider sx={{ mb: 3, borderColor: 'rgba(3, 37, 23, 0.1)' }} />

        {/* Feature Cards Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(2, 1fr)',
            },
            gap: 2,
          }}
        >
          {definitions.map((def) => {
            const enabled = isFeatureEnabled(def.key);
            const featureTitle = translate(`features.${def.key}_title`, { _: def.name });
            const featureDesc = translate(`features.${def.key}_desc`, { _: def.description });
            return (
              <Box
                key={def.key}
                sx={{
                  backgroundColor: enabled ? '#ffffff' : '#f0ede9',
                  border: '1px solid',
                  borderColor: enabled
                    ? 'rgba(3, 37, 23, 0.25)'
                    : 'rgba(140, 130, 120, 0.3)',
                  borderTop: enabled
                    ? '3px solid #1b3b2b'
                    : '3px solid #c1c8c2',
                  borderRadius: '4px',
                  p: 2.5,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease',
                  boxShadow: enabled
                    ? '0 2px 8px rgba(3, 37, 23, 0.05)'
                    : 'none',
                }}
              >
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: '3px',
                        backgroundColor: enabled
                          ? 'rgba(3, 37, 23, 0.08)'
                          : 'rgba(0,0,0,0.05)',
                        color: enabled ? '#1b3b2b' : '#727973',
                        display: 'flex',
                      }}
                    >
                      {ICON_MAP[def.icon] || <SettingsIcon />}
                    </Box>
                    <span
                      className={enabled ? 'badge-active' : 'badge-inactive'}
                    >
                      {enabled
                        ? translate('features.active', { _: 'ACTIVO' })
                        : translate('features.inactive', { _: 'INACTIVO' })}
                    </span>
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'EB Garamond', Georgia, serif",
                      fontWeight: 600,
                      fontSize: '18px',
                      color: enabled ? '#032517' : '#727973',
                      mb: 0.5,
                    }}
                  >
                    {featureTitle}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: enabled ? '#424843' : '#727973',
                      fontSize: '13px',
                      lineHeight: 1.5,
                    }}
                  >
                    {featureDesc}
                  </Typography>
                </Box>

                {/* Tactile Brass Toggle Footer */}
                <Box
                  sx={{
                    mt: 2.5,
                    pt: 1.5,
                    borderTop: '1px solid rgba(3, 37, 23, 0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      fontSize: '10px',
                      color: '#775a00',
                    }}
                  >
                    {translate('features.module_status', { _: 'ESTADO DEL MÓDULO' })}
                  </Typography>
                  <input
                    type="checkbox"
                    className="brass-toggle"
                    checked={enabled}
                    onChange={() => toggleFeature(def.key)}
                    aria-label={`Alternar ${featureTitle}`}
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: 'space-between',
          px: 3,
          py: 2,
          backgroundColor: '#f6f3ee',
          borderTop: '1px solid rgba(3, 37, 23, 0.15)',
        }}
      >
        <Button
          onClick={reset}
          color="inherit"
          startIcon={<RestartAltIcon />}
          sx={{
            fontFamily: "'Inter', sans-serif",
            color: '#424843',
            fontSize: '13px',
          }}
        >
          {translate('features.reset', { _: 'Restablecer Valores' })}
        </Button>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: '#1b3b2b',
            color: '#fcf9f4',
            px: 3,
            '&:hover': {
              backgroundColor: '#032517',
            },
          }}
        >
          {translate('features.apply', { _: 'Aceptar' })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
