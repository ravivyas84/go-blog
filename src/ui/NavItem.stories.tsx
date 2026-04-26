import type { Meta, StoryObj } from '@storybook/react-vite';

import { NavItem } from './NavItem';

const meta = {
  title: 'Shell/NavItem',
  component: NavItem,
  tags: ['autodocs'],
  args: {
    href: '/',
    icon: 'writing',
    label: 'Writing',
    match: '/',
    active: true,
  },
} satisfies Meta<typeof NavItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Active: Story = {};

export const Inactive: Story = {
  args: {
    active: false,
  },
};
