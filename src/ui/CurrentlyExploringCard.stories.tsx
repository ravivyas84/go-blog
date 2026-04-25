import type { Meta, StoryObj } from '@storybook/react-vite';

import { CurrentlyExploringCard } from './CurrentlyExploringCard';

const meta = {
  title: 'Content/CurrentlyExploringCard',
  component: CurrentlyExploringCard,
  tags: ['autodocs'],
} satisfies Meta<typeof CurrentlyExploringCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
