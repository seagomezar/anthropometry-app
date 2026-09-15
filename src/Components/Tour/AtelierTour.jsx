import React, { useState, useEffect } from 'react';
import { useTranslate } from 'react-admin';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Checkbox,
  FormControlLabel,
  LinearProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import StraightenIcon from '@mui/icons-material/Straighten';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TuneIcon from '@mui/icons-material/Tune';
import SecurityIcon from '@mui/icons-material/Security';

export const TOUR_STORAGE_KEY = 'atelier_tour_completed';

export const AtelierTour = ({ open, onClose, isAutomatic = false }) => {
  const translate = useTranslate();
  const [currentStep, setCurrentStep] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    if (open) {
      setCurrentStep(0);
      const isAlreadyCompleted = localStorage.getItem(TOUR_STORAGE_KEY) === 'true';
      setDontShowAgain(isAlreadyCompleted);
    }
  }, [open]);

  const steps = [
    {
      icon: <AutoAwesomeIcon sx={{ fontSize: 36, color: '#c29b38' }} />,
      tag: 'INTRODUCCIÓN',
      title: translate('tour.step1_title', { _: 'Bienvenido al Atelier de Antropometría' }),
      subtitle: translate('tour.step1_subtitle', { _: 'Sistema Profesional de Somatotipificación & Biometría' }),
      description: translate('tour.step1_desc', {
        _: 'Este laboratorio digital le permite gestionar expedientes confidenciales de atletas, procesar protocolos estandarizados ISAK y generar somatocartas y analíticas de composición corporal en tiempo real.',
      }),
      highlights: [
        'Estandarización ISAK para evaluaciones antropométricas rigurosas',
        'Cálculo automatizado del somatotipo según la ecuación Heath-Carter',
        'Aislamiento estricto de expedientes por especialista clínico',
      ],
    },
    {
      icon: <FolderSharedIcon sx={{ fontSize: 36, color: '#c29b38' }} />,
      tag: 'EXPEDIENTES',
      title: translate('tour.step2_title', { _: 'Expedientes de Pacientes & Atletas' }),
      subtitle: translate('tour.step2_subtitle', { _: 'Confidencialidad y Aislamiento Clínico' }),
      description: translate('tour.step2_desc', {
        _: 'Cada especialista cuenta con un catálogo exclusivo de pacientes. Puede buscar, ordenar por columnas y consultar la ficha técnica individual con antecedentes demográficos y de contacto.',
      }),
      highlights: [
        'Búsqueda rápida por nombre, apellido o correo institucional',
        'Ficha técnica con historial longitudinal de controles',
        'Opción de importación masiva de deportistas vía archivo CSV',
      ],
    },
    {
      icon: <StraightenIcon sx={{ fontSize: 36, color: '#c29b38' }} />,
      tag: 'MEDICIONES',
      title: translate('tour.step3_title', { _: 'Protocolos de Medición ISAK' }),
      subtitle: translate('tour.step3_subtitle', { _: 'Registro Riguroso de Medidas Antropométricas' }),
      description: translate('tour.step3_desc', {
        _: 'Ingrese mediciones categorizadas: pliegues cutáneos (tríceps, subescapular, bíceps, etc.), perímetros corporales y diámetros óseos, vinculados automáticamente a su respectivo control clínico.',
      }),
      highlights: [
        'Formulario dividido en secciones A, B, C, D y E para agilizar la captura',
        'Asignación automática del nutricionista responsable de la evaluación',
        'Histórico evolutivo de mediciones por paciente',
      ],
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 36, color: '#c29b38' }} />,
      tag: 'SOMATOCARTA',
      title: translate('tour.step4_title', { _: 'Analítica, Somatocarta & Radar' }),
      subtitle: translate('tour.step4_subtitle', { _: 'Cálculo Heath-Carter & Perfiles de Élite' }),
      description: translate('tour.step4_desc', {
        _: 'El motor biométrico calcula al instante las coordenadas (X, Y) y clasifica el somatotipo (Endomórfico, Mesomórfico, Ectomórfico), comparándolo gráficamente con perfiles canónicos por deporte.',
      }),
      highlights: [
        'Gráfico de somatocarta con dispersión polar y dispersión de Carter',
        'Gráfico radar de 8 pliegues cutáneos comparados con referencias',
        'Fórmula automatizada lista para emitir diagnóstico inmediato',
      ],
    },
    {
      icon: <TuneIcon sx={{ fontSize: 36, color: '#c29b38' }} />,
      tag: 'PERSONALIZACIÓN',
      title: translate('tour.step5_title', { _: 'Configuración Dinámica de Módulos' }),
      subtitle: translate('tour.step5_subtitle', { _: 'Personalice el Atelier a su Flujo Clínico' }),
      description: translate('tour.step5_desc', {
        _: 'Active o desactive módulos según sus necesidades (solo pacientes, solo analítica, exportación PDF, somatotipos de referencia) directamente desde el botón "Módulos" de la barra superior.',
      }),
      highlights: [
        'Presets rápidos: Completo, Clínico Básico, Solo Somatocarta, Mínimo',
        'Persistencia de preferencias en el navegador local',
        'Actualización inmediata del menú sin recargar la página',
      ],
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 36, color: '#c29b38' }} />,
      tag: 'SEGURIDAD',
      title: translate('tour.step6_title', { _: 'Perfil Profesional & Seguridad' }),
      subtitle: translate('tour.step6_subtitle', { _: 'Gestión de Consultorio y Credenciales' }),
      description: translate('tour.step6_desc', {
        _: 'Actualice su teléfono de consulta, dirección de consultorio y cambie su contraseña con cifrado seguro haciendo clic en su identificador profesional o en el menú de usuario.',
      }),
      highlights: [
        'Autogestión de datos de contacto y consultorio',
        'Cifrado de contraseña con salting para máxima confidencialidad',
        'Indicador de fortaleza de contraseña en tiempo real',
      ],
    },
  ];

  const totalSteps = steps.length;
  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    if (dontShowAgain || isAutomatic) {
      localStorage.setItem(TOUR_STORAGE_KEY, 'true');
    }
    onClose();
  };

  const handleSkip = () => {
    if (dontShowAgain) {
      localStorage.setItem(TOUR_STORAGE_KEY, 'true');
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleSkip}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            backgroundColor: '#fcf9f4',
            border: '1px solid rgba(3, 37, 23, 0.25)',
            borderTop: '5px solid #c29b38',
            borderRadius: 2,
            p: { xs: 1, sm: 2.5 },
            boxShadow: '0 25px 60px rgba(3, 37, 23, 0.3)',
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Chip
            size="small"
            label={step.tag}
            sx={{
              backgroundColor: 'rgba(194, 155, 56, 0.2)',
              color: '#032517',
              border: '1px solid #c29b38',
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: '11px',
              letterSpacing: '0.08em',
            }}
          />
          <Typography
            variant="caption"
            sx={{
              fontFamily: "'JetBrains Mono', monospace",
              color: 'rgba(3, 37, 23, 0.6)',
              fontWeight: 600,
            }}
          >
            {translate('tour.step_counter', {
              current: currentStep + 1,
              total: totalSteps,
              _: `Paso ${currentStep + 1} de ${totalSteps}`,
            })}
          </Typography>
        </Box>

        <IconButton
          onClick={handleSkip}
          size="small"
          aria-label={translate('tour.skip', { _: 'Saltar Tutorial' })}
          sx={{ color: 'rgba(3, 37, 23, 0.6)', '&:hover': { color: '#032517' } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Box sx={{ px: 3, mb: 1 }}>
        <LinearProgress
          variant="determinate"
          value={((currentStep + 1) / totalSteps) * 100}
          sx={{
            height: 4,
            borderRadius: 2,
            backgroundColor: 'rgba(194, 155, 56, 0.2)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#c29b38',
            },
          }}
        />
      </Box>

      <DialogContent sx={{ pt: 2, pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              backgroundColor: 'rgba(3, 37, 23, 0.06)',
              border: '1px solid rgba(194, 155, 56, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {step.icon}
          </Box>
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontWeight: 700,
                color: '#032517',
                fontSize: { xs: '20px', sm: '23px' },
                lineHeight: 1.2,
                mb: 0.5,
              }}
            >
              {step.title}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: "'Inter', sans-serif",
                color: '#c29b38',
                fontWeight: 600,
                fontSize: '13px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              {step.subtitle}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="body2"
          sx={{
            fontFamily: "'Inter', sans-serif",
            color: 'rgba(3, 37, 23, 0.85)',
            fontSize: '14px',
            lineHeight: 1.6,
            mb: 2.5,
          }}
        >
          {step.description}
        </Typography>

        <Box
          sx={{
            backgroundColor: '#ffffff',
            border: '1px solid rgba(3, 37, 23, 0.12)',
            borderLeft: '4px solid #032517',
            borderRadius: 1,
            p: 2,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              color: '#032517',
              letterSpacing: '0.1em',
              display: 'block',
              mb: 1,
            }}
          >
            PUNTOS CLAVE / HIGHLIGHTS
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
            {step.highlights.map((highlight, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleOutlinedIcon sx={{ fontSize: 16, color: '#2e7d32' }} />
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    color: '#032517',
                  }}
                >
                  {highlight}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.8, mt: 3 }}>
          {steps.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentStep(index)}
              sx={{
                width: index === currentStep ? 24 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: index === currentStep ? '#c29b38' : 'rgba(3, 37, 23, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
              }}
            />
          ))}
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pt: 1,
          pb: 2,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: 1.5,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              sx={{
                color: 'rgba(3, 37, 23, 0.5)',
                '&.Mui-checked': { color: '#032517' },
              }}
            />
          }
          label={
            <Typography
              variant="caption"
              sx={{
                fontFamily: "'Inter', sans-serif",
                color: 'rgba(3, 37, 23, 0.7)',
                fontSize: '11.5px',
              }}
            >
              {translate('tour.dont_show_again', { _: 'No volver a mostrar automáticamente' })}
            </Typography>
          }
          sx={{ mr: 0 }}
        />

        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          {currentStep > 0 && (
            <Button
              variant="outlined"
              size="small"
              onClick={handlePrevious}
              startIcon={<ArrowBackIcon />}
              sx={{
                borderColor: 'rgba(3, 37, 23, 0.3)',
                color: '#032517',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#032517',
                  backgroundColor: 'rgba(3, 37, 23, 0.05)',
                },
              }}
            >
              {translate('tour.previous', { _: 'Anterior' })}
            </Button>
          )}

          <Button
            variant="contained"
            size="small"
            onClick={handleNext}
            endIcon={currentStep < totalSteps - 1 ? <ArrowForwardIcon /> : null}
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
            {currentStep < totalSteps - 1
              ? translate('tour.next', { _: 'Siguiente' })
              : translate('tour.finish', { _: 'Comenzar a Trabajar' })}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
