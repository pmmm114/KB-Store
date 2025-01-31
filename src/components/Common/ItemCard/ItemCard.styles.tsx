import { cn } from '@/libs/shadcn/utils/utils';
import { ITailwindClass } from '@/styles/types';

/**
 * 카드 기본 클래스
 */
export const CARD_TAILWIND_CLASS: ITailwindClass = {
  CARD: (className) => cn('flex flex-col overflow-hidden', className),
  TITLE: (className) => cn('line-clamp-2 break-all', className),
  CONTENT: (className) => cn('flex flex-col', className),
} as const;
