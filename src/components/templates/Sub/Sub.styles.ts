import { cn } from '@/libs/shadcn/utils/utils';
import { ITailwindClass } from '@/styles/types';

export const ALL_RECOMMEND_NFT_TAILWIND_CLASS = {
  ROOT: (className) => cn('flex flex-col gap-3', className),
  TITLE: (className) => cn('typography-h2 px-4', className),
  TABS: {
    LIST: (className) =>
      cn(
        'flex h-12 w-full items-stretch justify-around rounded-none border-b-[1px] bg-transparent p-0',
        className,
      ),
    TRIGGER: {
      ROOT: (className) => cn('min-w-[100px] px-4', className),
    },
  },
  IMAGE_CARD: {
    ROOT: (className) => cn('group h-full', className),
    HEADER: (className) => cn('box-content flex-[0_0_334px]', className),
    LAZY_IMAGE: {
      ROOT: (className) => cn('relative rounded-lg', className),
      IMAGE: (className) =>
        cn(
          'transition-scale absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100 transform duration-300 group-hover:scale-108',
          className,
        ),
    },
    FOOTER: {
      TEXT: (className) => cn('line-clamp-1 break-all', className),
    },
  },
} as const satisfies ITailwindClass;
