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

const Main = () => {
  const { topBannerQuery, scrollListQuery } = useFetchMainPageInit();

  const recommendNftItems = useMemo(
    () =>
      topBannerQuery.data?.pages.flatMap((response) => response.data.list) ||
      [],
    [topBannerQuery.data],
  );
  const nftItems = useMemo(
    () =>
      scrollListQuery.data?.pages.flatMap((response) => response.data.list) ||
      [],
    [scrollListQuery.data],
  );

  return (
    <main className={applyClass(S.MAIN_TAILWIND_CLASS.ROOT)}>
      <MainTemplate
        recommandSection={{
          isLoading: topBannerQuery.isLoading,
          items: recommendNftItems,
          skeletonItemCount: 10,
        }}
        nftTabSection={{
          isLoading: scrollListQuery.isLoading,
          listItems: [nftItems, nftItems, nftItems],
          tabItems: TABS,
          skeletonItemCount: 10,
        }}
      />
    </main>
  );
};

export default Main;
