import { cn } from '@/libs/shadcn/utils/utils';
import { ITailwindClass } from '@/styles/types';

export const RECOMMENDED_NFT_TAILWIND_CLASS = {
  ROOT: (className) => cn('flex flex-col gap-3', className),
  HEADER: {
    ROOT: (className) => cn('flex items-center justify-between', className),
    TITLE: (className) => cn('typography-h2 px-4', className),
  },
  SCROLLER: (className) =>
    cn('snap-x snap-mandatory gap-3 px-4 py-2', className),
  IMAGE_CARD: {
    ROOT: (className) =>
      cn(
        'h-[340px] flex-[0_0_204px] snap-center transition-[box-shadow,translate] duration-300 hover:-translate-y-1 hover:shadow-md',
        className,
      ),
    HEADER: (className) => cn('flex-[0_0_200px]', className),
    LAZY_IMAGE: {
      ROOT: (className) => cn('rounded-lg', className),
      IMAGE: (className) => cn('', className),
    },
    FOOTER: {
      TEXT: (className) => cn('line-clamp-1 break-all', className),
    },
    SKELETON: {
      TITLE: (className) => cn('h-7', className),
      DESCRIPTION: (className) => cn('h-5', className),
      FOOTER: (className) => cn('h-5 flex-auto', className),
    },
  },
} as const satisfies ITailwindClass;

export const NFT_BY_CATEGORY_TAILWIND_CLASS = {
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
    SKELETON: {
      TITLE: (className) => cn('h-7', className),
      DESCRIPTION: (className) => cn('h-5', className),
      FOOTER: (className) => cn('h-5 flex-auto', className),
    },
  },
  VIRTUAL_SCROLLER: {
    INNER: (className) => cn('mx-4 my-3', className),
  },
} as const satisfies ITailwindClass;
