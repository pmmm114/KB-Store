import { cn } from '@/libs/shadcn/utils/utils';
import { ITailwindClass } from '@/styles/types';

export const HORIZONTAL_SLIDER_TAILWIND_CLASS = {
  ROOT: (className) =>
    cn('no-scrollbar flex flex-row overflow-x-auto scroll-smooth', className),
} as const satisfies ITailwindClass;
