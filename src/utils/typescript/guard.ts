/**
 * 함수인지 확인하는 타입가드
 */
export const isFunction = (value: unknown) => {
  return typeof value === 'function';
};
