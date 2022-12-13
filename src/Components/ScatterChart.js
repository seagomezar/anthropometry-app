import * as React from 'react';
import { useTranslate } from 'react-admin';
import { Chart } from 'chart.js/auto';

const ScatterChart = ({ labels, points, title }) => {
  const translate = useTranslate();
  React.useEffect(() => {
    const ctx = document.getElementById(title);

    const graph = new Chart(ctx, {
      type: 'scatter',
      data: {
        labels: labels,
        datasets: [
          {
            label: title,
            data: points,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(0, 255, 132)',
            ],
            hoverOffset: 4,
          },
        ],
      },
    });
    return () => {
      graph.destroy();
    };
  }, [labels, points]);

  return points && <canvas id={title}></canvas>;
};

export default ScatterChart;
