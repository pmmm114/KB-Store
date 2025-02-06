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

/**
 * Utils
 */
import { applyClass } from '@/utils/style/tailwind';

/**
 * Styles
 */
import * as S from './Main.styles';
import * as T from './types';
import { Skeleton } from '@/components/atoms/Skeleton';

const MainTemplate = (
  { recommandSection, nftTabSection }: T.IMainTemplateProps = {
    recommandSection: { items: [], isLoading: true, skeletonItemCount: 5 },
    nftTabSection: { listItems: [], tabItems: [], isLoading: true },
  },
) => {
  const { tab, setTab } = useMainStore((state) => state);

  const VIRTUAL_SCROLL_OPTIONS = useMemo(() => {
    return {
      estimateSize: () => 500,
      overscan: 2,
      lanes: 1,
      gap: 8,
    };
  }, []);

  const recommandSectionItems = useMemo(() => {
    return recommandSection.isLoading
      ? [
          ...recommandSection.items,
          ...Array.from({
            length: recommandSection.skeletonItemCount as number,
          }),
        ]
      : recommandSection.items;
  }, [recommandSection]);

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
          {recommandSectionItems.map((item, index) => {
            // INFO: 로딩 상태일 때 데이터가 없는 경우 더미 데이터를 보여줌
            if (recommandSection.isLoading) {
              return (
                <ImageCard
                  className={applyClass(
                    S.RECOMMENDED_NFT_TAILWIND_CLASS.IMAGE_CARD.ROOT,
                  )}
                  key={index}
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
          {recommandSection.isLoading &&
            Array.from({ length: recommandSection.loadingItemCount }).map(
              (_, index) => (
                <ImageCard
                  key={index}
                  className={applyClass(
                    S.RECOMMENDED_NFT_TAILWIND_CLASS.IMAGE_CARD.ROOT,
                  )}
                />
              ),
            )}
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
          {nftTabSection.tabItems.map((tabItem, tabIndex) => (
            <TabsContent key={tabItem.key} value={tabItem.key}>
              <VirtualScroller
                columnsGap={1}
                scrollInnerClassName={applyClass(
                  S.NFT_BY_CATEGORY_TAILWIND_CLASS.VIRTUAL_SCROLLER.INNER,
                )}
                virtualizerOptions={{
                  ...VIRTUAL_SCROLL_OPTIONS,
                  count: nftTabSection.listItems[tabIndex].length,
                }}
                renderItem={(index) => {
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
                          src={
                            nftTabSection.listItems[tabIndex][index].imageUrl
                          }
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
                          {nftTabSection.listItems[tabIndex][index].title}
                        </ImageCardTitle>
                        <ImageCardDescription>
                          {nftTabSection.listItems[tabIndex][index].description}
                        </ImageCardDescription>
                      </ImageCardContent>
                      <ImageCardFooter>
                        <span
                          className={applyClass(
                            S.NFT_BY_CATEGORY_TAILWIND_CLASS.IMAGE_CARD.FOOTER
                              .TEXT,
                          )}
                        >
                          {nftTabSection.listItems[tabIndex][index].footer}
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
