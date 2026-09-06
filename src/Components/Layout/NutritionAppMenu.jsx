import React, { useState } from 'react';
import { Menu, useTranslate, usePermissions } from 'react-admin';
import { Box, MenuItem, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';

import { useFeaturePreferences } from '../../config/features';
import { FeatureSettingsModal } from '../Settings/FeatureSettingsModal';

export const NutritionAppMenu = (props) => {
  const { isFeatureEnabled } = useFeaturePreferences();
  const { permissions } = usePermissions();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const translate = useTranslate();

  const isAdmin = !permissions || permissions?.role === 'admin';

  const hasAnyResource =
    isFeatureEnabled('user') ||
    isFeatureEnabled('measurement') ||
    (isFeatureEnabled('nutritionist') && isAdmin) ||
    isFeatureEnabled('referenced_somatotype');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Menu {...props}>
        {isFeatureEnabled('user') && <Menu.ResourceItem name="user" />}
        {isFeatureEnabled('measurement') && <Menu.ResourceItem name="measurement" />}
        {isFeatureEnabled('nutritionist') && isAdmin && (
          <Menu.ResourceItem name="nutritionist" />
        )}
        {isFeatureEnabled('referenced_somatotype') && (
          <Menu.ResourceItem name="referenced_somatotype" />
        )}

        {!hasAnyResource && (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography
              variant="caption"
              sx={{ color: '#727973', fontFamily: "'Inter', sans-serif" }}
            >
              Módulos principales desactivados.
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 1, borderColor: 'rgba(3, 37, 23, 0.15)' }} />

        <MenuItem
          onClick={() => setSettingsOpen(true)}
          sx={{
            py: 1.2,
            px: 2,
            color: '#1b3b2b',
            '&:hover': {
              backgroundColor: 'rgba(27, 59, 43, 0.08)',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#c29b38', minWidth: 36 }}>
            <TuneIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={translate('app.configure_modules', { _: 'Configuración de Módulos' })}
            slotProps={{
              primary: {
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                fontWeight: 600,
                color: '#032517',
              },
            }}
          />
        </MenuItem>
      </Menu>

      <FeatureSettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </Box>
  );
};