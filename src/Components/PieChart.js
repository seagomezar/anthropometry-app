import * as React from 'react';
import { useTranslate } from 'react-admin';
import { Chart } from 'chart.js/auto';

const PieChart = ({ x, y, title }) => {
  const translate = useTranslate();
  React.useEffect(() => {
    const ctx = document.getElementById('pieChart');

    const graph = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: x,
        datasets: [
          {
            label: translate('resources.plan.summary'),
            data: y,
            borderWidth: 1,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
            hoverOffset: 4,
          },
        ],
      },
    });
    return () => {
      graph.destroy();
    };
  }, [x, y]);

  return x && <canvas id="pieChart"></canvas>;
};

export default PieChart;
