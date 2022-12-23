import * as React from 'react';
import { useTranslate } from 'react-admin';
import { Chart } from 'chart.js/auto';

const PolarChart = ({ x, y, title }) => {
  const translate = useTranslate();
  React.useEffect(() => {
    const ctx = document.getElementById(title);

    const graph = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: x,
        datasets: [
          {
            label: title,
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

  return x && <canvas id={title}></canvas>;
};

export default PolarChart;
