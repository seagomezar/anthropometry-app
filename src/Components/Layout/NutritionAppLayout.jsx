import React, { useState, useEffect } from 'react';
import {
  Layout,
  AppBar,
  UserMenu,
  useTranslate,
  useLocaleState,
  useGetIdentity,
  usePermissions,
  useLogout,
} from 'react-admin';
import { Box, Typography, Button, IconButton, Tooltip, Chip } from '@mui/material';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import TuneIcon from '@mui/icons-material/Tune';
import LanguageIcon from '@mui/icons-material/Language';
import ShieldIcon from '@mui/icons-material/Shield';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import { NutritionAppMenu } from './NutritionAppMenu';
import { FeatureSettingsModal } from '../Settings/FeatureSettingsModal';
import { AtelierTour, TOUR_STORAGE_KEY } from '../Tour/AtelierTour';
import { NutritionistProfileModal } from '../Profile/NutritionistProfileModal';

const NutritionAppBar = (props) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const translate = useTranslate();
  const [locale, setLocale] = useLocaleState();
  const { data: identity } = useGetIdentity();
  const { permissions } = usePermissions();
  const logout = useLogout();

  useEffect(() => {
    const isCompleted = localStorage.getItem(TOUR_STORAGE_KEY);
    if (isCompleted !== 'true') {
      setTourOpen(true);
    }
  }, []);

  const handleToggleLocale = () => {
    setLocale(locale === 'es' ? 'en' : 'es');
  };

  return (
    <>
      <AppBar
        {...props}
        userMenu={<UserMenu />}
        sx={{
          backgroundColor: '#1b3b2b',
          color: '#fcf9f4',
          borderBottom: '1px solid rgba(194, 155, 56, 0.3)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}>
          <LocalFloristIcon sx={{ color: '#c29b38', fontSize: 28 }} />
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontWeight: 700,
                letterSpacing: '0.04em',
                lineHeight: 1.1,
                fontSize: { xs: '18px', sm: '21px' },
                color: '#fcf9f4',
              }}
            >
              {translate('app.title')}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '10px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(252, 249, 244, 0.7)',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              {translate('app.subtitle')}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mr: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={locale === 'es' ? 'Switch to English' : 'Cambiar a Español'}>
            <Button
              variant="outlined"
              size="small"
              onClick={handleToggleLocale}
              startIcon={<LanguageIcon sx={{ color: '#c29b38' }} />}
              sx={{
                borderColor: 'rgba(194, 155, 56, 0.5)',
                color: '#fcf9f4',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'none',
                backgroundColor: 'rgba(3, 37, 23, 0.3)',
                '&:hover': {
                  borderColor: '#c29b38',
                  backgroundColor: 'rgba(194, 155, 56, 0.2)',
                },
              }}
            >
              {locale === 'es' ? 'ES' : 'EN'}
            </Button>
          </Tooltip>

          <Tooltip title={translate('tour.restart_tooltip', { _: 'Iniciar Tutorial Guiado del Atelier' })}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setTourOpen(true)}
              startIcon={<AutoAwesomeIcon sx={{ color: '#fed269' }} />}
              sx={{
                borderColor: 'rgba(254, 210, 105, 0.5)',
                color: '#fed269',
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'none',
                backgroundColor: 'rgba(3, 37, 23, 0.3)',
                display: { xs: 'none', sm: 'inline-flex' },
                '&:hover': {
                  borderColor: '#fed269',
                  backgroundColor: 'rgba(254, 210, 105, 0.2)',
                },
              }}
            >
              {translate('tour.button_title', { _: 'Tutorial' })}
            </Button>
          </Tooltip>

          <IconButton
            onClick={() => setTourOpen(true)}
            sx={{
              color: '#fed269',
              display: { xs: 'inline-flex', sm: 'none' },
            }}
            aria-label={translate('tour.button_title', { _: 'Tutorial' })}
          >
            <AutoAwesomeIcon />
          </IconButton>

          <Tooltip title={translate('app.configure_modules_tooltip')}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setSettingsOpen(true)}
              startIcon={<TuneIcon sx={{ color: '#c29b38' }} />}
              sx={{
                borderColor: 'rgba(194, 155, 56, 0.5)',
                color: '#fcf9f4',
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'none',
                backgroundColor: 'rgba(3, 37, 23, 0.3)',
                display: { xs: 'none', sm: 'inline-flex' },
                '&:hover': {
                  borderColor: '#c29b38',
                  backgroundColor: 'rgba(194, 155, 56, 0.2)',
                },
              }}
            >
              {translate('app.modules')}
            </Button>
          </Tooltip>

          <IconButton
            onClick={() => setSettingsOpen(true)}
            sx={{
              color: '#c29b38',
              display: { xs: 'inline-flex', sm: 'none' },
            }}
            aria-label={translate('app.configure_modules')}
          >
            <TuneIcon />
          </IconButton>

          {identity?.fullName && (
            <Tooltip
              title={`${identity.fullName} • ${
                permissions?.role === 'admin'
                  ? translate('auth.role_super_admin', { _: 'Super Administrador' })
                  : translate('auth.role_nutritionist', { _: 'Especialista Nutricionista' })
              } (Click para ver perfil)`}
            >
              <Chip
                size="small"
                onClick={() => setProfileOpen(true)}
                icon={
                  permissions?.role === 'admin' ? (
                    <ShieldIcon sx={{ fontSize: '15px !important', color: '#fed269 !important' }} />
                  ) : (
                    <LocalPharmacyIcon sx={{ fontSize: '15px !important', color: '#fed269 !important' }} />
                  )
                }
                label={identity.fullName}
                sx={{
                  backgroundColor: 'rgba(254, 210, 105, 0.15)',
                  border: '1px solid #c29b38',
                  color: '#fcf9f4',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '11.5px',
                  cursor: 'pointer',
                  display: { xs: 'none', md: 'inline-flex' },
                  '&:hover': {
                    backgroundColor: 'rgba(254, 210, 105, 0.3)',
                    borderColor: '#fed269',
                  },
                }}
              />
            </Tooltip>
          )}

          <Tooltip title={translate('auth.logout', { _: 'Cerrar Sesión' })}>
            <IconButton
              onClick={() => logout()}
              size="small"
              sx={{
                color: '#fed269',
                border: '1px solid rgba(194, 155, 56, 0.4)',
                borderRadius: '2px',
                p: 0.6,
                '&:hover': {
                  backgroundColor: 'rgba(194, 155, 56, 0.2)',
                  borderColor: '#c29b38',
                },
              }}
              aria-label={translate('auth.logout', { _: 'Cerrar Sesión' })}
            >
              <ExitToAppIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </AppBar>

      <FeatureSettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      <AtelierTour
        open={tourOpen}
        onClose={() => setTourOpen(false)}
      />

      <NutritionistProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
    </>
  );
};

export const NutritionAppLayout = (props) => (
  <Layout
    {...props}
    appBar={NutritionAppBar}
    menu={NutritionAppMenu}
    sx={{
      minWidth: 0,
      width: '100%',
      maxWidth: '100vw',
      overflowX: 'hidden',
      '& .RaLayout-appFrame': {
        minWidth: 0,
        width: '100%',
        maxWidth: '100%',
        overflowX: 'hidden',
        boxSizing: 'border-box',
      },
      '& .RaLayout-contentWithSidebar': {
        flex: '1 1 0%',
        minWidth: 0,
        maxWidth: '100%',
        overflowX: 'hidden',
        boxSizing: 'border-box',
      },
      '& .RaLayout-content': {
        flex: '1 1 0%',
        minWidth: 0,
        maxWidth: '100%',
        boxSizing: 'border-box',
      },
    }}
  />
);