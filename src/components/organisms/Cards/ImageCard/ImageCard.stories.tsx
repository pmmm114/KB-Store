import type { Meta, StoryObj } from '@storybook/react';

import { Skeleton } from '@/components/atoms/Skeleton';
import { LazyImage } from '@/components/molecules/LazyImage';
import { getRandomImageUrl } from '@/utils/api/image';

import {
  ImageCard,
  ImageCardHeader,
  ImageCardTitle,
  ImageCardDescription,
  ImageCardContent,
  ImageCardFooter,
} from '.';

const meta = {
  title: 'Components/Organisms/Cards/ImageCard',
  component: ImageCard,
} satisfies Meta<typeof ImageCard<'div'>>;

export default meta;
type Story = StoryObj<typeof ImageCard<'div'>>;

/**
 * 이미지 카드의 스토리북 확장 인터페이스
 */
interface IExtendsImageArgs
  extends React.ComponentProps<typeof ImageCard<'div'>> {
  imgSrc?: string;
  cardTitle?: string;
  cardDescription?: string;
  cardFooter?: string;
}
export const Image: StoryObj<IExtendsImageArgs> = {
  args: {
    imgSrc: getRandomImageUrl({ width: 180, height: 180, extension: 'webp' }),
    cardTitle: 'title',
    cardDescription: 'Card DescriptionCard DescriptionCard Description',
    cardFooter: 'Card FooterafdsafdsafdsafCard Footerafdsafdsafdsaf',
  },
  render: ({ imgSrc, cardTitle, cardDescription, cardFooter, ...args }) => (
    <ImageCard
      className="h-[340px] w-[204px] border border-solid border-gray-300"
      {...args}
    >
      <ImageCardHeader className="flex-[0_0_200px]">
        <LazyImage src={imgSrc} />
      </ImageCardHeader>
      <ImageCardContent>
        <ImageCardTitle>{cardTitle}</ImageCardTitle>
        <ImageCardDescription>{cardDescription}</ImageCardDescription>
      </ImageCardContent>
      <ImageCardFooter>
        <span className="line-clamp-1 break-all">{cardFooter}</span>
      </ImageCardFooter>
    </ImageCard>
  ),
};
export const ImageSkeleton: Story = {
  render: (args) => (
    <ImageCard
      className="h-[340px] w-[204px] flex-[0_0_204px] border border-solid border-gray-300"
      {...args}
    >
      <ImageCardHeader className="h-[200px] flex-[0_0_200px]">
        <LazyImage src={''} />
      </ImageCardHeader>
      <ImageCardContent>
        <ImageCardTitle>
          <Skeleton className="h-7" />
        </ImageCardTitle>
        <ImageCardDescription>
          <Skeleton className="h-5" />
        </ImageCardDescription>
      </ImageCardContent>
      <ImageCardFooter>
        <Skeleton className="h-5 flex-auto" />
      </ImageCardFooter>
    </ImageCard>
  ),
};
