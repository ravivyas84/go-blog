import type { Meta, StoryObj } from '@storybook/react-vite';

import { HeroCanvas } from './HeroCanvas';

const meta = {
  title: 'Sections/HeroCanvas',
  component: HeroCanvas,
  tags: ['autodocs'],
} satisfies Meta<typeof HeroCanvas>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
