import type { Meta, StoryObj } from '@storybook/nextjs';

import { PickedCardList } from './PickedCardList';

const meta: Meta<typeof PickedCardList> = {
  title: 'Features/CardSelection/PickedCardList',
  component: PickedCardList,
  parameters: {
    layout: 'fullscreen',
    controls: {
      exclude: ['cards', 'cardBackSrc'],
    },
  },
};
export default meta;
type Story = StoryObj<typeof PickedCardList>;

export const Default: Story = {
  args: {
    cards: [{ id: 1 }, { id: 2 }, { id: 3 }],
    selectedIds: [1, 2, 3],
  },
  render: (args) => <PickedCardList {...args} />,
};
