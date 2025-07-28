import type { Meta, StoryObj } from '@storybook/nextjs';

import { CompleteButton } from './CompleteButton';

const meta: Meta<typeof CompleteButton> = {
  title: 'features/cardSelection/CompleteButton',
  component: CompleteButton,
  tags: ['autodocs'],
  parameters: {
    controls: {
      exclude: ['selectedIds'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof CompleteButton>;

export const Default: Story = {
  args: {
    selectedIds: [],
  },
};

export const Active: Story = {
  args: {
    selectedIds: [1, 2, 3],
  },
};
