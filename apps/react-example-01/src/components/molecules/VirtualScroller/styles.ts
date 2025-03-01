import { cn } from '@/libs/shadcn/utils/utils';
import { ITailwindClass } from '@/styles/types';

export const VIRTUAL_SCROLLER_TAILWIND_CLASS = {
  ROOT: (className) => cn('', className),
  SCROLL_INNER: (className) => cn('relative', className),
  SCROLL_ITEM: (className) => cn('absolute top-0', className),
} as const satisfies ITailwindClass;
