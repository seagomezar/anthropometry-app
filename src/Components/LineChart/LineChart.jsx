import React, { useEffect, useRef } from 'react';
import { useTranslate } from 'react-admin';
import { Chart } from 'chart.js/auto';

const LineChart = ({ x, y, title, translationSource }) => {
  const translate = useTranslate();
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !x) return;

    const graph = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: x,
        datasets: [
          {
            label: translate(translationSource + title),
            data: y,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    });

    return () => {
      graph.destroy();
    };
  }, [x, y, title, translate, translationSource]);

  return (
    x && (
      <canvas
        ref={chartRef}
        id={title}
        style={{ width: '100%' }}
        role="img"
        aria-label={`${translate(translationSource + title)} - Line chart`}
      ></canvas>
    )
  );
};

export default LineChart;