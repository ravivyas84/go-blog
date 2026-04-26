import type { Meta, StoryObj } from '@storybook/react-vite';

import { SearchField } from './SearchField';

const meta = {
  title: 'Foundation/SearchField',
  component: SearchField,
  tags: ['autodocs'],
} satisfies Meta<typeof SearchField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
