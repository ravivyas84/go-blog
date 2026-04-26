import type { Meta, StoryObj } from '@storybook/react-vite';

import { PostShareCard } from './PostShareCard';

const meta = {
  title: 'Post/PostShareCard',
  component: PostShareCard,
  tags: ['autodocs'],
  args: {
    postTitle: 'The Future of Knowledge Work',
    postUrl: 'https://ravivyas.com/2026/03/21/the-future-of-knowledge-work/',
  },
  render: (args) => (
    <div style={{ maxWidth: '320px' }}>
      <PostShareCard {...args} />
    </div>
  ),
} satisfies Meta<typeof PostShareCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
