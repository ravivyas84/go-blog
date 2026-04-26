import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProjectCardConcept } from './ProjectCardConcept';

const meta = {
  title: 'Content/ProjectCardConcept',
  component: ProjectCardConcept,
  tags: ['autodocs'],
  args: {
    title: 'CapabilityMap',
    description: 'Visual capability mapping and planning tool for product teams.',
    href: '/capabilitymap/',
    icon: 'projects',
    label: 'Visit',
    status: 'active',
  },
} satisfies Meta<typeof ProjectCardConcept>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Active: Story = {};

export const OnHold: Story = {
  args: {
    title: 'StitchIQ',
    description: 'A Google Sheets plugin as a side project.',
    href: '#',
    icon: 'box',
    status: 'on-hold',
  },
};
