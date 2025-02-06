import { useMainStore } from '@/libs/zustand/store';

import { useInfiniteQuery, infiniteQueryOptions } from '@tanstack/react-query';
import { CLIENT_API } from '@/api/service';

import * as T from './types';

/**
 * 쿼리 옵션 기본 설정
 */
const DEFAULT_INFINITE_QUERY_OPTIONS = {
  refetchOnWindowFocus: false,
  retry: 0,
} as const satisfies Partial<Parameters<typeof infiniteQueryOptions>[0]>;

/**
 * 쿼리 키 인터페이스
 */
const QUERY_KEYS = {
  NFT: {
    index: () => ['nft'] as const,
    fetchInfiniteTopBanner: () =>
      [QUERY_KEYS.NFT.index(), 'fetchInfiniteTopBanner'] as const,
    fetchInfiniteScrollList: () =>
      [QUERY_KEYS.NFT.index(), 'fetchInfiniteScrollList'] as const,
  },
};

/**
 * 쿼리 옵션 팩토리
 */
export const QUERIES = {
  NFT: {
    fetchInfiniteTopBanner: (params: T.TUseFetchTopBannerParams) =>
      infiniteQueryOptions({
        ...DEFAULT_INFINITE_QUERY_OPTIONS,
        queryKey: [
          QUERY_KEYS.NFT.fetchInfiniteTopBanner(),
          ...Object.values(params),
        ],
        queryFn: ({ pageParam }) =>
          CLIENT_API.DemoControllerApi.getTopBanner({ page: pageParam }),
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
          QUERY_KEYS.NFT.fetchInfiniteScrollList(),
          ...Object.values(params),
        ],
        queryFn: ({ pageParam }) =>
          CLIENT_API.DemoControllerApi.getScrollList({
            category: params.category,
            page: pageParam,
          }),
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
  params: T.TUseFetchTopBannerParams;
  options?: T.TUseInfiniteOptions<
    ReturnType<typeof CLIENT_API.DemoControllerApi.getTopBanner>,
    number
  >;
}
/**
 * Top NFT리스트 무한 스크롤 조회
 */
export const useInfiniteFetchTopBanner = ({
  params,
  options,
}: IUseInfiniteFetchTopBannerParams) =>
  useInfiniteQuery({
    ...QUERIES.NFT.fetchInfiniteTopBanner(params),
    ...options,
  });

interface IUseInfiniteFetchScrollListParams {
  params: T.TUseFetchScrollListParams;
  options?: T.TUseInfiniteOptions<
    ReturnType<typeof CLIENT_API.DemoControllerApi.getScrollList>,
    number
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
    ...QUERIES.NFT.fetchInfiniteScrollList(params),
    ...options,
  });

/**
 * 메인페이지 초기 조회
 */
export const useFetchMainPageInit = () => {
  const { tab } = useMainStore();
  const topBannerQuery = useInfiniteFetchTopBanner({
    params: { page: 1 },
  });
  const scrollListQuery = useInfiniteFetchScrollList({
    params: { category: tab.key, page: 1 },
  });

  // INFO: 모든 쿼리 새로고침
  const refetch = () => {
    topBannerQuery.refetch();
    scrollListQuery.refetch();
  };

  return {
    topBannerQuery,
    scrollListQuery,
    refetch,
  };
};
