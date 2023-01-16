import * as React from 'react';
import { useTranslate } from 'react-admin';
import { Chart } from 'chart.js/auto';

const LineChart = ({ x, y, title, translationSource }) => {
  const translate = useTranslate();
  React.useEffect(() => {
    const ctx = document.getElementById(title);

    const graph = new Chart(ctx, {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [x, y, title]);

  return x && <canvas id={title} style={{ width: '100%' }}></canvas>;
};

export default LineChart;
