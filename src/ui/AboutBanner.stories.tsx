import type { Meta, StoryObj } from '@storybook/react-vite';

import { AboutBanner } from './AboutBanner';

const meta = {
  title: 'Content/AboutBanner',
  component: AboutBanner,
  tags: ['autodocs'],
} satisfies Meta<typeof AboutBanner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
