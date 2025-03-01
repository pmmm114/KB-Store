import { applyClass } from '@/utils/style/tailwind';

import { useFetchMainPageInit } from '@/store/queries/nft';
/**
 * Templates
 */
import MainTemplate from '@/components/templates/Main';

import { INftTabSection } from '@/components/templates/Main/types';

import * as S from './Main.styles';
import { useMemo } from 'react';

const TABS = [
  {
    key: 'ALL',
    label: 'All',
  },
  {
    key: 'ART',
    label: 'Art',
  },
  {
    key: 'GAME',
    label: 'Game',
  },
] as const satisfies INftTabSection['tabItems'];

const TOP_NFT_SKELETON_COUNT = 10;
const Main = () => {
  const { topBannerQuery, scrollListQuery } = useFetchMainPageInit();

  /**
   * 추천 NFT 아이템 데이터
   */
  const recommendNftItems = useMemo(() => {
    // INFO: 재요청 시 스켈레톤 데이터 반환을 위해 빈 데이터 생성
    if (topBannerQuery.isRefetching || topBannerQuery.isLoading) {
      return Array.from({ length: TOP_NFT_SKELETON_COUNT }, () => null);
    }

    return (
      topBannerQuery.data?.pages.flatMap((response) => response.data.list) || []
    );
  }, [
    topBannerQuery.data,
    topBannerQuery.isRefetching,
    topBannerQuery.isLoading,
  ]);

  /**
   * NFT 탭 아이템 데이터
   */
  const nftTabItems = useMemo(
    () =>
      scrollListQuery.data?.pages.flatMap((response) => response.data.list) ||
      [],
    [scrollListQuery.data],
  );

  return (
    <main className={applyClass(S.MAIN_TAILWIND_CLASS.ROOT)}>
      <MainTemplate
        recommandSection={{
          items: recommendNftItems,
        }}
        nftTabSection={{
          items: nftTabItems,
          tabItems: TABS,
          infiniteScrollStatus: {
            isFetching: scrollListQuery.isFetching,
            isFetchingNextPage: scrollListQuery.isFetchingNextPage,
            hasNextPage: scrollListQuery.hasNextPage,
            fetchNextPage: scrollListQuery.fetchNextPage,
            itemsCount: nftTabItems.length,
            loadingPlaceholderCount: 10,
            fetchingTriggerIndexFromEnd: 3,
          },
        }}
      />
    </main>
  );
};

export default Main;
