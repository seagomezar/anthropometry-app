import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Admin, Resource } from 'react-admin';
import { createMemoryHistory } from 'history';
import LineChart from './LineChart';

export default {
  title: 'Example/LineChart',
  component: LineChart,
  argTypes: {
    title: { control: 'text' },
    translationSource: { control: 'text' },
    x: { control: 'array' },
    y: { control: 'array' },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Admin
          dataProvider={() => Promise.resolve()}
          history={createMemoryHistory()}
        >
          <Resource name="example" />
          <Story />
        </Admin>
      </MemoryRouter>
    ),
  ],
};

const Template = (args) => <LineChart {...args} />;

export const SampleLineChart = Template.bind({});
SampleLineChart.args = {
  title: 'Sample Line Chart',
  translationSource: 'custom.linechart.',
  x: ['A', 'B', 'C'],
  y: [1, 2, 3],
};
