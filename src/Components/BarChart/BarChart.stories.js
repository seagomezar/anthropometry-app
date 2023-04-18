import React from 'react';
import BarChart from './BarChart';

export default {
  title: 'Example/BarChart',
  component: BarChart,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    ariaLabel: { control: 'text' },
    x: { control: 'array' },
    y: { control: 'array' },
  },
};

const Template = (args) => <BarChart {...args} />;

export const SampleBarChart = Template.bind({});
SampleBarChart.args = {
  title: 'Sample Bar Chart',
  description: 'This is a sample bar chart',
  ariaLabel: 'Sample Bar Chart aria-label',
  x: ['A', 'B', 'C'],
  y: [1, 2, 3],
};
