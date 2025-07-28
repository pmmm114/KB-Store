import type { Meta, StoryObj } from '@storybook/nextjs';

import { ScrollableFanCard } from './ScrollableFanCard';
import type * as T from './ScrollableFanCard.types';

const meta: Meta<typeof ScrollableFanCard> = {
  title: 'Features/CardSelection/ScrollableFanCard',
  component: ScrollableFanCard,
  parameters: {
    layout: 'fullscreen',
    controls: {
      exclude: ['cards', 'cardBackSrc'],
    },
  },
};
export default meta;
type Story = StoryObj<typeof ScrollableFanCard>;

export const Default: Story = {
  args: {
    cards: Array.from({ length: 78 }).map((_, idx) => ({ id: idx + 1 })),
    cardBackSrc: '/cards/CardBacks.png',
  },
  render: (args: T.IScrollableFanCardProps) => (
    <div className="flex h-[800px] w-full items-center">
      <ScrollableFanCard {...args} />
    </div>
  ),
};

export const Empty: Story = {
  args: {
    cards: [],
    cardBackSrc: '/cards/CardBacks.png',
  },
  render: (args) => (
    <div className="h-[800px] w-full">
      <ScrollableFanCard {...args} />
    </div>
  ),
};
