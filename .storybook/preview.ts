import type { Preview } from '@storybook/react';

import '../src/styles/_globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      layout: 'centered',
      exclude: ['as'],
    },
  },
};

export default preview;
