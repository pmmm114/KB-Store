import { useCallback } from 'react';
import { useMainStore } from '@/libs/zustand/store';
import {
  useInfiniteQuery,
  infiniteQueryOptions,
  keepPreviousData,
  useQueryClient,
} from '@tanstack/react-query';

import { CLIENT_API } from '@/api/service';

import * as T from './types';

/**
 * 쿼리 옵션 기본 설정
 */
const DEFAULT_INFINITE_QUERY_OPTIONS = {
  refetchOnWindowFocus: false,
  retry: 0,
  gcTime: 1000 * 60 * 5,
} as const satisfies Partial<Parameters<typeof infiniteQueryOptions>[0]>;

/**
 * 쿼리 키 인터페이스
 */
const QUERY_KEYS = {
  NFT: {
    index: () => ['nft'],
    fetchInfiniteTopBanner: () => [
      QUERY_KEYS.NFT.index(),
      'fetchInfiniteTopBanner',
    ],
    fetchInfiniteScrollList: () => [
      QUERY_KEYS.NFT.index(),
      'fetchInfiniteScrollList',
    ],
  },
} as const;

/**
 * 쿼리 옵션 팩토리
 */
export const QUERY_OPTIONS = {
  NFT: {
    fetchInfiniteTopBanner: () =>
      infiniteQueryOptions({
        ...DEFAULT_INFINITE_QUERY_OPTIONS,
        queryKey: [
          ...QUERY_KEYS.NFT.fetchInfiniteTopBanner().flatMap((key) => key),
        ],
        queryFn: ({ pageParam, signal }) =>
          CLIENT_API.DemoControllerApi.getTopBanner(
            {
              page: pageParam,
            },
            {
              signal,
            },
          ),
        initialPageParam: 1,
        getNextPageParam: (
          lastPage,
          _allPages,
          lastPageParam,
          _allPageParams,
        ) => {
          if (lastPage.data.hasNext == false) {
            return undefined;
          }
          return lastPageParam + 1;
        },
      }),
    fetchInfiniteScrollList: (params: T.TUseFetchScrollListParams) =>
      infiniteQueryOptions({
        ...DEFAULT_INFINITE_QUERY_OPTIONS,
        queryKey: [
          ...QUERY_KEYS.NFT.fetchInfiniteScrollList().flatMap((key) => key),
          params.category,
        ],
        queryFn: ({ pageParam, signal }) =>
          CLIENT_API.DemoControllerApi.getScrollList(
            {
              category: params.category,
              page: pageParam,
            },
            {
              signal,
            },
          ),
        initialPageParam: 1,
        getNextPageParam: (
          lastPage,
          _allPages,
          lastPageParam,
          _allPageParams,
        ) => {
          if (lastPage.data.hasNext == false) {
            return undefined;
          }
          return lastPageParam + 1;
        },
      }),
  },
};

interface IUseInfiniteFetchTopBannerParams {
  options?: T.TUseInfiniteOptions<
    Awaited<ReturnType<typeof CLIENT_API.DemoControllerApi.getTopBanner>>
  >;
}

/**
 * Top NFT리스트 무한 스크롤 조회
 */
export const useInfiniteFetchTopBanner = ({
  options,
}: IUseInfiniteFetchTopBannerParams) => {
  return useInfiniteQuery({
    ...QUERY_OPTIONS.NFT.fetchInfiniteTopBanner(),
    ...options,
  });
};

interface IUseInfiniteFetchScrollListParams {
  params: T.TUseFetchScrollListParams;
  options?: T.TUseInfiniteOptions<
    Awaited<ReturnType<typeof CLIENT_API.DemoControllerApi.getScrollList>>
  >;
}
/**
 * 카테고리 별 NFT 리스트 무한 스크롤 조회
 */
export const useInfiniteFetchScrollList = ({
  params,
  options,
}: IUseInfiniteFetchScrollListParams) =>
  useInfiniteQuery({
    ...QUERY_OPTIONS.NFT.fetchInfiniteScrollList(params),
    ...options,
  });

/**
 * 메인페이지 초기 조회
 */
export const useFetchMainPageInit = () => {
  const { tab } = useMainStore();
  const topBannerQuery = useInfiniteFetchTopBanner({
    options: {
      refetchOnMount: 'always',
      placeholderData: keepPreviousData,
    },
  });
  const scrollListQuery = useInfiniteFetchScrollList({
    params: { category: tab.key },
  });

  // INFO: 모든 쿼리 새로고침
  const refetch = useCallback(() => {
    topBannerQuery.refetch();
    scrollListQuery.refetch();
  }, [topBannerQuery, scrollListQuery]);

  return {
    topBannerQuery,
    scrollListQuery,
    refetch,
  };
};

/**
 * 서브페이지 초기 조회
 */
export const useFetchSubPageInit = () => {
  const queryClient = useQueryClient();

  const recommendNftQuery = useInfiniteFetchTopBanner({
    options: {
      initialData: () =>
        queryClient.getQueryData(
          QUERY_OPTIONS.NFT.fetchInfiniteTopBanner().queryKey,
        ),
      initialDataUpdatedAt: () => {
        return queryClient.getQueryState(
          QUERY_OPTIONS.NFT.fetchInfiniteTopBanner().queryKey,
        )?.dataUpdatedAt;
      }, // INFO: 캐시된 데이터의 마지막 업데이트 시점을 가져옵니다.
      staleTime: 5000, // INFO: 데이터를 절대 stale로 표시하지 않음
    },
  });

  return {
    recommendNftQuery,
  };
};
