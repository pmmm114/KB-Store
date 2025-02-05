import { ChevronRight } from 'lucide-react';
import { useMemo } from 'react';
import { Link } from 'react-router';

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

const MainTemplate = ({
  recommandSection = { items: [] },
  nftTabSection = { listItems: [], tabItems: [] },
}: T.IMainTemplateProps) => {
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
          {recommandSection.items.map((item, _) => (
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
                    S.RECOMMENDED_NFT_TAILWIND_CLASS.IMAGE_CARD.LAZY_IMAGE.ROOT,
                  )}
                  className={applyClass(
                    S.RECOMMENDED_NFT_TAILWIND_CLASS.IMAGE_CARD.LAZY_IMAGE
                      .IMAGE,
                  )}
                />
              </ImageCardHeader>
              <ImageCardContent>
                <ImageCardTitle>{item.title}</ImageCardTitle>
                <ImageCardDescription>{item.description}</ImageCardDescription>
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
          ))}
        </HorizontalSlider>
      </section>

      <section className={applyClass(S.NFT_BY_CATEGORY_TAILWIND_CLASS.ROOT)}>
        <h2 className={applyClass(S.NFT_BY_CATEGORY_TAILWIND_CLASS.TITLE)}>
          NFT 카테고리
        </h2>
        <Tabs defaultValue={Object.keys(nftTabSection.tabItems[0])[0]}>
          <TabsList
            className={applyClass(S.NFT_BY_CATEGORY_TAILWIND_CLASS.TABS.LIST)}
          >
            {nftTabSection.tabItems.map((tabItem, index) => (
              <TabsTrigger
                key={Object.keys(tabItem)[0]}
                value={Object.keys(tabItem)[0]}
                className={applyClass(
                  S.NFT_BY_CATEGORY_TAILWIND_CLASS.TABS.TRIGGER.ROOT,
                )}
              >
                {Object.values(tabItem)[0]}
              </TabsTrigger>
            ))}
          </TabsList>
          {nftTabSection.tabItems.map((tabItem, tabIndex) => (
            <TabsContent
              key={Object.keys(tabItem)[0]}
              value={Object.keys(tabItem)[0]}
            >
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
