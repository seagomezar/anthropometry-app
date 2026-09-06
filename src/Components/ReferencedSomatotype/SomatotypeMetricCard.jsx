import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import EastIcon from '@mui/icons-material/East';
import SouthEastIcon from '@mui/icons-material/SouthEast';

export const SomatotypeMetricCard = ({ title, value, type = 'endo', targetText, detailRight }) => {
  const numVal = Number(value) || 0;
  const progressPercent = Math.min(Math.max((numVal / 10) * 100, 5), 100);

  let icon = <NorthEastIcon sx={{ color: '#ef4444' }} />;
  let barColor = '#ef4444';
  let accentBorder = 'transparent';

  if (type === 'meso') {
    icon = <EastIcon sx={{ color: '#0284c7' }} />;
    barColor = '#0284c7';
    accentBorder = '3px solid #0284c7';
  } else if (type === 'ecto') {
    icon = <SouthEastIcon sx={{ color: '#10b981' }} />;
    barColor = '#10b981';
  }

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: '0 4px 18px rgba(0,0,0,0.04)',
        borderLeft: accentBorder !== 'transparent' ? accentBorder : '1px solid #e2e8f0',
        borderTop: '1px solid #e2e8f0',
        borderRight: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0',
        mb: 2,
        height: 'calc(33.33% - 11px)',
        minHeight: 120,
        display: 'flex',
        flexDirection: 'column',
        justify: 'center',
      }}
    >
      <CardContent sx={{ p: '20px !important' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, letterSpacing: 1.2 }}>
            {title.toUpperCase()}
          </Typography>
          {icon}
        </Box>

        <Typography variant="h3" sx={{ fontWeight: 800, color: '#0f172a', mb: 1, lineHeight: 1 }}>
          {numVal.toFixed(2)}
        </Typography>

        <LinearProgress
          variant="determinate"
          value={progressPercent}
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: '#f1f5f9',
            mb: 1.5,
            '& .MuiLinearProgress-bar': {
              backgroundColor: barColor,
              borderRadius: 3,
            },
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, fontSize: '0.7rem' }}>
            {targetText || 'MÍN: 1.0'}
          </Typography>
          {detailRight && (
            <Typography variant="caption" sx={{ color: type === 'meso' ? '#0284c7' : '#64748b', fontWeight: 700, fontSize: '0.7rem' }}>
              {detailRight}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
