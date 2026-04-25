import type { Meta, StoryObj } from '@storybook/react-vite';

import { samplePostTocItems } from './storybook-fixtures';
import { PostTableOfContentsCard } from './PostTableOfContentsCard';

const meta = {
  title: 'Post/PostTableOfContentsCard',
  component: PostTableOfContentsCard,
  tags: ['autodocs'],
  args: {
    items: samplePostTocItems,
  },
  render: (args) => (
    <div style={{ maxWidth: '320px' }}>
      <PostTableOfContentsCard {...args} />
    </div>
  ),
} satisfies Meta<typeof PostTableOfContentsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
