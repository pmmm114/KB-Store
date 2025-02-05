import { cn } from '@/libs/shadcn/utils/utils';
import { ITailwindClass } from '@/styles/types';

export const MAIN_TAILWIND_CLASS: ITailwindClass = {
  ROOT: (className) => cn('flex flex-col gap-6 py-6', className),
} as const;
