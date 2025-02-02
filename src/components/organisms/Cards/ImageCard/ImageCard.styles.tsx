import { cn } from '@/libs/shadcn/utils/utils';
import { ITailwindClass } from '@/styles/types';

/**
 * 카드 기본 클래스
 */
export const IMAGE_CARD_TAILWIND_CLASS: ITailwindClass = {
  ROOT: (className) =>
    cn('flex flex-col overflow-hidden border-none shadow-none', className),
  TITLE: (className) => cn('line-clamp-2 text-lg break-all', className),
  CONTENT: (className) =>
    cn('flex flex-[1_0_auto] flex-col gap-2 px-4 pb-3', className),
  HEADER: (className) => cn('px-3 pt-3 pb-2', className),
  FOOTER: (className) =>
    cn('flex-[0_0_auto] px-4 pb-3 text-center text-sm', className),
  DESCRIPTION: (className) => cn('line-clamp-1 text-center text-sm', className),
} as const;
