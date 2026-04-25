import type { Meta, StoryObj } from '@storybook/react-vite';

import { samplePosts } from './storybook-fixtures';
import { LatestWritingSection } from './LatestWritingSection';

const meta = {
  title: 'Sections/LatestWritingSection',
  component: LatestWritingSection,
  tags: ['autodocs'],
  args: {
    items: samplePosts,
  },
} satisfies Meta<typeof LatestWritingSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
