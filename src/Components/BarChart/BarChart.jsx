import React from 'react';
import { Chart } from 'chart.js/auto';

const BarChart = ({ x, y, title, description, ariaLabel }) => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

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
    }
  }, [x, y, title]);

  return (
    x && (
      <div role="region" aria-label={ariaLabel}>
        <h2>{title}</h2>
        <p>{description}</p>
        <canvas ref={canvasRef} id={title}></canvas>
      </div>
    )
  );
};

export default BarChart;