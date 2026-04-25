import type { Preview } from '@storybook/react-vite';

import '../public/styles/globals.css';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Foundation', 'Shell', 'Content', 'Sections', 'Pages'],
      },
    },
  },
};

export default preview;
