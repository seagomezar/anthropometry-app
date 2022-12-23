import * as React from 'react';
import { useTranslate } from 'react-admin';
import { Chart } from 'chart.js/auto';

const LineChart = ({ x, y, title, translationSource }) => {
  const translate = useTranslate();
  React.useEffect(() => {
    const ctx = document.getElementById('compairsonChart');

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
  }, [x, y]);

  return x && <canvas id="compairsonChart"></canvas>;
};

export default LineChart;
