import React, { useState, useEffect } from 'react';
import { useTranslate, usePermissions, useGetIdentity, useNotify } from 'react-admin';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
  Chip,
  Alert,
  Divider,
  LinearProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BadgeIcon from '@mui/icons-material/Badge';
import LockResetIcon from '@mui/icons-material/LockReset';
import SaveIcon from '@mui/icons-material/Save';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import ShieldIcon from '@mui/icons-material/Shield';

import authProvider from '../../Providers/authProvider';
import { evaluatePasswordStrength } from '../../Utils/cryptoUtils';

export const NutritionistProfileModal = ({ open, onClose }) => {
  const translate = useTranslate();
  const { permissions } = usePermissions();
  const { data: identity } = useGetIdentity();
  const notify = useNotify();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Profile fields
  const [profileData, setProfileData] = useState({
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    assignedCount: 0,
  });

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isNutritionist = permissions?.role === 'nutritionist';
  const nutritionistId = permissions?.nutritionistId || identity?.id;

  useEffect(() => {
    if (open && nutritionistId && nutritionistId !== 'super-admin') {
      loadProfile(nutritionistId);
    } else if (open) {
      // Super admin or fallback
      setProfileData({
        id: 'super-admin',
        firstname: 'Super',
        lastname: 'Administrador',
        email: identity?.email || 'admin@anthropometry.com',
        phone: '+57 300 000 0000',
        address: 'Sede Central Laboratorio',
        assignedCount: 'Todos',
      });
    }
  }, [open, nutritionistId]);

  const loadProfile = async (id) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const data = await authProvider.getNutritionistProfile(id);
      if (data) {
        setProfileData({
          id: data.id,
          firstname: data.firstname || '',
          lastname: data.lastname || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          assignedCount: data.users_aggregate?.aggregate?.count || 0,
        });
      }
    } catch (err) {
      console.error('Error loading profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const strength = evaluatePasswordStrength(newPassword);

  const handleSave = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Validations if changing password
    if (newPassword || confirmPassword) {
      if (!currentPassword) {
        setErrorMsg(translate('profile.current_password_required', { _: 'Debe ingresar su contraseña actual para confirmar los cambios.' }));
        return;
      }
      if (newPassword !== confirmPassword) {
        setErrorMsg(translate('profile.password_mismatch', { _: 'Las contraseñas nuevas no coinciden.' }));
        return;
      }
      if (strength.score < 40) {
        setErrorMsg(translate('profile.password_weak', { _: 'La nueva contraseña debe tener al menos 8 caracteres y combinar letras y números.' }));
        return;
      }
    }

    if (profileData.id === 'super-admin') {
      setSuccessMsg(translate('profile.save_success', { _: 'Perfil actualizado exitosamente.' }));
      setTimeout(() => {
        onClose();
      }, 1200);
      return;
    }

    setSaving(true);
    try {
      await authProvider.updateNutritionistProfile({
        id: profileData.id,
        firstname: profileData.firstname,
        lastname: profileData.lastname,
        phone: profileData.phone,
        address: profileData.address,
        currentPassword: currentPassword || undefined,
        newPassword: newPassword ? newPassword.trim() : undefined,
      });

      setSuccessMsg(translate('profile.save_success', { _: 'Perfil y credenciales actualizados exitosamente.' }));
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      notify('profile.save_success', { type: 'success' });
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Error updating profile:', err);
      if (err.message === 'profile.current_password_invalid') {
        setErrorMsg(translate('profile.save_error', { _: 'Error: La contraseña actual ingresada es incorrecta.' }));
      } else {
        setErrorMsg(translate('profile.save_error', { _: 'Error al actualizar el perfil. Verifique su información.' }));
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            backgroundColor: '#fcf9f4',
            border: '1px solid rgba(3, 37, 23, 0.25)',
            borderTop: '5px solid #032517',
            borderRadius: 2,
            p: { xs: 1, sm: 2 },
            boxShadow: '0 25px 60px rgba(3, 37, 23, 0.25)',
          },
        },
      }}
    >
      <form onSubmit={handleSave}>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                backgroundColor: 'rgba(3, 37, 23, 0.08)',
                border: '1px solid #c29b38',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isNutritionist ? (
                <LocalPharmacyIcon sx={{ color: '#032517', fontSize: 22 }} />
              ) : (
                <ShieldIcon sx={{ color: '#032517', fontSize: 22 }} />
              )}
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'EB Garamond', Georgia, serif",
                  fontWeight: 700,
                  color: '#032517',
                  fontSize: '20px',
                  lineHeight: 1.2,
                }}
              >
                {translate('profile.title', { _: 'Mi Perfil Profesional' })}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontFamily: "'Inter', sans-serif",
                  color: 'rgba(3, 37, 23, 0.65)',
                  fontSize: '11.5px',
                }}
              >
                {translate('profile.subtitle', { _: 'Gestión de Datos de Contacto y Seguridad' })}
              </Typography>
            </Box>
          </Box>

          <IconButton
            onClick={onClose}
            size="small"
            aria-label={translate('profile.close', { _: 'Cerrar' })}
            sx={{ color: 'rgba(3, 37, 23, 0.6)', '&:hover': { color: '#032517' } }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 2, pb: 1 }}>
          {errorMsg && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 1 }}>
              {errorMsg}
            </Alert>
          )}

          {successMsg && (
            <Alert severity="success" sx={{ mb: 2, borderRadius: 1 }}>
              {successMsg}
            </Alert>
          )}

          {/* Identity summary banner */}
          <Box
            sx={{
              backgroundColor: '#ffffff',
              border: '1px solid rgba(3, 37, 23, 0.12)',
              borderRadius: 1,
              p: 2,
              mb: 2.5,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography
                variant="caption"
                sx={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  color: 'rgba(3, 37, 23, 0.6)',
                  letterSpacing: '0.08em',
                  display: 'block',
                }}
              >
                {translate('profile.specialist_id', { _: 'ID DE ESPECIALISTA' })}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: '#032517' }}
              >
                #{profileData.id}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="caption"
                sx={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  color: 'rgba(3, 37, 23, 0.6)',
                  letterSpacing: '0.08em',
                  display: 'block',
                }}
              >
                {translate('profile.role', { _: 'ROL ASIGNADO' })}
              </Typography>
              <Chip
                size="small"
                label={isNutritionist ? 'Especialista Nutricionista' : 'Super Administrador'}
                sx={{
                  backgroundColor: 'rgba(194, 155, 56, 0.15)',
                  border: '1px solid #c29b38',
                  color: '#032517',
                  fontWeight: 600,
                  fontSize: '11px',
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="caption"
                sx={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  color: 'rgba(3, 37, 23, 0.6)',
                  letterSpacing: '0.08em',
                  display: 'block',
                }}
              >
                {translate('profile.assigned_patients', { _: 'EXPEDIENTES' })}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: '#c29b38' }}
              >
                {profileData.assignedCount}
              </Typography>
            </Box>
          </Box>

          {/* Contact Details */}
          <Typography
            variant="subtitle2"
            sx={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: '16px',
              color: '#032517',
              mb: 1.5,
            }}
          >
            Datos de Consulta & Contacto
          </Typography>

          <Grid container spacing={2} sx={{ mb: 2.5 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label={translate('profile.firstname', { _: 'Nombre' })}
                value={profileData.firstname}
                onChange={(e) => setProfileData({ ...profileData, firstname: e.target.value })}
                disabled={saving}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label={translate('profile.lastname', { _: 'Apellido' })}
                value={profileData.lastname}
                onChange={(e) => setProfileData({ ...profileData, lastname: e.target.value })}
                disabled={saving}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label={translate('profile.email', { _: 'Correo Institucional' })}
                value={profileData.email}
                disabled
                helperText="El correo institucional es asignado por el laboratorio"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label={translate('profile.phone', { _: 'Teléfono / WhatsApp' })}
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                disabled={saving}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label={translate('profile.address', { _: 'Dirección de Consultorio' })}
                value={profileData.address}
                onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                disabled={saving}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 2, borderColor: 'rgba(3, 37, 23, 0.15)' }} />

          {/* Change Password */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <LockResetIcon sx={{ color: '#c29b38', fontSize: 20 }} />
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontWeight: 700,
                fontSize: '16px',
                color: '#032517',
              }}
            >
              {translate('profile.change_password_title', { _: 'Actualización Segura de Contraseña' })}
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                type="password"
                label={translate('profile.current_password', { _: 'Contraseña Actual' })}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={saving}
                helperText="Requerida solo si desea cambiar la contraseña o guardar modificaciones"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                type="password"
                label={translate('profile.new_password', { _: 'Nueva Contraseña' })}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={saving}
              />
              {newPassword && (
                <Box sx={{ mt: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ fontSize: '11px', color: 'rgba(3, 37, 23, 0.7)' }}>
                      Seguridad:
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ fontSize: '11px', fontWeight: 700, color: strength.color }}
                    >
                      {strength.label}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={strength.score}
                    sx={{
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      '& .MuiLinearProgress-bar': { backgroundColor: strength.color },
                    }}
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                type="password"
                label={translate('profile.confirm_password', { _: 'Confirmar Nueva Contraseña' })}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={saving}
                error={Boolean(confirmPassword && newPassword !== confirmPassword)}
                helperText={confirmPassword && newPassword !== confirmPassword ? 'Las contraseñas no coinciden' : ''}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid rgba(3, 37, 23, 0.1)' }}>
          <Button
            variant="outlined"
            onClick={onClose}
            disabled={saving}
            sx={{
              borderColor: 'rgba(3, 37, 23, 0.3)',
              color: '#032517',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              textTransform: 'none',
            }}
          >
            {translate('profile.close', { _: 'Cerrar' })}
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={saving}
            startIcon={<SaveIcon />}
            sx={{
              backgroundColor: '#032517',
              color: '#fcf9f4',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              textTransform: 'none',
              px: 3,
              '&:hover': {
                backgroundColor: '#1b3b2b',
              },
            }}
          >
            {saving
              ? translate('profile.saving', { _: 'Guardando...' })
              : translate('profile.save', { _: 'Guardar Cambios' })}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
