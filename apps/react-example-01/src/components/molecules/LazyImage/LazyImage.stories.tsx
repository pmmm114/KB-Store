import type { Meta, StoryObj } from '@storybook/react';

import { getRandomImageUrl } from '@/utils/api/image';

import { LazyImage } from '.';

const meta = {
  title: 'Components/Molecules/LazyImage',
  component: LazyImage,
  parameters: {
    controls: {
      exclude: ['rootClassName'],
    },
  },
} satisfies Meta<typeof LazyImage<'img'>>;
export default meta;

/**
 * 이미지 카드의 스토리북 확장 인터페이스
 */
interface IExtendsLazyImageArgs
  extends React.ComponentProps<typeof LazyImage<'img'>> {
  isLoading?: boolean;
}
export const Default: StoryObj<IExtendsLazyImageArgs> = {
  parameters: {},
  argTypes: {
    isLoading: {
      control: { type: 'boolean' },
    },
  },
  args: {
    src: getRandomImageUrl({ width: 180, height: 180, extension: 'webp' }),
  },
  render: ({ isLoading, ...args }) => {
    const _src = isLoading === true ? '' : args.src;

    return (
      <div className="h-[180px] w-[180px]">
        <LazyImage {...args} src={_src} />
      </div>
    );
  },
};
