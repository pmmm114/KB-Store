import type { ITailwindClass } from '@/styles/types';
import { isFunction, isObject } from '@/utils/typescript/guard';
import { CustomTypeError } from '@/utils/error/error';

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
  try {
    if (
      typeof tailwindClass !== 'function' &&
      typeof tailwindClass !== 'object'
    ) {
      throw new CustomTypeError('Expected a function or object.');
    }

    if (isFunction(tailwindClass)) {
      return tailwindClass(className);
    } else if (isObject(tailwindClass)) {
      return applyClass(tailwindClass, className);
    }

    return '';
  } catch (error) {
    console.error(error);
    return '';
  }
};
