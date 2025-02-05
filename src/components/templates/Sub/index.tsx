import { useMemo } from 'react';

/**
 * Organisms
 */
import {
  ImageCard,
  ImageCardHeader,
  ImageCardContent,
  ImageCardTitle,
  ImageCardDescription,
  ImageCardFooter,
} from '@/components/organisms/Cards/ImageCard';

/**
 * Molecules
 */
import { LazyImage } from '@/components/molecules/LazyImage';
import { VirtualScroller } from '@/components/molecules/VirtualScroller';

/**
 * Utils
 */
import { applyClass } from '@/utils/style/tailwind';

/**
 * Styles
 */
import * as S from './Sub.styles';
import * as T from './types';

const SubTemplate = ({
  recommandSection = { items: [] },
}: T.ISubTemplateProps) => {
  const VIRTUAL_SCROLL_OPTIONS = useMemo(() => {
    return {
      estimateSize: () => 500,
      overscan: 2,
      lanes: 1,
      gap: 8,
    };
  }, []);

  return (
    <>
      <section className={applyClass(S.ALL_RECOMMEND_NFT_TAILWIND_CLASS.ROOT)}>
        <h2 className={applyClass(S.ALL_RECOMMEND_NFT_TAILWIND_CLASS.TITLE)}>
          NFT 추천
        </h2>
        <VirtualScroller
          columnsGap={1}
          scrollInnerClassName="mx-4"
          virtualizerOptions={{
            ...VIRTUAL_SCROLL_OPTIONS,
            count: recommandSection.items.length,
          }}
          renderItem={(index) => {
            return (
              <ImageCard
                className={applyClass(
                  S.ALL_RECOMMEND_NFT_TAILWIND_CLASS.IMAGE_CARD.ROOT,
                )}
              >
                <ImageCardHeader
                  className={applyClass(
                    S.ALL_RECOMMEND_NFT_TAILWIND_CLASS.IMAGE_CARD.HEADER,
                  )}
                >
                  <LazyImage
                    src={recommandSection.items[index].imageUrl}
                    rootClassName={applyClass(
                      S.ALL_RECOMMEND_NFT_TAILWIND_CLASS.IMAGE_CARD.LAZY_IMAGE
                        .ROOT,
                    )}
                    className={applyClass(
                      S.ALL_RECOMMEND_NFT_TAILWIND_CLASS.IMAGE_CARD.LAZY_IMAGE
                        .IMAGE,
                    )}
                  />
                </ImageCardHeader>
                <ImageCardContent>
                  <ImageCardTitle>
                    {recommandSection.items[index].title}
                  </ImageCardTitle>
                  <ImageCardDescription>
                    {recommandSection.items[index].description}
                  </ImageCardDescription>
                </ImageCardContent>
                <ImageCardFooter>
                  <span
                    className={applyClass(
                      S.ALL_RECOMMEND_NFT_TAILWIND_CLASS.IMAGE_CARD.FOOTER.TEXT,
                    )}
                  >
                    {recommandSection.items[index].footer}
                  </span>
                </ImageCardFooter>
              </ImageCard>
            );
          }}
        />
      </section>
    </>
  );
};

export default SubTemplate;
