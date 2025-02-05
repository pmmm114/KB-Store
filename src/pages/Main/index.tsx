import { applyClass } from '@/utils/style/tailwind';

/**
 * Templates
 */
import MainTemplate from '@/components/templates/Main';
import { getRandomImageUrl } from '@/utils/api/image';

import * as S from './Main.styles';

// INFO: 추천 NFT 더미 데이터
const DUMMY_RECOMMEND_NFT = Array.from({ length: 15 }, (_, index) => ({
  id: index,
  title: `Top NFT Title - ${index}`,
  description: `Top NFT Description - ${index}`,
  category: 'ART' as const,
  imageUrl: getRandomImageUrl({
    width: 180,
    height: 180,
    extension: 'webp',
    isRandom: true,
  }),
  footer: `Top NFT Footer - ${index}`,
}));

// INFO: NFT 카테고리 더미 데이터, ART
const DUMMY_NFT_IN_TABS_ART = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  title: `ART NFT Title - ${index}`,
  description: `ART NFT Description - ${index}`,
  category: 'ART' as const,
  imageUrl: getRandomImageUrl({
    width: 334,
    height: 334,
    extension: 'webp',
    isRandom: true,
  }),
  footer: `ART NFT Footer - ${index}`,
}));

// INFO: NFT 카테고리 더미 데이터, GAME
const DUMMY_NFT_IN_TABS_GAME = Array.from({ length: 40 }, (_, index) => ({
  id: index,
  title: `GAME NFT Title - ${index}`,
  description: `GAME NFT Description - ${index}`,
  category: 'GAME' as const,
  imageUrl: getRandomImageUrl({
    width: 334,
    height: 334,
    extension: 'webp',
    isRandom: true,
  }),
  footer: `GAME NFT Footer - ${index}`,
}));

const Main = () => {
  return (
    <main className={applyClass(S.MAIN_TAILWIND_CLASS.ROOT)}>
      <MainTemplate
        recommandSection={{
          items: DUMMY_RECOMMEND_NFT,
        }}
        nftTabSection={{
          listItems: [
            [...DUMMY_NFT_IN_TABS_ART, ...DUMMY_NFT_IN_TABS_GAME],
            DUMMY_NFT_IN_TABS_ART,
            DUMMY_NFT_IN_TABS_GAME,
          ],
          tabItems: [{ ALL: 'All' }, { ART: 'Art' }, { GAME: 'Game' }],
        }}
      />
    </main>
  );
};

export default Main;
