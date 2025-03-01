import {
  DefaultError,
  InfiniteData,
  useInfiniteQuery,
} from '@tanstack/react-query';

import * as ServiceTypes from '@/api/service/types';

export type TUseFetchTopBannerParams = ServiceTypes.TGetTopBannerParams;
export type TUseFetchScrollListParams = Omit<
  ServiceTypes.TGetScrollListParams,
  'page'
>;

/**
 * useInfiniteQuery에 들어갈 options 타입
 */
export type TUseInfiniteOptions<T> = Omit<
  Parameters<
    typeof useInfiniteQuery<T, DefaultError, InfiniteData<T>, string[], number>
  >[0],
  'queryFn' | 'getNextPageParam' | 'initialPageParam' | 'queryKey'
>;
