import React, { useState } from 'react';
import { useTranslate } from 'react-admin';
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
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

import authProvider from '../../Providers/authProvider';

export const ForgotPasswordModal = ({ open, onClose }) => {
  const translate = useTranslate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleReset = () => {
    setEmail('');
    setErrorMsg('');
    setSubmitted(false);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg('Por favor ingrese su correo electrónico institucional.');
      return;
    }

    setLoading(true);
    try {
      await authProvider.requestPasswordAssistance(email);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrorMsg('No se pudo procesar la solicitud. Verifique el correo ingresado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleReset}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            backgroundColor: '#fcf9f4',
            border: '1px solid rgba(3, 37, 23, 0.25)',
            borderTop: '5px solid #c29b38',
            borderRadius: 2,
            p: { xs: 1, sm: 2 },
            boxShadow: '0 25px 60px rgba(3, 37, 23, 0.25)',
          },
        },
      }}
    >
      <form onSubmit={handleSubmit}>
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
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: 'rgba(194, 155, 56, 0.15)',
                border: '1px solid #c29b38',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <HelpOutlinedIcon sx={{ color: '#032517', fontSize: 22 }} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'EB Garamond', Georgia, serif",
                  fontWeight: 700,
                  color: '#032517',
                  fontSize: '19px',
                  lineHeight: 1.2,
                }}
              >
                {translate('forgot_password.title', { _: 'Asistencia para Acceso' })}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontFamily: "'Inter', sans-serif",
                  color: 'rgba(3, 37, 23, 0.65)',
                  fontSize: '11px',
                }}
              >
                {translate('forgot_password.subtitle', { _: 'Protocolo de Seguridad Institucional' })}
              </Typography>
            </Box>
          </Box>

          <IconButton
            onClick={handleReset}
            size="small"
            aria-label="Cerrar"
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

          {submitted ? (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <CheckCircleOutlinedIcon sx={{ fontSize: 48, color: '#2e7d32', mb: 1.5 }} />
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: "'EB Garamond', Georgia, serif",
                  fontWeight: 700,
                  color: '#032517',
                  fontSize: '18px',
                  mb: 1,
                }}
              >
                Protocolo de Restablecimiento Registrado
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "'Inter', sans-serif",
                  color: 'rgba(3, 37, 23, 0.8)',
                  fontSize: '13px',
                  lineHeight: 1.5,
                  mb: 2,
                }}
              >
                {translate('forgot_password.status_sent', {
                  _: 'Por motivos de confidencialidad clínica, se ha registrado la solicitud para el correo indicado. Si requiere asistencia inmediata, contacte a la Dirección Técnica del Atelier.',
                })}
              </Typography>
              <Box
                sx={{
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(194, 155, 56, 0.3)',
                  borderLeft: '4px solid #c29b38',
                  borderRadius: 1,
                  p: 1.5,
                  textAlign: 'left',
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#032517', display: 'block' }}>
                  Canal de Soporte Directo:
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(3, 37, 23, 0.7)' }}>
                  soporte@anthropometry.com • +57 300 367 6929
                </Typography>
              </Box>
            </Box>
          ) : (
            <>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "'Inter', sans-serif",
                  color: 'rgba(3, 37, 23, 0.8)',
                  fontSize: '13px',
                  lineHeight: 1.5,
                  mb: 2.5,
                }}
              >
                {translate('forgot_password.description', {
                  _: 'Ingrese su correo electrónico registrado. Se verificará su identidad y se coordinará el restablecimiento seguro de sus credenciales.',
                })}
              </Typography>

              <TextField
                fullWidth
                size="small"
                type="email"
                label={translate('forgot_password.email', { _: 'Correo Electrónico Registrado' })}
                placeholder="ej: especialista@anthropometry.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                autoFocus
              />
            </>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid rgba(3, 37, 23, 0.1)' }}>
          <Button
            variant="outlined"
            onClick={handleReset}
            disabled={loading}
            sx={{
              borderColor: 'rgba(3, 37, 23, 0.3)',
              color: '#032517',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              textTransform: 'none',
            }}
          >
            {submitted
              ? translate('forgot_password.cancel', { _: 'Volver al Inicio de Sesión' })
              : translate('forgot_password.cancel', { _: 'Cancelar' })}
          </Button>

          {!submitted && (
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              endIcon={<SendIcon />}
              sx={{
                backgroundColor: '#032517',
                color: '#fcf9f4',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                textTransform: 'none',
                px: 2.5,
                '&:hover': {
                  backgroundColor: '#1b3b2b',
                },
              }}
            >
              {loading ? 'Verificando...' : translate('forgot_password.send', { _: 'Solicitar Asistencia' })}
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};
