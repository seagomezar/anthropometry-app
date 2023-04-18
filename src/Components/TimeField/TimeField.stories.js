import React from 'react';
import { RecordContextProvider } from 'react-admin';
import { TimeField } from './TimeField';

export default {
  title: 'TimeField',
  component: TimeField,
  decorators: [
    (Story) => (
      <RecordContextProvider value={{ testTime: new Date(2023, 3, 18, 12, 30) }}>
        <Story />
      </RecordContextProvider>
    ),
  ],
  argTypes: {
    source: { control: 'text' },
  },
};

const Template = (args) => <TimeField {...args} />;

export const Default = Template.bind({});
Default.args = {
  source: 'testTime',
};

export const NoRecord = Template.bind({});
NoRecord.args = {
  ...Default.args,
};
NoRecord.decorators = [
  (Story) => (
    <RecordContextProvider value={null}>
      <Story />
    </RecordContextProvider>
  ),
];
