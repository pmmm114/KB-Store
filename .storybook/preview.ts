import type { Preview } from '@storybook/react';

import '../src/styles/_globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      exclude: ['as'],
    },
  },
};

export default preview;
