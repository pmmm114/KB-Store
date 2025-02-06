import {
  UndefinedInitialDataInfiniteOptions,
  DefaultError,
  InfiniteData,
} from '@tanstack/react-query';

import * as ServiceTypes from '@/api/service/types';

export type TUseFetchTopBannerParams = ServiceTypes.TGetTopBannerParams;
export type TUseFetchScrollListParams = ServiceTypes.TGetScrollListParams;

/**
 * useInfiniteQuery에 들어갈 options 타입
 *
 *  2025-02-06 - react-query에서 불가능한 추론이라 임시로 추가
 */
export type TUseInfiniteOptions<T, K> = Omit<
  UndefinedInitialDataInfiniteOptions<
    Awaited<T>,
    DefaultError,
    InfiniteData<Awaited<T>>,
    unknown[],
    K
  >,
  | 'queryKey'
  | 'queryFn'
  | 'initialData'
  | 'initialPageParam'
  | 'getNextPageParam'
>;
