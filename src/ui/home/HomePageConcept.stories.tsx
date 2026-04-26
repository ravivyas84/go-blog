import type { Meta, StoryObj } from '@storybook/react-vite';

import { samplePosts } from '../storybook-fixtures';
import { HomePage } from './HomePage';

const meta = {
  title: 'Pages/HomePageConcept',
  component: HomePage,
  tags: ['autodocs'],
  args: {
    latestPosts: samplePosts,
  },
} satisfies Meta<typeof HomePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
