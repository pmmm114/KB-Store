import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    controls: {
      layout: 'centered',
      exclude: ['as'],
    },
  },
};

export default preview;
