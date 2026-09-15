import React, { useState } from 'react';
import { useTranslate, usePermissions, useNotify, useRefresh } from 'react-admin';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  IconButton,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

const CSV_HEADER = 'firstname,lastname,email,phone,gender,birthday,address';
const CSV_SAMPLE = `${CSV_HEADER}
Carlos,Mendoza,carlos.mendoza@ejemplo.com,+573001234567,M,1996-08-20,Calle 10 # 40-20
Mariana,Duque,mariana.duque@ejemplo.com,+573109876543,F,1998-03-14,Carrera 25 # 50-12
Alejandro,Torres,alejandro.torres@ejemplo.com,+573155551122,M,2001-11-05,Avenida El Poblado 15-30`;

export const parseCSV = (csvText, nutritionistId) => {
  const lines = csvText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length <= 1) return [];

  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
  const records = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map((v) => v.trim());
    if (values.length < 3) continue;

    const row = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx] || '';
    });

    // Validate required fields
    const hasName = Boolean(row.firstname && row.lastname);
    const hasEmail = Boolean(row.email && row.email.includes('@'));

    const isMale =
      row.gender &&
      (row.gender.toUpperCase() === 'M' ||
        row.gender.toUpperCase() === 'MALE' ||
        row.gender.toUpperCase() === 'MASCULINO' ||
        row.gender.toUpperCase() === 'TRUE');

    const isValid = hasName && hasEmail;

    records.push({
      firstname: row.firstname,
      lastname: row.lastname,
      email: row.email,
      phone: row.phone || '0',
      gender: isMale,
      birthday: row.birthday || '2000-01-01',
      address: row.address || 'Consulta Profesional',
      nutritionist_id: nutritionistId ? Number(nutritionistId) : 1,
      isValid,
    });
  }

  return records;
};

