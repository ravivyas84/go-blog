import type { Meta, StoryObj } from '@storybook/react-vite';

import { TagPill } from './TagPill';

const meta = {
  title: 'Foundation/TagPill',
  component: TagPill,
  tags: ['autodocs'],
  args: {
    label: 'AI',
  },
} satisfies Meta<typeof TagPill>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
