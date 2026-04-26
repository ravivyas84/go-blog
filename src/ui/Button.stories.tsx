import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './Button';

const meta = {
  title: 'Foundation/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Browse latest posts',
    href: '/posts/',
    iconLeft: 'writing',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Explore projects',
    href: '/#projects',
    iconLeft: 'box',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'View all posts',
    iconRight: 'arrow-right',
    href: '/posts/',
  },
};
