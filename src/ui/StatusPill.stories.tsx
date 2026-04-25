import type { Meta, StoryObj } from '@storybook/react-vite';

import { StatusPill } from './StatusPill';

const meta = {
  title: 'Foundation/StatusPill',
  component: StatusPill,
  tags: ['autodocs'],
  args: {
    status: 'active',
  },
} satisfies Meta<typeof StatusPill>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Active: Story = {};

export const OnHold: Story = {
  args: {
    status: 'on-hold',
  },
};
