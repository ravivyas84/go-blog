import type { Meta, StoryObj } from '@storybook/react-vite';

import { samplePostNavigation } from './storybook-fixtures';
import { PostNavigation } from './PostNavigation';

const meta = {
  title: 'Post/PostNavigation',
  component: PostNavigation,
  tags: ['autodocs'],
  args: samplePostNavigation,
} satisfies Meta<typeof PostNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
