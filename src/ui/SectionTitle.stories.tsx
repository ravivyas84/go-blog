import type { Meta, StoryObj } from '@storybook/react-vite';

import { SectionTitle } from './SectionTitle';

const meta = {
  title: 'Foundation/SectionTitle',
  component: SectionTitle,
  tags: ['autodocs'],
  args: {
    icon: 'writing',
    title: 'Latest Writing',
    actionHref: '/posts/',
    actionLabel: 'View all posts',
  },
} satisfies Meta<typeof SectionTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
