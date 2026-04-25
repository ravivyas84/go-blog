import type { Meta, StoryObj } from '@storybook/react-vite';

import { InboxSubscribeCard } from './InboxSubscribeCard';

const meta = {
  title: 'Shell/InboxSubscribeCard',
  component: InboxSubscribeCard,
  tags: ['autodocs'],
} satisfies Meta<typeof InboxSubscribeCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
