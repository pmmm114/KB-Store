import { cn } from '@/libs/shadcn/utils/utils';
import { ITailwindClass } from '@/styles/types';

export const COMMON_LAYOUT_TAILWIND_CLASS: ITailwindClass = {
  LAYOUT: (className) =>
    cn('w-full max-w-[390px] flex-1 bg-gray-200 shadow-md', className),
  HEADER: (className) =>
    cn(
      'typography-h1 sticky top-0 left-0 z-9999 flex h-[70px] w-full items-center bg-white px-4 shadow-md',
      className,
    ),
} as const;
