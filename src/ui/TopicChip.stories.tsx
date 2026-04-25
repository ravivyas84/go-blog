import type { Meta, StoryObj } from '@storybook/react-vite';

import { TopicChip } from './TopicChip';

const meta = {
  title: 'Foundation/TopicChip',
  component: TopicChip,
  tags: ['autodocs'],
  args: {
    label: 'Product Management',
    href: '/tag/product-management/',
    color: 'blue',
  },
} satisfies Meta<typeof TopicChip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
