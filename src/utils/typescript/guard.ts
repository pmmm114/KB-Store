/**
 * 함수인지 확인하는 타입가드
 */
export const isFunction = (value: unknown) => {
  return typeof value === 'function';
};

/**
 * 객체인지 확인하는 타입가드
 */
export const isObject = (value: unknown) => {
  return typeof value === 'object' && value !== null;
};
