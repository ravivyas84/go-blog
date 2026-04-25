import type { Meta, StoryObj } from '@storybook/react-vite';

import { sampleRelatedPosts } from './storybook-fixtures';
import { PostRelatedPostsCard } from './PostRelatedPostsCard';

const meta = {
  title: 'Post/PostRelatedPostsCard',
  component: PostRelatedPostsCard,
  tags: ['autodocs'],
  args: {
    items: sampleRelatedPosts,
  },
  render: (args) => (
    <div style={{ maxWidth: '320px' }}>
      <PostRelatedPostsCard {...args} />
    </div>
  ),
} satisfies Meta<typeof PostRelatedPostsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
