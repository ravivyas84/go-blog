import type { Meta, StoryObj } from '@storybook/react-vite';

import { WritingListItem } from './WritingListItem';

const meta = {
  title: 'Content/WritingListItem',
  component: WritingListItem,
  tags: ['autodocs'],
  args: {
    date: 'Mar 21, 2026',
    title: 'The Future of Knowledge Work',
    href: '/2026/03/21/the-future-of-knowledge-work/',
    tags: ['AI', 'Knowledge Work', 'Notes'],
  },
} satisfies Meta<typeof WritingListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
