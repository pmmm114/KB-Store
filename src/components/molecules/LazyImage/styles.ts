import { cn } from '@/libs/shadcn/utils/utils';
import { ITailwindClass } from '@/styles/types';

export const LAZY_IMAGE_TAILWIND_CLASS = {
  ROOT: (className) => cn('h-full w-full overflow-hidden', className),
  IMAGE: (className) => cn('h-full w-full object-cover', className),
  SKELETON: (className) => cn('h-full w-full rounded-none', className),
} as const satisfies ITailwindClass;
