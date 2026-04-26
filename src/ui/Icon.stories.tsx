import type { Meta, StoryObj } from '@storybook/react-vite';

import type { IconName } from '../lib/site-profile';

import { Icon } from './Icon';

const iconNames: IconName[] = [
  'about',
  'arrow-right',
  'book-open',
  'box',
  'clock',
  'copy',
  'flask',
  'github',
  'link',
  'linkedin',
  'mail',
  'mastodon',
  'moon',
  'notes',
  'pen',
  'pin',
  'podcast',
  'projects',
  'rss',
  'search',
  'spark',
  'sun',
  'twitter',
  'writing',
];

const meta = {
  title: 'Foundation/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: {
    name: 'writing',
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Gallery: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '16px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(96px, 1fr))',
        padding: '24px',
      }}
    >
      {iconNames.map((name) => (
        <div
          key={name}
          style={{
            alignItems: 'center',
            border: '1px solid rgba(22, 35, 63, 0.12)',
            borderRadius: '18px',
            display: 'grid',
            gap: '10px',
            justifyItems: 'center',
            minHeight: '96px',
            padding: '16px 12px',
          }}
        >
          <Icon name={name} style={{ height: '24px', width: '24px' }} />
          <span style={{ fontSize: '12px', lineHeight: 1.3, textAlign: 'center' }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};
