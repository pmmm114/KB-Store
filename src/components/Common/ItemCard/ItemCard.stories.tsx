// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from '@storybook/react';

import { Skeleton } from '@/components/Common/Skeleton';

import {
  ItemCard,
  ItemCardHeader,
  ItemCardTitle,
  ItemCardDescription,
  ItemCardContent,
  ItemCardFooter,
} from '.';
import { LazyImage } from '../LazyImage';

const meta: Meta<typeof ItemCard> = {
  title: 'Components/Common/ItemCard',
  component: ItemCard,
};

export default meta;
type Story = StoryObj<typeof ItemCard>;

/**
 * 기본 카드의 스토리북 확장 인터페이스
 */
interface IExtendsDefaultArgs extends React.ComponentProps<typeof ItemCard> {
  cardTitle?: string;
  cardDescription?: string;
  cardFooter?: string;
}
export const Default: StoryObj<IExtendsDefaultArgs> = {
  args: {
    cardTitle: 'Card Title',
    cardDescription: 'Card Description',
    cardFooter: 'Card Footer',
  },
  render: ({ cardTitle, cardDescription, cardFooter, ...args }) => (
    <ItemCard className="h-[300px] w-[282px]" {...args}>
      <ItemCardHeader>
        <ItemCardTitle className="text-lg">{cardTitle}</ItemCardTitle>
      </ItemCardHeader>
      <ItemCardContent>
        <ItemCardDescription className="text-center text-sm">
          {cardDescription}
        </ItemCardDescription>
      </ItemCardContent>
      <ItemCardFooter className="justify-center text-sm">
        {cardFooter}
      </ItemCardFooter>
    </ItemCard>
  ),
};
export const DefaultSkeleton: Story = {
  render: (args) => (
    <ItemCard className="h-[300px] w-[282px]" {...args}>
      <ItemCardHeader>
        <ItemCardTitle>
          <Skeleton className="h-7" />
        </ItemCardTitle>
      </ItemCardHeader>
      <ItemCardContent>
        <ItemCardDescription className="text-center text-sm">
          <Skeleton className="h-5" />
        </ItemCardDescription>
      </ItemCardContent>
      <ItemCardFooter className="justify-center text-sm">
        <Skeleton className="h-5 flex-auto" />
      </ItemCardFooter>
    </ItemCard>
  ),
};

/**
 * 이미지 카드의 스토리북 확장 인터페이스
 */
interface IExtendsImageArgs extends React.ComponentProps<typeof ItemCard> {
  imgSrc?: string;
  cardTitle?: string;
  cardDescription?: string;
  cardFooter?: string;
}
export const Image: StoryObj<IExtendsImageArgs> = {
  args: {
    imgSrc: `https://picsum.photos/180/180?random=${new Date().getMilliseconds()}`,
    cardTitle: '',
    cardDescription: 'Card DescriptionCard DescriptionCard Description',
    cardFooter: 'Card FooterafdsafdsafdsafCard Footerafdsafdsafdsaf',
  },
  render: ({ imgSrc, cardTitle, cardDescription, cardFooter, ...args }) => (
    <ItemCard className="h-[340px] w-[206px]" {...args}>
      <ItemCardHeader className="flex-[0_0_200px] px-3 pt-3 pb-2">
        <LazyImage src={imgSrc} className="overflow-hidden rounded-lg" />
      </ItemCardHeader>
      <ItemCardContent className="flex-[1_0_auto] gap-2 px-4 pb-3">
        <ItemCardTitle className="text-lg">{cardTitle}</ItemCardTitle>
        <ItemCardDescription className="line-clamp-1 text-center text-sm">
          {cardDescription}
        </ItemCardDescription>
      </ItemCardContent>
      <ItemCardFooter className="flex-[0_0_auto] px-4 pb-3 text-center text-sm">
        <span className="line-clamp-1 break-all">{cardFooter}</span>
      </ItemCardFooter>
    </ItemCard>
  ),
};
export const ImageSkeleton: Story = {
  render: (args) => (
    <ItemCard className="h-[340px] w-[206px]" {...args}>
      <ItemCardHeader className="flex-[0_0_200px] px-3 pt-3">
        <LazyImage src={''} className="overflow-hidden rounded-lg" />
      </ItemCardHeader>
      <ItemCardContent className="flex-[1_0_auto] gap-2 px-4 pb-3">
        <ItemCardTitle className="text-lg">
          <Skeleton className="h-7" />
        </ItemCardTitle>
        <ItemCardDescription className="line-clamp-1 text-center text-sm">
          <Skeleton className="h-5" />
        </ItemCardDescription>
      </ItemCardContent>
      <ItemCardFooter className="flex-[0_0_auto] px-4 pb-3 text-center text-sm">
        <Skeleton className="h-5 flex-auto" />
      </ItemCardFooter>
    </ItemCard>
  ),
};
