// in src/Dashboard.js
import * as React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import { useDataProvider, useGetList, useGetMany } from 'react-admin';
import * as d3 from 'd3';

//https://medium.com/@imranfarooq0306/data-visualization-in-react-with-d3-js-d733cae0dca5
const Circle = ({ number }) => {
  const ref = React.useRef();

  React.useEffect(() => {
    const svgElement = d3.select(ref.current);
    svgElement
      .append('circle')
      .attr('cx', 150)
      .attr('cy', 70)
      .attr('r', 50)
      .style('fill', 'darkOrange');
  }, []);

  return (
    <div>
      {number}
      <svg ref={ref} />
      Users
    </div>
  );
};

const Dashboard = () => {
  const dataProvider = useDataProvider();
  const { data, isLoading, error } = useGetList('user');
  return (
    <Card>
      <CardHeader title="Welcome to the administration" />
      <CardContent>
        <Circle number={data?.length} />
        Lorem ipsum sic dolor amet...
      </CardContent>
    </Card>
  );
};

export default Dashboard;
