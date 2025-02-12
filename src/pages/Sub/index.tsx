import { useMemo } from 'react';

import { applyClass } from '@/utils/style/tailwind';

/**
 * Store
 */
import { useFetchSubPageInit } from '@/store/queries/nft';

/**
 * Templates
 */
import SubTemplate from '@/components/templates/Sub';

import * as S from './Sub.styles';

const Sub = () => {
  const { recommendNftQuery } = useFetchSubPageInit();

  /**
   * 추천 NFT 아이템 데이터
   */
  const recommendNftItems = useMemo(() => {
    return (
      recommendNftQuery.data?.pages.flatMap((page) => page.data.list) || []
    );
  }, [recommendNftQuery.data]);

  return (
    <main className={applyClass(S.SUB_TAILWIND_CLASS.ROOT)}>
      <SubTemplate
        recommandSection={{
          items: recommendNftItems,
          infiniteScrollStatus: {
            isFetching: recommendNftQuery.isFetching,
            isFetchingNextPage: recommendNftQuery.isFetchingNextPage,
            hasNextPage: recommendNftQuery.hasNextPage,
            fetchNextPage: recommendNftQuery.fetchNextPage,
            itemsCount: recommendNftItems.length,
            loadingPlaceholderCount: 10,
          },
        }}
      />
    </main>
  );
};

export default Sub;
