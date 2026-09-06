import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

export const SomatocartaSVG = ({ x = -0.85, y = 2.93 }) => {
  const numX = Number(x) || 0;
  const numY = Number(y) || 0;

  // Center & Scale for 500x420 viewBox
  const cx = 250;
  const cy = 200;
  const scale = 20;

  const pointX = cx + numX * scale;
  const pointY = cy - numY * scale;

  // Triangle vertices
  const mesoX = cx;
  const mesoY = cy - 7 * scale;
  const endoX = cx - 7.5 * scale;
  const endoY = cy + 5.5 * scale;
  const ectoX = cx + 7.5 * scale;
  const ectoY = cy + 5.5 * scale;

  return (
    <Box sx={{ position: 'relative', width: '100%', pt: 1, pb: 1 }}>
      <svg
        viewBox="0 0 500 400"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        {/* Background Grid Pattern */}
        <defs>
          <pattern id="dotGrid" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#cbd5e1" />
          </pattern>
        </defs>

        <rect width="500" height="400" fill="url(#dotGrid)" opacity="0.4" rx="12" />

        {/* Main Somatocarta Triangle */}
        <polygon
          points={`${mesoX},${mesoY} ${endoX},${endoY} ${ectoX},${ectoY}`}
          fill="#ffffff"
          fillOpacity="0.85"
          stroke="#94a3b8"
          strokeWidth="2"
        />

        {/* Inner Grid / Axis Lines */}
        <line x1={mesoX} y1={mesoY} x2={cx} y2={endoY} stroke="#cbd5e1" strokeDasharray="4 4" strokeWidth="1.5" />
        <line x1={endoX} y1={endoY} x2={(mesoX + ectoX) / 2} y2={(mesoY + ectoY) / 2} stroke="#cbd5e1" strokeDasharray="4 4" strokeWidth="1.5" />
        <line x1={ectoX} y1={ectoY} x2={(mesoX + endoX) / 2} y2={(mesoY + endoY) / 2} stroke="#cbd5e1" strokeDasharray="4 4" strokeWidth="1.5" />

        {/* Vertex Labels */}
        <text x={mesoX} y={mesoY - 14} textAnchor="middle" fill="#0284c7" fontWeight="700" fontSize="13" letterSpacing="1">
          MESOMORFO
        </text>
        <text x={endoX + 10} y={endoY + 24} textAnchor="middle" fill="#7c3aed" fontWeight="700" fontSize="13" letterSpacing="1">
          ENDOMORFO
        </text>
        <text x={ectoX - 10} y={ectoY + 24} textAnchor="middle" fill="#0284c7" fontWeight="700" fontSize="13" letterSpacing="1">
          ECTOMORFO
        </text>

        {/* Ideal Projected Point (Purple) */}
        <circle cx={pointX + 18} cy={pointY - 14} r="5" fill="#8b5cf6" />

        {/* Actual Plot Point (Blue with pulse glow) */}
        <circle cx={pointX} cy={pointY} r="10" fill="#0284c7" opacity="0.25" />
        <circle cx={pointX} cy={pointY} r="6" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
      </svg>

      {/* Floating Cartesian Position Card matching screen.png */}
      <Paper
        elevation={0}
        sx={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          p: 2,
          borderRadius: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          border: '1px solid #cbd5e1',
          maxWidth: 240,
          boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
        }}
      >
        <Typography variant="caption" sx={{ color: '#0369a1', fontWeight: 700, letterSpacing: 1, display: 'block', mb: 0.5 }}>
          POSICIÓN CARTESIANA
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', lineHeight: 1.2, mb: 0.5 }}>
          X: {numX > 0 ? `+${numX.toFixed(2)}` : numX.toFixed(2)} | Y: {numY > 0 ? `+${numY.toFixed(2)}` : numY.toFixed(2)}
        </Typography>
        <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem', display: 'block' }}>
          Representación bivariada de la forma física actual.
        </Typography>
      </Paper>
    </Box>
  );
};
