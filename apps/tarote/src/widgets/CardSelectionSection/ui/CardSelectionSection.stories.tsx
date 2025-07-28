import type { Meta, StoryObj } from '@storybook/nextjs';

import { CardSelectionSection } from './CardSelectionSection';

const meta: Meta<typeof CardSelectionSection> = {
  title: 'widgets/CardSelectionSection',
  component: CardSelectionSection,
  tags: ['autodocs'],
  parameters: {
    controls: {
      exclude: ['selectedIds'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof CardSelectionSection>;

export const Default: Story = {
  args: {},
};
