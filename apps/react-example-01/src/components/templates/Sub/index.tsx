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
 * Atoms
 */
import { Skeleton } from '@/components/atoms/Skeleton';

/**
 * Utils
 */
import { applyClass } from '@/utils/style/tailwind';

/**
 * Styles
 */
import * as S from './Sub.styles';
import * as T from './types';

const SubTemplate = ({ recommandSection }: T.ISubTemplateProps) => {
  const VIRTUAL_SCROLL_OPTIONS = useMemo(() => {
    return {
      count: recommandSection.infiniteScrollStatus?.hasNextPage
        ? recommandSection.items.length +
          (recommandSection.infiniteScrollStatus?.loadingPlaceholderCount || 0)
        : recommandSection.items.length,
      estimateSize: () => 500,
      overscan: 2,
      lanes: 1,
      gap: 8,
    };
  }, [
    recommandSection.infiniteScrollStatus?.hasNextPage,
    recommandSection.items.length,
    recommandSection.infiniteScrollStatus?.loadingPlaceholderCount,
  ]);

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
          }}
          infiniteScrollStatus={recommandSection.infiniteScrollStatus}
          renderItem={(index) => {
            if (!recommandSection.items[index]) {
              return (
                <ImageCard
                  className={applyClass(
                    S.ALL_RECOMMEND_NFT_TAILWIND_CLASS.IMAGE_CARD.ROOT,
                  )}
                  key={index}
                >
                  <ImageCardHeader
                    className={applyClass(
                      S.ALL_RECOMMEND_NFT_TAILWIND_CLASS.IMAGE_CARD.HEADER,
                    )}
                  >
                    <LazyImage
                      src={''}
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
                      <Skeleton
                        className={applyClass(
                          S.ALL_RECOMMEND_NFT_TAILWIND_CLASS.IMAGE_CARD.SKELETON
                            .TITLE,
                        )}
                      />
                    </ImageCardTitle>
                    <ImageCardDescription>
                      <Skeleton
                        className={applyClass(
                          S.ALL_RECOMMEND_NFT_TAILWIND_CLASS.IMAGE_CARD.SKELETON
                            .DESCRIPTION,
                        )}
                      />
                    </ImageCardDescription>
                  </ImageCardContent>
                  <ImageCardFooter>
                    <Skeleton
                      className={applyClass(
                        S.ALL_RECOMMEND_NFT_TAILWIND_CLASS.IMAGE_CARD.SKELETON
                          .FOOTER,
                      )}
                    />
                  </ImageCardFooter>
                </ImageCard>
              );
            }

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