export const UserImportModal = ({ open, onClose }) => {
  const translate = useTranslate();
  const { permissions } = usePermissions();
  const notify = useNotify();
  const refresh = useRefresh();

  const [parsedRows, setParsedRows] = useState([]);
  const [fileName, setFileName] = useState('');
  const [importing, setImporting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const nutritionistId = permissions?.nutritionistId || 1;

  const handleDownloadTemplate = () => {
    const blob = new Blob([CSV_SAMPLE], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'plantilla_pacientes_atelier.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setErrorMsg('');
    setSuccessMsg('');

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target?.result;
        if (typeof text === 'string') {
          const rows = parseCSV(text, nutritionistId);
          if (rows.length === 0) {
            setErrorMsg('El archivo no contiene filas de datos válidas.');
          } else {
            setParsedRows(rows);
          }
        }
      } catch (err) {
        console.error(err);
        setErrorMsg('Error al leer el archivo CSV.');
      }
    };
    reader.readAsText(file);
  };

  const handleExecuteImport = async () => {
    const validRows = parsedRows.filter((r) => r.isValid);
    if (validRows.length === 0) {
      setErrorMsg('No hay registros válidos para importar.');
      return;
    }

    setImporting(true);
    setErrorMsg('');

    try {
      const hasuraUri =
        process.env.REACT_APP_HASURA_GRAPHQL_URL ||
        'https://nutrition-app.hasura.app/v1/graphql';

      const adminSecret = (
        process.env.REACT_APP_HASURA_ADMIN_SECRET ||
        process.env.REACT_APP_HASURA_API_KEY ||
        process.env.REACT_APP_HASHURA_API_KEY ||
        ''
      ).trim();

      const objectsToInsert = validRows.map(({ isValid, ...rest }) => rest);

      const response = await fetch(hasuraUri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(adminSecret ? { 'x-hasura-admin-secret': adminSecret } : {}),
        },
        body: JSON.stringify({
          query: `
            mutation InsertBatchUsers($objects: [user_insert_input!]!) {
              insert_user(objects: $objects) {
                affected_rows
              }
            }
          `,
          variables: { objects: objectsToInsert },
        }),
      });

      const resData = await response.json();
      const affected = resData?.data?.insert_user?.affected_rows;

      if (affected) {
        setSuccessMsg(
          translate('import_csv.success', {
            count: affected,
            _: `¡Importación completada! Se registraron ${affected} pacientes.`,
          })
        );
        notify('import_csv.success', { type: 'success', messageArgs: { count: affected } });
        refresh();
        setTimeout(() => {
          handleClose();
        }, 1800);
      } else {
        throw new Error(resData?.errors?.[0]?.message || 'Error en la respuesta de Hasura');
      }
    } catch (err) {
      console.error('Import error:', err);
      setErrorMsg(
        translate('import_csv.error', {
          message: err.message,
          _: `Error al importar: ${err.message}`,
        })
      );
    } finally {
      setImporting(false);
    }
  };

  const handleClose = () => {
    setParsedRows([]);
    setFileName('');
    setErrorMsg('');
    setSuccessMsg('');
    onClose();
  };

  const validCount = parsedRows.filter((r) => r.isValid).length;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
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
              backgroundColor: 'rgba(194, 155, 56, 0.15)',
              border: '1px solid #c29b38',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <UploadFileIcon sx={{ color: '#032517', fontSize: 22 }} />
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
              {translate('import_csv.title', { _: 'Carga Masiva de Pacientes' })}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontFamily: "'Inter', sans-serif",
                color: 'rgba(3, 37, 23, 0.65)',
                fontSize: '11.5px',
              }}
            >
              {translate('import_csv.subtitle', { _: 'Asignación Automática a su Consulta Profesional' })}
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={handleClose}
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

        {successMsg && (
          <Alert severity="success" sx={{ mb: 2, borderRadius: 1 }}>
            {successMsg}
          </Alert>
        )}

        {/* Step guidance banner */}
        <Box
          sx={{
            backgroundColor: '#ffffff',
            border: '1px solid rgba(3, 37, 23, 0.12)',
            borderRadius: 1,
            p: 2,
            mb: 2.5,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontWeight: 700,
                color: '#032517',
                fontSize: '16px',
                mb: 0.5,
              }}
            >
              Plantilla Oficial Estandarizada
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "'Inter', sans-serif",
                color: 'rgba(3, 37, 23, 0.75)',
                fontSize: '12.5px',
              }}
            >
              Utilice el formato con encabezados: firstname, lastname, email, phone, gender, birthday, address.
            </Typography>
          </Box>

          <Button
            variant="outlined"
            size="small"
            onClick={handleDownloadTemplate}
            startIcon={<DownloadIcon />}
            sx={{
              borderColor: '#c29b38',
              color: '#032517',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '12px',
              textTransform: 'none',
              flexShrink: 0,
              '&:hover': {
                borderColor: '#032517',
                backgroundColor: 'rgba(194, 155, 56, 0.1)',
              },
            }}
          >
            {translate('import_csv.download_template', { _: 'Descargar Plantilla CSV' })}
          </Button>
        </Box>

        {/* Uploader */}
        <Box
          component="label"
          sx={{
            display: 'block',
            border: '2px dashed rgba(194, 155, 56, 0.6)',
            borderRadius: 1.5,
            p: 3,
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            transition: 'all 0.2s',
            mb: 2.5,
            '&:hover': {
              borderColor: '#032517',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
          }}
        >
          <input type="file" accept=".csv" onChange={handleFileUpload} style={{ display: 'none' }} />
          <UploadFileIcon sx={{ fontSize: 40, color: '#c29b38', mb: 1 }} />
          <Typography
            variant="body1"
            sx={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              color: '#032517',
              fontSize: '14px',
            }}
          >
            {fileName || translate('import_csv.drop_file', { _: 'Haga clic para seleccionar o arrastre el archivo CSV aquí' })}
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(3, 37, 23, 0.6)' }}>
            Formato soportado: Archivos .csv delimitados por comas
          </Typography>
        </Box>

        {/* Preview */}
        {parsedRows.length > 0 && (
          <Box sx={{ mb: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  color: '#032517',
                  letterSpacing: '0.08em',
                }}
              >
                VISTA PREVIA ({validCount} de {parsedRows.length} registros válidos)
              </Typography>
              <Chip
                size="small"
                label={validCount === parsedRows.length ? 'Todos Válidos' : `${parsedRows.length - validCount} Errores`}
                color={validCount === parsedRows.length ? 'success' : 'warning'}
                sx={{ fontSize: '11px', height: 20 }}
              />
            </Box>

            <TableContainer
              component={Paper}
              sx={{
                maxHeight: 220,
                border: '1px solid rgba(3, 37, 23, 0.15)',
                boxShadow: 'none',
              }}
            >
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, fontSize: '11px', backgroundColor: '#f5f0e6' }}>Estado</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: '11px', backgroundColor: '#f5f0e6' }}>Nombre</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: '11px', backgroundColor: '#f5f0e6' }}>Correo</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: '11px', backgroundColor: '#f5f0e6' }}>Teléfono</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: '11px', backgroundColor: '#f5f0e6' }}>Género</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {parsedRows.slice(0, 10).map((row, index) => (
                    <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#faf7f2' } }}>
                      <TableCell>
                        {row.isValid ? (
                          <CheckCircleOutlinedIcon sx={{ color: '#2e7d32', fontSize: 16 }} />
                        ) : (
                          <ErrorOutlineOutlinedIcon sx={{ color: '#d32f2f', fontSize: 16 }} />
                        )}
                      </TableCell>
                      <TableCell sx={{ fontSize: '12px', fontWeight: 600 }}>
                        {row.firstname} {row.lastname}
                      </TableCell>
                      <TableCell sx={{ fontSize: '12px' }}>{row.email}</TableCell>
                      <TableCell sx={{ fontSize: '12px' }}>{row.phone}</TableCell>
                      <TableCell sx={{ fontSize: '12px' }}>{row.gender ? 'M' : 'F'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid rgba(3, 37, 23, 0.1)' }}>
        <Button
          variant="outlined"
          onClick={handleClose}
          disabled={importing}
          sx={{
            borderColor: 'rgba(3, 37, 23, 0.3)',
            color: '#032517',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            textTransform: 'none',
          }}
        >
          {translate('import_csv.cancel', { _: 'Cancelar' })}
        </Button>

        <Button
          variant="contained"
          disabled={validCount === 0 || importing}
          onClick={handleExecuteImport}
          startIcon={importing ? <CircularProgress size={16} color="inherit" /> : <UploadFileIcon />}
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
          {importing
            ? translate('import_csv.importing', { _: 'Importando...' })
            : translate('import_csv.import_now', { _: 'Confirmar e Importar' })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
