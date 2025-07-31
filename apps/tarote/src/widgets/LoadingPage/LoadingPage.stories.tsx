import type { Meta, StoryObj } from '@storybook/react-vite';
import LoadingPage from './LoadingPage';

const meta: Meta<typeof LoadingPage> = {
  title: 'widgets/LoadingPage',
  component: LoadingPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof LoadingPage>;

export const Default: Story = {
  render: () => <LoadingPage />,
};
