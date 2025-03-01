import type { Meta, StoryObj } from '@storybook/react';

import { VirtualScroller } from '.';

const meta = {
  title: 'Components/Molecules/VirtualScroller',
  component: VirtualScroller,
} satisfies Meta<typeof VirtualScroller<'div'>>;
export default meta;

type Story = StoryObj<typeof VirtualScroller<'div'>>;

export const Default: Story = {
  parameters: {},
  args: {
    virtualizerOptions: {
      count: 500,
      estimateSize: () => 75,
      overscan: 2,
      lanes: 1,
      gap: 8,
    },
    renderItem: (index) => (
      <div
        style={{
          height: 75,
          backgroundColor: index % 2 === 0 ? 'coral' : 'lightblue',
        }}
      >
        item {index}
      </div>
    ),
  },
};

typeof VirtualScroller;
