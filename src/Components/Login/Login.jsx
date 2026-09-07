import React, { useState } from 'react';
import { useLogin, useNotify, useTranslate } from 'react-admin';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Divider,
  Chip,
  Alert,
  Fade,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const login = useLogin();
  const notify = useNotify();
  const translate = useTranslate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMessage(translate('auth.invalid_credentials', { _: 'Por favor ingrese su usuario y contraseña.' }));
      return;
    }

    setLoading(true);
    setErrorMessage('');

    login({ username: username.trim(), password: password.trim() })
      .catch((error) => {
        setLoading(false);
        const msg = translate('auth.invalid_credentials', {
          _: 'Las credenciales ingresadas son inválidas o no están autorizadas.',
        });
        setErrorMessage(msg);
        notify(msg, { type: 'error' });
      });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f0e8',
        backgroundImage: `radial-gradient(#1b3b2b 0.6px, transparent 0.6px), radial-gradient(#c29b38 0.6px, #f5f0e8 0.6px)`,
        backgroundSize: '24px 24px',
        backgroundPosition: '0 0, 12px 12px',
        p: 2,
      }}
    >
      <Card
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 440,
          backgroundColor: '#fcf9f4',
          border: '3px double #1b3b2b',
          borderRadius: '2px',
          boxShadow: '0 12px 32px rgba(27, 59, 43, 0.15)',
          overflow: 'hidden',
        }}
      >
        {/* Vintage Stamped Header */}
        <Box
          sx={{
            backgroundColor: '#1b3b2b',
            color: '#fcf9f4',
            p: 3,
            textAlign: 'center',
            borderBottom: '3px solid #c29b38',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              p: 1.2,
              borderRadius: '50%',
              backgroundColor: '#fcf9f4',
              color: '#1b3b2b',
              border: '2px solid #fed269',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              mb: 1.5,
            }}
          >
            <LocalFloristIcon sx={{ fontSize: 32, color: '#1b3b2b' }} />
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontWeight: 700,
              letterSpacing: '0.04em',
              fontSize: '22px',
              lineHeight: 1.2,
              color: '#fcf9f4',
            }}
          >
            {translate('app.title', { _: 'Atelier Antropometría' })}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#fed269',
              display: 'block',
              mt: 0.5,
            }}
          >
            {translate('auth.welcome_subtitle', {
              _: 'Sistema Oficial de Biometría & Somatotipificación',
            })}
          </Typography>
        </Box>

        <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "'Inter', sans-serif",
              color: '#424843',
              fontSize: '13px',
              textAlign: 'center',
              mb: 2.5,
              lineHeight: 1.5,
            }}
          >
            {translate('auth.login_prompt', {
              _: 'Ingrese sus credenciales profesionales autorizadas para acceder a los expedientes.',
            })}
          </Typography>

          {errorMessage && (
            <Fade in>
              <Alert
                severity="error"
                sx={{
                  mb: 2.5,
                  borderRadius: '1px',
                  backgroundColor: 'rgba(186, 26, 26, 0.08)',
                  color: '#ba1a1a',
                  border: '1px solid #ba1a1a',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12.5px',
                }}
              >
                {errorMessage}
              </Alert>
            </Fade>
          )}

          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="caption"
                sx={{
                  fontFamily: "'EB Garamond', Georgia, serif",
                  fontWeight: 700,
                  fontSize: '14px',
                  color: '#032517',
                  display: 'block',
                  mb: 0.5,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {translate('auth.email_or_username', {
                  _: 'Correo Electrónico o Usuario',
                })}
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                disabled={loading}
                placeholder="ej: usuario@ejemplo.com"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleOutlinedIcon sx={{ color: '#1b3b2b', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  backgroundColor: '#fff',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '2px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    '& fieldset': { borderColor: 'rgba(3, 37, 23, 0.3)' },
                    '&:hover fieldset': { borderColor: '#1b3b2b' },
                    '&.Mui-focused fieldset': { borderColor: '#c29b38', borderWidth: '2px' },
                  },
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography
                variant="caption"
                sx={{
                  fontFamily: "'EB Garamond', Georgia, serif",
                  fontWeight: 700,
                  fontSize: '14px',
                  color: '#032517',
                  display: 'block',
                  mb: 0.5,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {translate('auth.password', { _: 'Contraseña' })}
              </Typography>
              <TextField
                fullWidth
                size="small"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                disabled={loading}
                placeholder="••••••••••••"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ color: '#1b3b2b', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                          sx={{ color: '#5b655f' }}
                        >
                          {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  backgroundColor: '#fff',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '2px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    '& fieldset': { borderColor: 'rgba(3, 37, 23, 0.3)' },
                    '&:hover fieldset': { borderColor: '#1b3b2b' },
                    '&.Mui-focused fieldset': { borderColor: '#c29b38', borderWidth: '2px' },
                  },
                }}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.3,
                backgroundColor: '#1b3b2b',
                color: '#fcf9f4',
                fontFamily: "'EB Garamond', Georgia, serif",
                fontSize: '17px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                border: '1px solid #c29b38',
                borderRadius: '2px',
                boxShadow: '0 2px 6px rgba(27, 59, 43, 0.25)',
                '&:hover': {
                  backgroundColor: '#032517',
                  borderColor: '#fed269',
                },
              }}
            >
              {loading
                ? translate('auth.authenticating', { _: 'Autenticando...' })
                : translate('auth.login_button', { _: 'Entrar al Atelier' })}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
