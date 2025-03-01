import { ChevronRight } from 'lucide-react';
import { useMemo } from 'react';
import { Link } from 'react-router';

import { useMainStore } from '@/libs/zustand/store';

/**
 * Router
 */
import { PATHS } from '@/router/paths';

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
import HorizontalSlider from '@/components/molecules/HorizontalSlider';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/molecules/Tabs';
import { VirtualScroller } from '@/components/molecules/VirtualScroller';

/**
 * Atoms
 */
import { Button } from '@/components/atoms/Button';
import { Skeleton } from '@/components/atoms/Skeleton';

/**
 * Utils
 */
import { applyClass } from '@/utils/style/tailwind';

/**
 * Styles
 */
import * as S from './Main.styles';
import * as T from './types';

/**
 * 추천 아이템 타입 가드
 */
function isRecommendItem(item: T.TNftCard | null): item is T.TNftCard {
  return item !== null;
}

const MainTemplate = (
  { recommandSection, nftTabSection }: T.IMainTemplateProps = {
    recommandSection: { items: [] },
    nftTabSection: { items: [], tabItems: [] },
  },
) => {
  const { tab, setTab } = useMainStore((state) => state);

  const VIRTUAL_SCROLL_OPTIONS = useMemo(() => {
    return {
      count: nftTabSection.infiniteScrollStatus?.isFetching
        ? nftTabSection.items.length +
          (nftTabSection.infiniteScrollStatus?.loadingPlaceholderCount || 0)
        : nftTabSection.items.length,
      estimateSize: () => 500,
      overscan: 2,
      lanes: 1,
      gap: 8,
    };
  }, [
    nftTabSection.infiniteScrollStatus?.isFetching,
    nftTabSection.items.length,
    nftTabSection.infiniteScrollStatus?.loadingPlaceholderCount,
  ]);

  return (
    <>
      <section className={applyClass(S.RECOMMENDED_NFT_TAILWIND_CLASS.ROOT)}>
        <div
          className={applyClass(S.RECOMMENDED_NFT_TAILWIND_CLASS.HEADER.ROOT)}
        >
          <h2
            className={applyClass(
              S.RECOMMENDED_NFT_TAILWIND_CLASS.HEADER.TITLE,
            )}
          >
            🔥Top NFT
          </h2>
          <Button asChild variant="link">
            <Link to={PATHS.SUB()}>
              전체보기 <ChevronRight />
            </Link>
          </Button>
        </div>
        <HorizontalSlider
          className={applyClass(S.RECOMMENDED_NFT_TAILWIND_CLASS.SCROLLER)}
        >
          {recommandSection.items.map((item, _index) => {
            if (!isRecommendItem(item)) {
              return (
                <ImageCard
                  className={applyClass(
                    S.RECOMMENDED_NFT_TAILWIND_CLASS.IMAGE_CARD.ROOT,
                  )}
                  key={_index}
                >
                  <ImageCardHeader
                    className={applyClass(
                      S.RECOMMENDED_NFT_TAILWIND_CLASS.IMAGE_CARD.HEADER,
                    )}
                  >
                    <LazyImage
                      src={''}
                      rootClassName={applyClass(
                        S.RECOMMENDED_NFT_TAILWIND_CLASS.IMAGE_CARD.LAZY_IMAGE
                          .ROOT,
                      )}
                      className={applyClass(
                        S.RECOMMENDED_NFT_TAILWIND_CLASS.IMAGE_CARD.LAZY_IMAGE
                          .IMAGE,
                      )}
                    />
                  </ImageCardHeader>
                  <ImageCardContent>
                    <ImageCardTitle>
                      <Skeleton
                        className={applyClass(
                          S.RECOMMENDED_NFT_TAILWIND_CLASS.IMAGE_CARD.SKELETON
                            .TITLE,
                        )}
                      />
                    </ImageCardTitle>
                    <ImageCardDescription>
                      <Skeleton
                        className={applyClass(
                          S.RECOMMENDED_NFT_TAILWIND_CLASS.IMAGE_CARD.SKELETON
                            .DESCRIPTION,
                        )}
                      />
                    </ImageCardDescription>
                  </ImageCardContent>
                  <ImageCardFooter>
                    <Skeleton
                      className={applyClass(
                        S.RECOMMENDED_NFT_TAILWIND_CLASS.IMAGE_CARD.SKELETON
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
                  S.RECOMMENDED_NFT_TAILWIND_CLASS.IMAGE_CARD.ROOT,
                )}
                key={item.id}
              >
                <ImageCardHeader
                  className={applyClass(
                    S.RECOMMENDED_NFT_TAILWIND_CLASS.IMAGE_CARD.HEADER,
                  )}
                >
                  <LazyImage
                    src={item.imageUrl}
                    rootClassName={applyClass(
                      S.RECOMMENDED_NFT_TAILWIND_CLASS.IMAGE_CARD.LAZY_IMAGE
                        .ROOT,
                    )}
                    className={applyClass(
                      S.RECOMMENDED_NFT_TAILWIND_CLASS.IMAGE_CARD.LAZY_IMAGE
                        .IMAGE,
                    )}
                  />
                </ImageCardHeader>
                <ImageCardContent>
                  <ImageCardTitle>{item.title}</ImageCardTitle>
                  <ImageCardDescription>
                    {item.description}
                  </ImageCardDescription>
                </ImageCardContent>
                <ImageCardFooter>
                  <span
                    className={applyClass(
                      S.RECOMMENDED_NFT_TAILWIND_CLASS.IMAGE_CARD.FOOTER.TEXT,
                    )}
                  >
                    {item.footer}
                  </span>
                </ImageCardFooter>
              </ImageCard>
            );
          })}
        </HorizontalSlider>
      </section>

      <section className={applyClass(S.NFT_BY_CATEGORY_TAILWIND_CLASS.ROOT)}>
        <h2 className={applyClass(S.NFT_BY_CATEGORY_TAILWIND_CLASS.TITLE)}>
          NFT 카테고리
        </h2>
        <Tabs
          defaultValue={tab.key}
          onValueChange={(value) => {
            setTab({ key: value as T.ITabItem['key'] });
          }}
        >
          <TabsList
            className={applyClass(S.NFT_BY_CATEGORY_TAILWIND_CLASS.TABS.LIST)}
          >
            {nftTabSection.tabItems.map((tabItem, _index) => (
              <TabsTrigger
                key={tabItem.key}
                value={tabItem.key}
                className={applyClass(
                  S.NFT_BY_CATEGORY_TAILWIND_CLASS.TABS.TRIGGER.ROOT,
                )}
              >
                {tabItem.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {nftTabSection.tabItems.map((tabItem, _tabIndex) => (
            <TabsContent key={tabItem.key} value={tabItem.key}>
              <VirtualScroller
                columnsGap={1}
                scrollInnerClassName={applyClass(
                  S.NFT_BY_CATEGORY_TAILWIND_CLASS.VIRTUAL_SCROLLER.INNER,
                )}
                virtualizerOptions={{
                  ...VIRTUAL_SCROLL_OPTIONS,
                }}
                infiniteScrollStatus={nftTabSection.infiniteScrollStatus}
                renderItem={(index) => {
                  if (!nftTabSection.items[index]) {
                    return (
                      <ImageCard
                        className={applyClass(
                          S.NFT_BY_CATEGORY_TAILWIND_CLASS.IMAGE_CARD.ROOT,
                        )}
                        key={index}
                      >
                        <ImageCardHeader
                          className={applyClass(
                            S.NFT_BY_CATEGORY_TAILWIND_CLASS.IMAGE_CARD.HEADER,
                          )}
                        >
                          <LazyImage
                            src={''}
                            rootClassName={applyClass(
                              S.NFT_BY_CATEGORY_TAILWIND_CLASS.IMAGE_CARD
                                .LAZY_IMAGE.ROOT,
                            )}
                            className={applyClass(
                              S.NFT_BY_CATEGORY_TAILWIND_CLASS.IMAGE_CARD
                                .LAZY_IMAGE.IMAGE,
                            )}
                          />
                        </ImageCardHeader>
                        <ImageCardContent>
                          <ImageCardTitle>
                            <Skeleton
                              className={applyClass(
                                S.NFT_BY_CATEGORY_TAILWIND_CLASS.IMAGE_CARD
                                  .SKELETON.TITLE,
                              )}
                            />
                          </ImageCardTitle>
                          <ImageCardDescription>
                            <Skeleton
                              className={applyClass(
                                S.NFT_BY_CATEGORY_TAILWIND_CLASS.IMAGE_CARD
                                  .SKELETON.DESCRIPTION,
                              )}
                            />
                          </ImageCardDescription>
                        </ImageCardContent>
                        <ImageCardFooter>
                          <Skeleton
                            className={applyClass(
                              S.NFT_BY_CATEGORY_TAILWIND_CLASS.IMAGE_CARD
                                .SKELETON.FOOTER,
                            )}
                          />
                        </ImageCardFooter>
                      </ImageCard>
                    );
                  }

                  return (
                    <ImageCard
                      className={applyClass(
                        S.NFT_BY_CATEGORY_TAILWIND_CLASS.IMAGE_CARD.ROOT,
                      )}
                    >
                      <ImageCardHeader
                        className={applyClass(
                          S.NFT_BY_CATEGORY_TAILWIND_CLASS.IMAGE_CARD.HEADER,
                        )}
                      >
                        <LazyImage
                          src={nftTabSection.items[index].imageUrl}
                          rootClassName={applyClass(
                            S.NFT_BY_CATEGORY_TAILWIND_CLASS.IMAGE_CARD
                              .LAZY_IMAGE.ROOT,
                          )}
                          className={applyClass(
                            S.NFT_BY_CATEGORY_TAILWIND_CLASS.IMAGE_CARD
                              .LAZY_IMAGE.IMAGE,
                          )}
                        />
                      </ImageCardHeader>
                      <ImageCardContent>
                        <ImageCardTitle>
                          {nftTabSection.items[index].title}
                        </ImageCardTitle>
                        <ImageCardDescription>
                          {nftTabSection.items[index].description}
                        </ImageCardDescription>
                      </ImageCardContent>
                      <ImageCardFooter>
                        <span
                          className={applyClass(
                            S.NFT_BY_CATEGORY_TAILWIND_CLASS.IMAGE_CARD.FOOTER
                              .TEXT,
                          )}
                        >
                          {nftTabSection.items[index].footer}
                        </span>
                      </ImageCardFooter>
                    </ImageCard>
                  );
                }}
              />
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </>
  );
};

export default MainTemplate;
