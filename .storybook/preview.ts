import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      layout: 'centered',
      exclude: ['as'],
    },
  },
};

export default preview;
