import type { Meta, StoryObj } from '@storybook/react-vite';

import { SiteFooter } from './SiteFooter';

const meta = {
  title: 'Shell/SiteFooter',
  component: SiteFooter,
  tags: ['autodocs'],
} satisfies Meta<typeof SiteFooter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
