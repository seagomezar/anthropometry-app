import React from 'react';
import {
  DateField,
  TextField,
  useTranslate,
  Show,
  NumberField,
  ReferenceField,
  FunctionField,
  useRecordContext,
  useShowContext,
} from 'react-admin';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Box,
  Chip,
  Divider,
  Paper,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CakeIcon from '@mui/icons-material/Cake';
import HomeIcon from '@mui/icons-material/Home';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import WcIcon from '@mui/icons-material/Wc';
import StraightenIcon from '@mui/icons-material/Straighten';
import TimelineIcon from '@mui/icons-material/Timeline';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import FolderSharedIcon from '@mui/icons-material/FolderShared';

import { MeasurementList } from '../Measurements/MeasurementList';
import LineChartField from '../LineChartField/LineChartField';
import ResultsFieldChart from '../Results/ResultsFieldChart';
import { useFeaturePreferences } from '../../config/features';

const UserHeaderCard = () => {
  const record = useRecordContext();
  const translate = useTranslate();

  if (!record) return null;

  const initials = `${record.firstname ? record.firstname[0] : ''}${record.lastname ? record.lastname[0] : ''}`.toUpperCase();
  const isMale = record.gender === 'male' || record.gender === true;

  return (
    <Paper
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 1,
        backgroundColor: '#f6f3ee',
        border: '1px solid rgba(3, 37, 23, 0.2)',
        borderTop: '4px solid #1b3b2b',
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        flexWrap: 'wrap',
      }}
    >
      <Avatar
        sx={{
          width: 76,
          height: 76,
          bgcolor: '#1b3b2b',
          color: '#fed269',
          border: '2px solid #c29b38',
          fontSize: '1.8rem',
          fontWeight: 700,
          fontFamily: "'EB Garamond', serif",
        }}
      >
        {initials || <PersonIcon fontSize="large" />}
      </Avatar>

      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5, flexWrap: 'wrap' }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontFamily: "'EB Garamond', Georgia, serif",
              color: '#032517',
            }}
          >
            {record.firstname} {record.lastname}
          </Typography>
          <Chip
            icon={<WcIcon style={{ color: '#775a00' }} />}
            label={isMale ? translate('myroot.male') : translate('myroot.female')}
            size="small"
            sx={{
              bgcolor: 'rgba(194, 155, 56, 0.15)',
              color: '#775a00',
              fontWeight: 600,
              border: '1px solid rgba(194, 155, 56, 0.3)',
            }}
          />
        </Box>

        <Typography
          variant="caption"
          sx={{
            fontFamily: "'JetBrains Mono', monospace",
            color: '#775a00',
            letterSpacing: '0.1em',
            display: 'block',
            mb: 1,
          }}
        >
          {translate('user_show.dossier_title', {
            id: record.id,
            _: `EXPEDIENTE DEL ATLETA / PACIENTE — ID #${record.id}`,
          })}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, flexWrap: 'wrap' }}>
          {record.email && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#424843' }}>
              <EmailIcon fontSize="small" sx={{ color: '#1b3b2b' }} /> {record.email}
            </span>
          )}
          {record.phone && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#424843' }}>
              <PhoneIcon fontSize="small" sx={{ color: '#1b3b2b' }} /> {record.phone}
            </span>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

const UserShowView = () => {
  const { record, isLoading } = useShowContext();
  const translate = useTranslate();
  const { isFeatureEnabled } = useFeaturePreferences();

  if (isLoading || !record) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontFamily: "'EB Garamond', serif", color: '#1b3b2b' }}>
          {translate('ra.page.loading', { _: 'Cargando expediente...' })}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 1.5, md: 3 }, maxWidth: 1200, margin: '0 auto' }}>
      <UserHeaderCard />

        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* Personal Info Card */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 1, border: '1px solid rgba(3, 37, 23, 0.15)', height: '100%', backgroundColor: '#fff' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontFamily: "'EB Garamond', serif", fontWeight: 700, mb: 1.5, color: '#032517', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FolderSharedIcon sx={{ color: '#1b3b2b' }} /> {translate('user_show.personal_data', { _: 'Datos Personales' })}
                </Typography>
                <Divider sx={{ mb: 2, borderColor: 'rgba(3, 37, 23, 0.1)' }} />
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="caption" sx={{ color: '#727973', fontWeight: 600 }}>
                      {translate('resources.user.fields.firstname')}
                    </Typography>
                    <Box sx={{ mt: 0.5, fontWeight: 500 }}>
                      <TextField source="firstname" />
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="caption" sx={{ color: '#727973', fontWeight: 600 }}>
                      {translate('resources.user.fields.lastname')}
                    </Typography>
                    <Box sx={{ mt: 0.5, fontWeight: 500 }}>
                      <TextField source="lastname" />
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="caption" sx={{ color: '#727973', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <CakeIcon fontSize="inherit" /> {translate('resources.user.fields.birthday')}
                    </Typography>
                    <Box sx={{ mt: 0.5, fontFamily: "'JetBrains Mono', monospace" }}>
                      <DateField source="birthday" />
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="caption" sx={{ color: '#727973', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <WcIcon fontSize="inherit" /> {translate('resources.user.fields.gender')}
                    </Typography>
                    <Box sx={{ mt: 0.5 }}>
                      <FunctionField
                        source="gender"
                        render={(record) =>
                          record.gender
                            ? translate('myroot.male')
                            : translate('myroot.female')
                        }
                      />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact & Professional Info Card */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 1, border: '1px solid rgba(3, 37, 23, 0.15)', height: '100%', backgroundColor: '#fff' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontFamily: "'EB Garamond', serif", fontWeight: 700, mb: 1.5, color: '#032517', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalPharmacyIcon sx={{ color: '#c29b38' }} /> {translate('user_show.contact_assignment', { _: 'Contacto & Asignación' })}
                </Typography>
                <Divider sx={{ mb: 2, borderColor: 'rgba(3, 37, 23, 0.1)' }} />
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="caption" sx={{ color: '#727973', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <EmailIcon fontSize="inherit" /> {translate('resources.user.fields.email')}
                    </Typography>
                    <Box sx={{ mt: 0.5 }}>
                      <TextField source="email" />
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="caption" sx={{ color: '#727973', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <PhoneIcon fontSize="inherit" /> {translate('resources.user.fields.phone')}
                    </Typography>
                    <Box sx={{ mt: 0.5 }}>
                      <TextField source="phone" />
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="caption" sx={{ color: '#727973', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <HomeIcon fontSize="inherit" /> {translate('resources.user.fields.address')}
                    </Typography>
                    <Box sx={{ mt: 0.5 }}>
                      <TextField source="address" />
                    </Box>
                  </Grid>
                  {isFeatureEnabled('nutritionist') && (
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" sx={{ color: '#727973', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocalPharmacyIcon fontSize="inherit" /> {translate('resources.user.fields.nutritionist')}
                      </Typography>
                      <Box sx={{ mt: 0.5 }}>
                        <ReferenceField
                          source="nutritionist_id"
                          reference="nutritionist"
                        />
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Measurements Card - only if measurement feature enabled */}
        {isFeatureEnabled('measurement') && (
          <Paper sx={{ p: 3, mb: 3, borderRadius: 1, border: '1px solid rgba(3, 37, 23, 0.15)', backgroundColor: '#fff' }}>
            <Typography variant="h6" sx={{ fontFamily: "'EB Garamond', serif", fontWeight: 700, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1, color: '#032517' }}>
              <StraightenIcon sx={{ color: '#1b3b2b' }} /> {translate('user_show.evaluation_history', { _: 'Historial de Evaluaciones Antropométricas' })}
            </Typography>
            <Divider sx={{ mb: 2, borderColor: 'rgba(3, 37, 23, 0.1)' }} />
            <MeasurementList resource="measurement" filter={{ user_id: record.id }} />
          </Paper>
        )}

        {/* Analytics & Progress Charts - only if results_analytics feature enabled */}
        {isFeatureEnabled('results_analytics') && (
          <>
            <Paper sx={{ p: 3, mb: 3, borderRadius: 1, border: '1px solid rgba(3, 37, 23, 0.15)', backgroundColor: '#fff' }}>
              <Typography variant="h6" sx={{ fontFamily: "'EB Garamond', serif", fontWeight: 700, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1, color: '#032517' }}>
                <TimelineIcon sx={{ color: '#1b3b2b' }} /> {translate('user_show.body_comp_progression', { _: 'Progresión de Composición Corporal' })}
              </Typography>
              <Divider sx={{ mb: 2, borderColor: 'rgba(3, 37, 23, 0.1)' }} />
              <LineChartField source="id" label="" />
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 1, border: '1px solid rgba(3, 37, 23, 0.15)', backgroundColor: '#fff' }}>
              <Typography variant="h6" sx={{ fontFamily: "'EB Garamond', serif", fontWeight: 700, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1, color: '#032517' }}>
                <AnalyticsIcon sx={{ color: '#c29b38' }} /> {translate('user_show.somatotype_chart', { _: 'Gráfico de Somatotipo' })}
              </Typography>
              <Divider sx={{ mb: 2, borderColor: 'rgba(3, 37, 23, 0.1)' }} />
              <ResultsFieldChart source="id" />
            </Paper>
          </>
        )}
      </Box>
  );
};

export const UserShow = () => {
  return (
    <Show component="div">
      <UserShowView />
    </Show>
  );
};
