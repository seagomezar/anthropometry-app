import * as React from 'react';
import { Chart } from 'chart.js/auto';

const PieChart = ({ data, title }) => {
  const canvasRef = React.useRef();

  React.useEffect(() => {
    if (!data || !canvasRef.current) {
      return;
    }

    const ctx = canvasRef.current.getContext('2d');

    const graph = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: title,
            data: data.values,
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
  }, [data, title]);

  return (
    <>
      {data && (
        <div role="img" aria-label={title}>
          <canvas ref={canvasRef} aria-hidden="true"></canvas>
          <ul className="sr-only">
            {data.labels.map((label, index) => (
              <li key={index}>
                {label}: {data.values[index]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default PieChart;
