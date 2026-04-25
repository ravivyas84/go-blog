import type { Meta, StoryObj } from '@storybook/react-vite';

import { TopicBrowserSection } from './TopicBrowserSection';

const meta = {
  title: 'Sections/TopicBrowserSection',
  component: TopicBrowserSection,
  tags: ['autodocs'],
} satisfies Meta<typeof TopicBrowserSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
