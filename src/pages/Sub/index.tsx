import { applyClass } from '@/utils/style/tailwind';

/**
 * Templates
 */
import SubTemplate from '@/components/templates/Sub';
import { getRandomImageUrl } from '@/utils/api/image';

import * as S from './Sub.styles';

// INFO: 추천 NFT 더미 데이터
const DUMMY_RECOMMEND_NFT = Array.from({ length: 15 }, (_, index) => ({
  id: index,
  title: `title-${index}`,
  description: `description-${index}`,
  imageUrl: getRandomImageUrl({
    width: 180,
    height: 180,
    extension: 'webp',
    isRandom: true,
  }),
  footer: `footer-${index}`,
}));

const Sub = () => {
  return (
    <main className={applyClass(S.SUB_TAILWIND_CLASS.ROOT)}>
      <SubTemplate
        recommandSection={{
          items: DUMMY_RECOMMEND_NFT,
        }}
      />
    </main>
  );
};

export default Sub;
