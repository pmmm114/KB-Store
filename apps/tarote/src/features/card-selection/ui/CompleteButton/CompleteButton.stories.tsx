import type { Meta, StoryObj } from '@storybook/nextjs';

import { CompleteButton } from './CompleteButton';

const meta: Meta<typeof CompleteButton> = {
  title: 'features/card-selection/CompleteButton',
  component: CompleteButton,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CompleteButton>;

export const Default: Story = {
  args: {
    selectedIds: [1, 2, 3],
    onComplete: (ids) => alert('Complete: ' + ids.join(',')),
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    selectedIds: [1, 2],
    onComplete: () => {},
    disabled: true,
  },
};

export const NoSelection: Story = {
  args: {
    selectedIds: [],
    onComplete: () => {},
    disabled: false,
  },
};
