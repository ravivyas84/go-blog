import type { Meta, StoryObj } from '@storybook/react-vite';

import { PostSubscribeCard } from './PostSubscribeCard';

const meta = {
  title: 'Post/PostSubscribeCard',
  component: PostSubscribeCard,
  tags: ['autodocs'],
  render: () => (
    <div style={{ maxWidth: '320px' }}>
      <PostSubscribeCard />
    </div>
  ),
} satisfies Meta<typeof PostSubscribeCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
