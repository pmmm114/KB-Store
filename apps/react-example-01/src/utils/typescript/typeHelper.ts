/**
 * 배열의 요소 타입을 추출하는 유틸리티 타입
 */
export type ArrayItem<T> = T extends (infer U)[] ? U : T;
