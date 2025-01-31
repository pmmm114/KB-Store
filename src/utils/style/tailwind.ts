import type { ITailwindClass } from '@/styles/types';
import { isFunction } from '@/utils/typescript/guard';

/**
 * tailwind 클래스를 적용하는 함수
 *
 * @param tailwindClass style파일에서 관리하는 tailwind 클래스
 * @param className 클래스명
 * @returns 클래스명
 */
export const applyClass = (
  tailwindClass: ((className?: string) => string) | ITailwindClass,
  className?: string,
): string => {
  if (isFunction(tailwindClass)) {
    return tailwindClass(className); // 함수일 경우 호출
  }

  throw new Error(
    'Expected a function for tailwindClass, but received a different type.',
  );
};
