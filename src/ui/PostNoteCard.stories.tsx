import type { Meta, StoryObj } from '@storybook/react-vite';

import { PostNoteCard } from './PostNoteCard';

const meta = {
  title: 'Post/PostNoteCard',
  component: PostNoteCard,
  tags: ['autodocs'],
  render: () => (
    <div style={{ maxWidth: '320px' }}>
      <PostNoteCard />
    </div>
  ),
} satisfies Meta<typeof PostNoteCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
