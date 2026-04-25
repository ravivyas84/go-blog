import type { Meta, StoryObj } from '@storybook/react-vite';

import { HeroProfileCard } from './HeroProfileCard';

const meta = {
  title: 'Content/HeroProfileCard',
  component: HeroProfileCard,
  tags: ['autodocs'],
} satisfies Meta<typeof HeroProfileCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
