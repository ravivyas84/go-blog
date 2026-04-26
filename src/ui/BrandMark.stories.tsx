import type { Meta, StoryObj } from '@storybook/react-vite';

import { BrandMark } from './BrandMark';

const meta = {
  title: 'Foundation/BrandMark',
  component: BrandMark,
  tags: ['autodocs'],
} satisfies Meta<typeof BrandMark>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
